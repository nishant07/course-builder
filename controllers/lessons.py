# Copyright 2013 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS-IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Handlers for generating various frontend pages."""

__author__ = 'Saifu Angto (saifu@google.com)'

import urlparse
from models import models
from models import transforms
from models.config import ConfigProperty
from models.counters import PerfCounter
from models.roles import Roles
from tools import verify
from utils import BaseHandler
from utils import BaseRESTHandler
from utils import XsrfTokenManager

# Whether to record events in a database.
CAN_PERSIST_ACTIVITY_EVENTS = ConfigProperty(
    'gcb_can_persist_activity_events', bool, (
        'Whether or not to record student activity interactions in a '
        'datastore. Without event recording, you cannot analyze student '
        'activity interactions. On the other hand, no event recording reduces '
        'the number of datastore operations and minimizes the use of Google '
        'App Engine quota. Turn event recording on if you want to analyze '
        'this data.'),
    False)

COURSE_EVENTS_RECEIVED = PerfCounter(
    'gcb-course-events-received',
    'A number of activity/assessment events received by the server.')

COURSE_EVENTS_RECORDED = PerfCounter(
    'gcb-course-events-recorded',
    'A number of activity/assessment events recorded in a datastore.')

UNIT_PAGE_TYPE = 'unit'
ACTIVITY_PAGE_TYPE = 'activity'


def extract_unit_and_lesson(handler):
    """Loads unit and lesson specified in the request."""

    # Finds unit requested or a first unit in the course.
    u = handler.request.get('unit')
    unit = handler.get_course().find_unit_by_id(u)
    if not unit:
        units = handler.get_course().get_units()
        for current_unit in units:
            if verify.UNIT_TYPE_UNIT == current_unit.type:
                unit = current_unit
                break
    if not unit:
        return None, None

    # Find lesson requested or a first lesson in the unit.
    l = handler.request.get('lesson')
    lesson = None
    lessons = handler.get_course().get_lessons(unit.unit_id)
    if not l:
        if lessons:
            lesson = lessons[0]
    else:
        lesson = handler.get_course().find_lesson_by_id(unit, l)
    return unit, lesson


def get_unit_and_lesson_id_from_url(url):
    """Extracts unit and lesson ids from a URL."""
    url_components = urlparse.urlparse(url)
    query_dict = urlparse.parse_qs(url_components.query)
    unit_id, lesson_id = query_dict['unit'][0], query_dict['lesson'][0]
    return unit_id, lesson_id


class CourseHandler(BaseHandler):
    """Handler for generating course page."""

    @classmethod
    def get_child_routes(cls):
        """Add child handlers for REST."""
        return [('/rest/events', EventsRESTHandler)]

    def get(self):
        """Handles GET requests."""
        user = self.personalize_page_and_get_user()
        if not user:
            self.redirect('/preview')
            return None

        student = self.personalize_page_and_get_enrolled()
        if not student:
            return

        self.template_value['units'] = self.get_units()
        self.template_value['progress'] = (
            self.get_progress_tracker().get_unit_progress(student))

        #total progress
        progressList = (self.get_progress_tracker().get_unit_progress(student))
        progress = 0.0;
        for i in progressList.values():
            if i == True:
                progress += 1
            elif i == 2:
                progress += 1
            elif i == 1:
                progress += 0.5

        if len(student.playList) == 0:
            self.template_value['playListEmpty'] = True

        progress = progress/len(progressList)
        self.template_value['progress_total'] = progress

        self.template_value['is_progress_recorded'] = (
            CAN_PERSIST_ACTIVITY_EVENTS.value)
        self.template_value['navbar'] = {'course': True}
        self.render('course.html')


