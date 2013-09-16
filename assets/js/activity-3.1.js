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

    '<b>1.</b> Select the one that is not an advantage of using NoSQL databases',

    { questionType: 'multiple choice',
        choices: [['Horizontal scalability', false, 'Please try again.'],
            ['Can run on commodity hardware', false, 'Please try again.'],
            ['Can store semi-structured data', false, 'Please try again.'],
            ['The data model behind NoSQL databases are backed by strong mathematical models', true, 'Correct.']]},

    '<br><b>2.</b>Select the underlying file system used by HBase for storing data',

    { questionType: 'multiple choice',
        choices: [['HDFS', true, 'Correct.'],
            ['NFS', false, 'Please try again.'],
            ['Fat32', false, 'Please try again.'],
            ['NTFS', false, 'Please try again.']]},

    '<br><b>3.</b>The HBase data model can be viewed as a ',

    { questionType: 'multiple choice',
        choices: [['List', false, 'Please try again.'],
            ['Map', true, 'Please try again.'],
            ['Stack', false, 'Please try again.'],
            ['Tree', false, 'Please try again.']]},

    '<br><b>4.</b>Which of the following is not true about HBase',
    { questionType: 'multiple choice',
        choices: [['Schema is flexible', false, 'Please try again.'],
            ['Designed for commodity hardware', false, 'Please try again.'],
            ['Data size is limited to Terabytes', false, 'Please try again.'],
            ['Read write throughput is high compared to RDBMs', true, 'Correct.']]},

    '<br><b>5.</b>HBase provides a MapReduce API, true or false?',
    { questionType: 'multiple choice',
        choices: [['True', true, 'Correct.'],
            ['False', true, 'Please try again.']]}
];
