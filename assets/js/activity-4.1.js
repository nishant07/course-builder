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

    '<b>1.</b> What is the biggest advantage of using Pig Latin',

    { questionType: 'multiple choice',
        choices: [['Performs better than Hadoop', false, 'Please try again.'],
            ['Can run without Hadoop', false, 'Please try again.'],
            ['Reduce the development time of MapReduce jobs', true, 'Correct.']]},

    '<br><b>2.</b>What is a tuple in Pig',

    { questionType: 'multiple choice',
        choices: [['Ordered set of fields', true, 'Correct.'],
            ['A relation', false, 'Please try again.'],
            ['Piece of data', false, 'Please try again.']]},

    '<br><b>3.</b>True or false. Pig does support flow control statements like if/else',
    { questionType: 'multiple choice',
        choices: [['True', true, 'Correct.'],
            ['False', true, 'Please try again.']]},


    '<br><b>4.</b>In pig latin if you want to get set of expressions and apply them to every record what is the construct you use?',
    { questionType: 'multiple choice',
        choices: [['LOAD', false, 'Please try again.'],
            ['GROUP', false, 'Please try again.'],
            ['DUMP', false, 'Please try again.'],
            ['FOREACH-GENERATE', true, 'Correct.']]},

    '<br><b>5.</b>What does BinStorage data loader do in Pig?',
    { questionType: 'multiple choice',
        choices: [['loads/stores relations using field-delimited text format', false, 'Please try again.'],
            ['loads/stores relations from or to binary files', true, 'Correct.'],
            ['loads relations from a plain-text format', false, 'Please try again.'],
            ['loads relations from a plain-text format', false, 'Please try again.']]},

    '<br><b>6.</b>Select the one that is not a supported mode by Pig Latin for executing scripts?',
    { questionType: 'multiple choice',
        choices: [['Local Mode', false, 'Please try again.'],
            ['Network Mode', true, 'Correct.'],
            ['Batch Mode', false, 'Please try again.'],
            ['Interactive Mode', false, 'Please try again.']]}
];