class CourseNewHandler(BaseHandler):
    """Handler for generating course page."""

    @classmethod
    def get_child_routes(cls):
        """Add child handlers for REST."""
        return [('/rest/events', EventsRESTHandler)]

    def get(self):
        """Handles GET requests."""
        user = self.personalize_page_and_get_user()
        if not user:
            self.redirect('/preview')
            return None

        student = self.personalize_page_and_get_enrolled()
        if not student:
            return

        if len(student.playList) == 0:
            self.template_value['empty'] = True

        self.template_value['units'] = self.get_units()
        self.template_value['progress'] = (
            self.get_progress_tracker().get_unit_progress(student))
        self.template_value['is_progress_recorded'] = (
            CAN_PERSIST_ACTIVITY_EVENTS.value)
        self.template_value['navbar'] = {'course': True}
        self.render('course_playlist.html')


class PlayListUnitHandler(BaseHandler):
    """Handler for generating unit page."""

    def get(self):
        """Handles GET requests."""
        student = self.personalize_page_and_get_enrolled()
        if not student:
            return

        if student.playList is None or len(student.playList) == 0:
            return

        resume = self.request.get('resume')
        if resume:
            index = student.playListIndex
        else:
            index = self.request.get('index')

        if not index:
            index = 0
        index = int(index)

        if index >= len(student.playList):
            index = 0

        unit, lesson = get_unit_lesson_from_playlist(self.get_course(), student.playList, index)
        # Extract incoming args
        unit_id = unit.unit_id

        # If the unit is not currently available, and the user is not an admin,
        # redirect to the main page.
        if (not unit.now_available and
                not Roles.is_course_admin(self.app_context)):
            self.redirect('/')
            return

        # Set template values for nav bar and page type.
        self.template_value['navbar'] = {'course': True}
        self.template_value['page_type'] = UNIT_PAGE_TYPE

        lessons = self.get_lessons(unit_id)

        # Set template values for a unit and its lesson entities
        self.template_value['unit'] = unit
        self.template_value['unit_id'] = unit_id
        self.template_value['lesson'] = lesson
        self.template_value['lessons'] = lessons

        # If this unit contains no lessons, return.
        if not lesson:
            self.render('unit.html')
            return

        lesson_id = lesson.lesson_id
        self.template_value['lesson_id'] = lesson_id

        # Format back button.
        if index == 0:
            self.template_value['back_button_url'] = ''
        else:
            prev_unit, prev_lesson = get_unit_lesson_from_playlist(self.get_course(), student.playList, index - 1)
            print 'prev' + prev_unit.unit_id + " : " + str(prev_lesson.lesson_id)
            if prev_lesson.activity:
                self.template_value['back_button_url'] = (
                    'activityplaylist?index=%s' % (index))
            else:
                self.template_value['back_button_url'] = (
                    'unitplaylist?index=%s' % (index - 1))

        # Format next button.
        if lesson.activity:
            self.template_value['next_button_url'] = (
                'activityplaylist?index=%s' % (index))
        else:
            if not index < len(student.playList) - 1:
                self.template_value['next_button_url'] = ''
            else:
                next_unit, next_lesson = get_unit_lesson_from_playlist(self.get_course(), student.playList, index + 1)
                print 'next' + next_unit.unit_id + " : " + str(next_lesson.lesson_id)
                self.template_value['next_button_url'] = (
                    'unitplaylist?index=%s' % (
                        index + 1))
        student.playListIndex = index
        student.put()

            # Set template values for student progress
        self.template_value['is_progress_recorded'] = (
            CAN_PERSIST_ACTIVITY_EVENTS.value)
        if CAN_PERSIST_ACTIVITY_EVENTS.value:
            self.template_value['progress'] = (
                self.get_progress_tracker().get_lesson_progress(
                    student, unit_id))

        self.render('unit.html')

