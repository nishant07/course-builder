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

    '<b>1.</b> Select the one that is not a commercial cloud offering',

    { questionType: 'multiple choice',
        choices: [['Amazon Web Services', false, 'Please try again.'],
            ['Twitter', false, 'Correct.'],
            ['Google App Engine', false, 'Please try again.'],
            ['Microsoft Azure', true, 'Please try again']]},

    '<br><b>2.</b>Select which sentence describes Hadoop',

    { questionType: 'multiple choice',
        choices: [['A programming model for distributed computing', false, 'Please try again.'],
            ['A Software Library that implements map reduce', true, 'Correct.']]},


    '<br><b>3.</b>Which of the following is not an advantage of cloud computing',

    { questionType: 'multiple choice',
        choices: [['No need to have in house data centers', false, 'Please try again.'],
            ['Time and money savings because no need to maintain physical machines', false, 'Please try again.'],
            ['Data security ', true, 'Correct.'],
            ['Doesn’t have to buy expensive software licenses ', false, 'Please try again']]},

    '<br><b>4.</b>What is a biggest concern for a company when moving their applications to the cloud',

    { questionType: 'multiple choice',
        choices: [['Information security', true, 'Correct.'],
            ['Cost of operation', false, 'Please try again.'],
            ['Training employees', false, 'Please try again.'],
            ['Availability of cloud platforms', false, 'Please try again']]},

    '<br><b>5.</b>If you want to build an application with the maximum control of a cloud environment what service layer you will choose to build your application',
    { questionType: 'multiple choice',
        choices: [['IaaS', true, 'Correct.'],
            ['PaaS', false, 'Please try again.'],
            ['SaaS', false, 'Please try again.'],
            ['None of the above', false, 'Please try again']]},

    '<br><b>6.</b>Select all the function that is not handled by MapReduce',
    { questionType: 'multiple choice',
        choices: [['Fault handling', false, 'Please try again.'],
            ['Parallelization', false, 'Please try again.'],
            ['Data distribution among computation nodes', false, 'Please try again.'],
            ['Data security', true, 'Correct']]},

    '<br><b>7.</b>MapReduce is a batch processing model, true or false?',
    { questionType: 'multiple choice',
        choices: [['True', true, 'Correct.'],
            ['False', false, 'Please try again.']]}
];

