// Copyright 2012 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


// Usage instructions: Create a single array variable named 'activity'. This
// represents explanatory text and one or more questions to present to the
// student. Each element in the array should itself be either
//
// -- a string containing a set of complete HTML elements. That is, if the
//    string contains an open HTML tag (such as <form>), it must also have the
//    corresponding close tag (such as </form>). You put the actual question
//    text in a string.
//
// -- a JavaScript object representing the answer information for a question.
//    That is, the object contains properties such as the type of question, a
//    regular expression indicating the correct answer, a string to show in
//    case of either correct or incorrect answers or to show when the student
//    asks for help. For more information on how to specify the object, please
//    see http://code.google.com/p/course-builder/wiki/CreateActivities.

var activity = [

    '<b>1.</b> In Matrix multiplication choose a factor that doesn\'t slowed down the speed up as a size increases',

    { questionType: 'multiple choice',
        choices: [['Large values of the integers in the matrix ', false, 'Please try again.'],
            ['data I/O and replication times', false, 'Please try again.'],
            ['Integer division', true, 'Correct.'],
            ['Sorting and grouping', false, 'Please try again.']]},

    '<br><b>2.</b>Choose the false statement about K-Means',

    { questionType: 'multiple choice',
        choices: [['K means can return more that K clusters', true, 'Correct.'],
            ['Initially it chooses K centers', false, 'Please try again.'],
            ['In each iteration K clusters are chosen by associating points to the nearest center', false, 'Please try again.'],
            ['The iteration continues until convergence or fixed number of times', false, 'Please try again.']]},

    '<br><b>3.</b>K-Means is an iterative algorithm, true or false?',
    { questionType: 'multiple choice',
        choices: [['True', true, 'Correct.'],
            ['False', true, 'Please try again.']]},
];
