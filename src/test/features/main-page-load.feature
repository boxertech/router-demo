Feature: To use the Behavior UI machine, the application must be opened to the Main Page
	Scenario: When application starts, the main page is displayed.
	Given the main page is requested
	When the main page loads
	Then the page should contain the main content section
	 And the page should should contain tree div
	 And the page should should contain workspace div
	 And the page should should contain preview div
	 And the tree should contain New Project button
	 And the New Project button should have New Project text
	 And the tree should contain Open Project button
	 And the Open Project button should have Open Project text

	 /#
	Scenario: When the main page is displayed, tree shown if project open.
	Given the main page is requested
	When the main page loads
	 And a project is open
	Then the Project Tree should be displayed

	Scenario: When the main page is displayed, tree not displayed if project not open.
	Given the main page is requested
	When the main page loads
	 And a project is not open
	Then the Project Tree should not be displayed
	#/