class UnitHandler(BaseHandler):
    """Handler for generating unit page."""

    def get(self):
        """Handles GET requests."""
        student = self.personalize_page_and_get_enrolled()
        if not student:
            return

        # Extract incoming args
        unit, lesson = extract_unit_and_lesson(self)
        unit_id = unit.unit_id

        # If the unit is not currently available, and the user is not an admin,
        # redirect to the main page.
        if (not unit.now_available and
                not Roles.is_course_admin(self.app_context)):
            self.redirect('/')
            return

        # Set template values for nav bar and page type.
        self.template_value['navbar'] = {'course': True}
        self.template_value['page_type'] = UNIT_PAGE_TYPE

        lessons = self.get_lessons(unit_id)

        # Set template values for a unit and its lesson entities
        self.template_value['unit'] = unit
        self.template_value['unit_id'] = unit_id
        self.template_value['lesson'] = lesson
        self.template_value['lessons'] = lessons

        # If this unit contains no lessons, return.
        if not lesson:
            self.render('unit.html')
            return

        lesson_id = lesson.lesson_id
        self.template_value['lesson_id'] = lesson_id

        index = lesson.index - 1  # indexes are 1-based

        # Format back button.
        if index == 0:
            self.template_value['back_button_url'] = ''
        else:
            prev_lesson = lessons[index - 1]
            if prev_lesson.activity:
                self.template_value['back_button_url'] = (
                    'activity?unit=%s&lesson=%s' % (
                        unit_id, prev_lesson.lesson_id))
            else:
                self.template_value['back_button_url'] = (
                    'unit?unit=%s&lesson=%s' % (unit_id, prev_lesson.lesson_id))

        # Format next button.
        if lesson.activity:
            self.template_value['next_button_url'] = (
                'activity?unit=%s&lesson=%s' % (
                    unit_id, lesson_id))
        else:
            if not index < len(lessons) - 1:
                self.template_value['next_button_url'] = ''
            else:
                next_lesson = lessons[index + 1]
                self.template_value['next_button_url'] = (
                    'unit?unit=%s&lesson=%s' % (
                        unit_id, next_lesson.lesson_id))

        # Set template values for student progress
        self.template_value['is_progress_recorded'] = (
            CAN_PERSIST_ACTIVITY_EVENTS.value)
        if CAN_PERSIST_ACTIVITY_EVENTS.value:
            self.template_value['progress'] = (
                self.get_progress_tracker().get_lesson_progress(
                    student, unit_id))

        self.render('unit.html')

def get_unit_lesson_from_playlist(course, playlist, index):
    unit, lesson = playlist[index].split(".")

    unit = course.find_unit_by_id(unit)
    return unit, course.find_lesson_by_id(unit, int(lesson))

class ActivityHandler(BaseHandler):
    """Handler for generating activity page and receiving submissions."""

    def get(self):
        """Handles GET requests."""
        student = self.personalize_page_and_get_enrolled()
        if not student:
            return

        # Extract incoming args
        unit, lesson = extract_unit_and_lesson(self)
        unit_id = unit.unit_id

        # If the unit is not currently available, and the user is not an admin,
        # redirect to the main page.
        if (not unit.now_available and
            not Roles.is_course_admin(self.app_context)):
            self.redirect('/')
            return

        # Set template values for nav bar and page type.
        self.template_value['navbar'] = {'course': True}
        self.template_value['page_type'] = ACTIVITY_PAGE_TYPE

        lessons = self.get_lessons(unit_id)

        # Set template values for a unit and its lesson entities
        self.template_value['unit'] = unit
        self.template_value['unit_id'] = unit_id
        self.template_value['lesson'] = lesson
        self.template_value['lessons'] = lessons

        # If this unit contains no lessons, return.
        if not lesson:
            self.render('activity.html')
            return

        lesson_id = lesson.lesson_id
        self.template_value['lesson_id'] = lesson_id
        self.template_value['activity_script_src'] = (
            self.get_course().get_activity_filename(unit_id, lesson_id))

        index = lesson.index - 1  # indexes are 1-based

        # Format back button.
        self.template_value['back_button_url'] = (
            'unit?unit=%s&lesson=%s' % (unit_id, lesson_id))

        # Format next button.
        if not index < len(lessons) - 1:
            self.template_value['next_button_url'] = ''
        else:
            next_lesson = lessons[index + 1]
            self.template_value['next_button_url'] = (
                'unit?unit=%s&lesson=%s' % (
                    unit_id, next_lesson.lesson_id))

        # Set template value for event recording
        self.template_value['record_events'] = CAN_PERSIST_ACTIVITY_EVENTS.value

        # Set template values for student progress
        self.template_value['is_progress_recorded'] = (
            CAN_PERSIST_ACTIVITY_EVENTS.value)
        if CAN_PERSIST_ACTIVITY_EVENTS.value:
            self.template_value['progress'] = (
                self.get_progress_tracker().get_lesson_progress(
                    student, unit_id))

        self.template_value['event_xsrf_token'] = (
            XsrfTokenManager.create_xsrf_token('event-post'))

        # Mark this page as accessed. This is done after setting the student
        # progress template value, so that the mark only shows up after the
        # student visits the page for the first time.
        self.get_course().get_progress_tracker().put_activity_accessed(
            student, unit_id, lesson_id)

        self.render('activity.html')

