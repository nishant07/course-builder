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

    '<b>1.</b> Select the one that is not a MapReduce framework',

    { questionType: 'multiple choice',
        choices: [['Twister', false, 'Please try again.'],
            ['Hadoop', false, 'Please try again.'],
            ['ActiveMQ', true, 'Correct.'],
            ['Dryad', false, 'Please try again.']]},

    '<br><b>2.</b>Which is not a high level language for creating MapReduce programs?',

    { questionType: 'multiple choice',
        choices: [['C', true, 'Correct.'],
            ['Sawzall', false, 'Please try again.'],
            ['Pig Latin', false, 'Please try again.'],
            ['DryadLINQ', false, 'Please try again.']]},

    '<br><b>3.</b>Choose the feature that is not provided by Hadoop MapReduce framework',
    { questionType: 'multiple choice',
        choices: [['Automatic Parallelization & Distribution', true, 'Please try again.'],
            ['Fault tolerance', false, 'Please try again.'],
            ['Distributed File system', false, 'Please try again.'],
            ['NoSQL database', true, 'Correct.']]},

    '<br><b>4.</b>Choose the component not in Hadoop Architectures',
    { questionType: 'multiple choice',
        choices: [['Namenode', false, 'Please try again.'],
            ['Datanode', false, 'Please try again.'],
            ['TaskTracker', false, 'Please try again.'],
            ['MPI', true, 'Correct.'],
            ['Job Tracker', false, 'Please try again.']]},

    '<br><b>5.</b>What is the final phase of a Hadoop MapReduce job?',
    { questionType: 'multiple choice',
        choices: [['Map', false, 'Please try again.'],
            ['Reduce', true, 'Correct.'],
            ['Shuffle', false, 'Please try again.'],
            ['Combine', false, 'Please try again.']]},

    '<br><b>6.</b>Select weather the following statement is true or false. “Before running a Hadoop MapReduce job on a cluster of nodes, the input data must be loaded into HDFS” ',
    { questionType: 'multiple choice',
        choices: [['True', true, 'Correct.'],
            ['False', true, 'Please try again.']]},
];


