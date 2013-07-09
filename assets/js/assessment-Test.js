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


// When the assessment page loads, activity-generic.js will render the contents
// of the 'assessment' variable into the enclosing HTML webpage.

// For information on modifying this page, see
// https://code.google.com/p/course-builder/wiki/CreateAssessments.


var assessment = {
  // HTML to display at the start of the page
	preamble: '<b>This assessment contains selected problems from <i>Distributed and Cloud Computing</i>. When you are finished answering all the questions, click "Submit" and we will give you your score. Although you can retake the assessment it is only graded once, so on your first attempt make sure you\'ve attempted all the questions before submitting!</b><br><br>', 

	//optional list for grouping questions together (to create sub-questions)
	questionGroups: [
	    {id: 1, type: 'list', groupDescription: '<p>Characterize the following three cloud computing models:</p>'},
	    {id: 2, type: 'list', groupDescription: '<p>Briefly explain each of the following cloud computing services. Identify two cloud providers by company name in each service category:</p>'}, 	 
	    {id: 4, type: 'matching', groupDescription: '<p>Map the following names or abbreviated terms on the left column with the best-match definitions or descriptions on the right column. Just enter the description (a, b, c, ...) in the blank spaces in the front of hte terms being matched to. This is a 1-to-1 correspondence.</p>'}
	],
	
  // An ordered list of questions, with each question's type implicitly determined by the fields it possesses:
  //   choices              - multiple choice question (with exactly one correct answer)
  //   correctAnswerString  - case-insensitive string match
  //   correctAnswerRegex   - freetext regular expression match
  //   correctAnswerNumeric - freetext numeric match
  questionsList: [
    {groupID: 1, questionHTML: 'What is an example of IaaS (Infrastructure-as-a-Service) cloud?',
     choices: ["Macbook Pro", "Microsoft Word", correct("Amazon EC2"), "Splay tree", "Khan Academy"]
    },

    {groupID: 1, questionHTML: 'What is an example of PaaS (Platform-as-a-Service) cloud?',
     choices: [correct("Google App Engine"), "Paypal", "Windows 8", "None of the above"]
    },

    {groupID: 1, questionHTML: 'What is an example of SaaS (Software-as-a-Service) cloud?',
     correctAnswerString: 'Salesforce'
    },
    
    {groupID: 2, questionHTML: 'Application cloud services.',
        correctAnswerString: 'sunrise'
    },
    
    {groupID: 2, questionHTML: 'Platform cloud services.',
        correctAnswerString: 'sunrise'
    },
    
    {groupID: 2, questionHTML: 'Compute and storage services.',
        correctAnswerString: 'sunrise'
    },
    
    {groupID: 2, questionHTML: 'Collocation cloud services.',
        correctAnswerString: 'sunrise'
    },
    
    {groupID: 2, questionHTML: 'Network cloud services.',
        correctAnswerString: 'sunrise'
    },
    
    {questionHTML: 'List one example of a VM:', correctAnswerString: 'sunrise'}, 
    
    {groupID: 4, termHTML: 'GAE', matchingDescription: '<strong>a</strong>) The agreement signed between users and providers in cloud computing', correctAnswerString: 'a'},
    {groupID: 4, termHTML: 'CRM', matchingDescription: '<strong>b</strong>) A public cloud that must run from WIndows 7 based host', correctAnswerString: 'b'},
    {groupID: 4, termHTML: 'AWS', matchingDescription: '<strong>c</strong>) A public cloud used mainly for PaaS applications', correctAnswerString: 'c'}, 
    {groupID: 4, termHTML: 'SLA', matchingDescription: '<strong>d</strong>) A public compute cloud used in scalable business computing application', correctAnswerString: 'd'}, 
    {groupID: 4, termHTML: 'Azure', matchingDescription: '<strong>e</strong>) A cloud platform built by SalesForce.com', correctAnswerString: 'e'}
    
  ],

  // The assessmentName key is deprecated in v1.3 of Course Builder, and no
  // longer used. The assessment name should be set in the unit.csv file or via
  // the course editor interface.
  assessmentName: 'Test', // unique name submitted along with all of the answers

  checkAnswers: false    // render a "Check your Answers" button to allow students to check answers prior to submitting?
}
