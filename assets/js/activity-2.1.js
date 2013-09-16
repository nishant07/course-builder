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

    '<b>1.</b> Select the service not provided by Amazon Cloud',

    { questionType: 'multiple choice',
        choices: [['EBS', false, 'Please try again.'],
            ['S3', false, 'Please try again.'],
            ['EC2', false, 'Please try again.'],
            ['Z3', true, 'Correct.'],
            ['SQS', false, 'Please try again']]},

    '<br><b>2.</b>Where are the AMIs stored in',

    { questionType: 'multiple choice',
        choices: [['EBS', true, 'Correct.'],
            ['S3', false, 'Please try again.'],
            ['EC2', false, 'Please try again.'],
            ['SNS', false, 'Please try again.']]},

    '<br><b>3.</b>Select the one which is not a Virtual Image managers',

    { questionType: 'multiple choice',
        choices: [['Eucalyptus', true, 'Please try again.'],
            ['Nimbus', false, 'Please try again.'],
            ['OpenNebula', false, 'Please try again.'],
            ['Hadoop', true, 'Correct.']]},

    '<br><b>4.</b>Anyone can login to a private Virtual Machine in Amazon, true or false?',
    { questionType: 'multiple choice',
        choices: [['False', true, 'Correct.'],
            ['True', false, 'Please try again.']]},

    '<br><b>5.</b>In Amazon S3 what is the basic unit of data storage',
    { questionType: 'multiple choice',
        choices: [['Bucket', true, 'Please try again.'],
            ['Object', true, 'Correct.'],
            ['Key', false, 'Please try again.'],
            ['Metadata', false, 'Please try again']]},

    '<br><b>6.</b>Select the one that is not a Hypervisor',
    { questionType: 'multiple choice',
        choices: [['Xen', false, 'Please try again.'],
            ['KVM', false, 'Please try again.'],
            ['VMWare', false, 'Please try again.'],
            ['Linux', true, 'Correct']]},

    '<br><b>7.</b>Which of the following cannot be used to create Infrastructure as a Service (IaaS)',
    { questionType: 'multiple choice',
        choices: [['OpenStack', false, 'Please try again.'],
            ['Nimbus', false, 'Please try again.'],
            ['S3', true, 'Correct'],
            ['OpenNebula', true, 'Please try again.'],
            ['Eucalyptus', true, 'Please try again.']]}
];