class PlayListActivityHandler(BaseHandler):
    """Handler for generating activity page and receiving submissions."""

    def get(self):
        """Handles GET requests."""
        student = self.personalize_page_and_get_enrolled()
        if not student:
            return

        if student.playList is None or len(student.playList) == 0:
            return

        index = self.request.get('index')

        if not index:
            index = 0
        index = int(index)

        if index >= len(student.playList):
            index = 0

        unit, lesson = get_unit_lesson_from_playlist(self.get_course(), student.playList, index)
        unit_id = unit.unit_id

        # If the unit is not currently available, and the user is not an admin,
        # redirect to the main page.
        if (not unit.now_available and
                not Roles.is_course_admin(self.app_context)):
            self.redirect('/')
            return

        # Set template values for nav bar and page type.
        self.template_value['navbar'] = {'course': True}
        self.template_value['page_type'] = ACTIVITY_PAGE_TYPE

        lessons = self.get_lessons(unit_id)

        # Set template values for a unit and its lesson entities
        self.template_value['unit'] = unit
        self.template_value['unit_id'] = unit_id
        self.template_value['lesson'] = lesson
        self.template_value['lessons'] = lessons

        # If this unit contains no lessons, return.
        if not lesson:
            self.render('activity.html')
            return

        lesson_id = lesson.lesson_id
        self.template_value['lesson_id'] = lesson_id
        self.template_value['activity_script_src'] = (
            self.get_course().get_activity_filename(unit_id, lesson_id))

        # Format back button.
        self.template_value['back_button_url'] = (
            'unitplaylist?index=%s' % (index))

        # Format next button.
        if not index < len(student.playList) - 1:
            self.template_value['next_button_url'] = ''
        else:
            self.template_value['next_button_url'] = (
                'unitplaylist?index=%s' % (index + 1))

        # Set template value for event recording
        self.template_value['record_events'] = CAN_PERSIST_ACTIVITY_EVENTS.value

        # Set template values for student progress
        self.template_value['is_progress_recorded'] = (
            CAN_PERSIST_ACTIVITY_EVENTS.value)
        if CAN_PERSIST_ACTIVITY_EVENTS.value:
            self.template_value['progress'] = (
                self.get_progress_tracker().get_lesson_progress(
                    student, unit_id))

        self.template_value['event_xsrf_token'] = (
            XsrfTokenManager.create_xsrf_token('event-post'))

        # Mark this page as accessed. This is done after setting the student
        # progress template value, so that the mark only shows up after the
        # student visits the page for the first time.
        self.get_course().get_progress_tracker().put_activity_accessed(
            student, unit_id, lesson_id)

        self.render('activity.html')


class AssessmentHandler(BaseHandler):
    """Handler for generating assessment page."""

    def get(self):
        """Handles GET requests."""
        if not self.personalize_page_and_get_enrolled():
            return

        # Extract incoming args
        unit_id = self.request.get('name')
        self.template_value['navbar'] = {'course': True}
        self.template_value['assessment_script_src'] = (
            self.get_course().get_assessment_filename(unit_id))
        self.template_value['unit_id'] = unit_id
        self.template_value['record_events'] = CAN_PERSIST_ACTIVITY_EVENTS.value
        self.template_value['assessment_xsrf_token'] = (
            XsrfTokenManager.create_xsrf_token('assessment-post'))
        self.template_value['event_xsrf_token'] = (
            XsrfTokenManager.create_xsrf_token('event-post'))

        self.render('assessment.html')


