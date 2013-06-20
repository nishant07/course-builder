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
	preamble: '<b>This assessment addresses content in units 1-6. You can try it as many times as you like. When you click "Check Answers," we will give you your score and give you a list of lessons to review.</b><br><br>', 

	//optional list for grouping questions together (to create sub-questions) 
	questionGroups: [
	    {id: 1, groupDescription: '<p>Characterize the following three cloud computing models:</p>'},
	    {id: 2, groupDescription: '<p>Briefly explain each of the following cloud computing services. Identify two cloud providers by company name in each service category:</p>'}
	],
	
  // An ordered list of questions, with each question's type implicitly determined by the fields it possesses:
  //   choices              - multiple choice question (with exactly one correct answer)
  //   correctAnswerString  - case-insensitive string match
  //   correctAnswerRegex   - freetext regular expression match
  //   correctAnswerNumeric - freetext numeric match
  questionsList: [
    {groupID: 1, questionHTML: 'What is an IaaS (Infrastructre-as-a-Service cloud? Give one example system.',
     choices: ["A and B", "D and B", correct("A and C"), "C and D", "I don't know"]
    },

    {groupID: 1, questionHTML: 'What is a PaaS (Platform-as-a-Service cloud? Give one example system.',
     choices: [correct("True"), "False", "I don't know"]
    },

    {groupID: 1, questionHTML: 'What is a SaaS (Software-as-a-Service cloud? Give one example system.',
     correctAnswerString: 'sunrise'
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
    }
  ],

  // The assessmentName key is deprecated in v1.3 of Course Builder, and no
  // longer used. The assessment name should be set in the unit.csv file or via
  // the course editor interface.
  assessmentName: 'Test', // unique name submitted along with all of the answers

  checkAnswers: false    // render a "Check your Answers" button to allow students to check answers prior to submitting?
}
