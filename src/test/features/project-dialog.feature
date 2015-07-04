Feature: to open or create a new project, the Project Dialog is used to gather important information

Scenario: When New Project dialog displayed, it should display correct elements
Given the Main Page is open
When the New Project dialog opens
Then a New Project label should be displayed
 And the New Project label should have New Project Name text
 And a New Project textbox should be displayed
 And the New Porject textbox should have Project Name placeholder text 
 And a Build From Existing Site checkbox should be displayed
 And the Build From Existing Site checkbox should be unchecked
 And a Build From Existing Site label should be displayed
 And the Build From Existing Site label should have Buidl From Existing Site text
 And a Existing Site label shuold not be displayed
 And a Existing Site file input should not be displayed

Scenario: When Open Project dialog displayed, it should display correct elements
Given the Main Page is open
When the Open Project dialog opens
Then a New Project label should not be displayed
 And a New Project textbox should not be displayed
 And a Build From Existing Site checkbox should be displayed
 And the Build From Existing Site checkbox should be unchecked
 And a Build From Existing Site label should be displayed
 And the Build From Existing Site label should have Build From Existing Site text
 And a Existing Site label shuold be displayed
 And the Existing Site label should have Existing Site text
 And a Existing Site file input should be displayed

Scenario: When New Project dialog displayed with info, clicking Save should create project
Given the Main Page is open
And the New Project dialog opens
When the New Project textbox has a value
 And the Save button is clicked
Then a new project is created
 And the project dialog closes

Scenario: When New Project dialog displayed without info, clicking Save should show error
Given the Main Page is open
And the New Project dialog opens
When the New Project textbox does noyt have a value
 And the Save button is clicked
Then an Must Enter Project name error is diaplyed
 And the project dialog remains open