class HomeWorkHandler(BaseHandler):
    """Handler for home works."""

    def get(self):
        """Handles GET requests."""
        student = self.personalize_page_and_get_enrolled()
        if not student:
            return

        u = self.request.get('unit')
        hws = self.get_homeworks()

        if not u:
            u = -1

        u = int(u)
        homework = None
        if u != -1:
            for hw in hws:
                if hw.id == u:
                    homework = hw
        else:
            homework = hws[0]
            u = homework.id

        categories = []
        for h in hws:
            cat = None
            for c in categories :
                if c[0] == h.category:
                    cat = c

            if cat is not None:
                cat[1].append(h)
            else:
                categories.append([h.category, [h]])

        self.template_value['homework'] = homework
        self.template_value['homeworks'] = hws
        self.template_value['cats'] = categories
        self.template_value['homework_id'] = u

        self.render('homework.html')

class PlayListHandler(BaseHandler):
    """Handler for home works."""
    def get(self):
        """Handles GET requests."""
        student = self.personalize_page_and_get_enrolled()
        if not student:
            return

        if student.playList is not None:
            print 'playlist found'
            playList = []
            for p in student.playList:
                print p
                unit = {}
                unit['unit'], unit['lesson'] = p.split(".")
                unit['unit'] = unit['unit']
                unit['lesson'] = int(unit['lesson'])
                playList.append(unit)

            if len(student.playList) == 0:
                self.template_value['playList'] = 'None'
                self.template_value['total'] = 0
            else:
                # for p in playList:
                #     print p['unit'] + p['lesson']
                self.template_value['playList'] = playList
                self.template_value['total'] = len(playList)
        else:
            self.template_value['playlist'] = 'None'
            self.template_value['total'] = 0

        self.render('playlist.html')

    def post(self):
        student = self.personalize_page_and_get_enrolled()
        if not student:
            return

        total = self.request.get('total')
        total = int(total)

        playList = []
        for i in range(0, total):
            lesson = self.request.get('lesson.' + str(i))
            playList.append(lesson)

        student.playList = playList
        student.playListIndex = 0
        student.put()

        if student.playList is not None:
            print 'playlist found'
            playList = []
            for p in student.playList:
                print p
                unit = {}
                unit['unit'], unit['lesson'] = p.split(".")
                unit['unit'] = unit['unit']
                unit['lesson'] = int(unit['lesson'])
                playList.append(unit)

            if len(student.playList) == 0:
                self.template_value['playList'] = 'None'
                self.template_value['total'] = 0
            else:
                # for p in playList:
                #     print p['unit'] + p['lesson']
                self.template_value['playList'] = playList
                self.template_value['total'] = len(playList)
        else:
            self.template_value['playlist'] = 'None'
            self.template_value['total'] = 0

        self.render('playlist.html')

class EventsRESTHandler(BaseRESTHandler):
    """Provides REST API for an Event."""

    def post(self):
        """Receives event and puts it into datastore."""

        COURSE_EVENTS_RECEIVED.inc()
        if not CAN_PERSIST_ACTIVITY_EVENTS.value:
            return

        request = transforms.loads(self.request.get('request'))
        if not self.assert_xsrf_token_or_fail(request, 'event-post', {}):
            return

        user = self.get_user()
        if not user:
            return

        source = request.get('source')
        payload_json = request.get('payload')

        models.EventEntity.record(source, user, payload_json)
        COURSE_EVENTS_RECORDED.inc()

        self.process_event(user, source, payload_json)

    def process_event(self, user, source, payload_json):
        """Processes an event after it has been recorded in the event stream."""

        if source == 'attempt-activity':
            student = models.Student.get_enrolled_student_by_email(user.email())
            if not student:
                return
            payload = transforms.loads(payload_json)
            source_url = payload['location']
            unit_id, lesson_id = get_unit_and_lesson_id_from_url(source_url)
            if unit_id is not None and lesson_id is not None:
                self.get_course().get_progress_tracker().put_block_completed(
                    student, unit_id, lesson_id, payload['index'])
