Feature: The Behavior UI Main Page has a tree showing the current spec for the project

	Scenario: When the New Project button is clicked, the New Project dialog opens.
	Given the main page is requested
	 And the main page loads
	When the New Project button is clicked
	Then the New Project dialog should be displayed
	 And dialog should have New Project Header text

	Scenario: When the Open Project button is clicked, the Open Project dialog opens.
	Given the main page is requested
	 And the main page loads
	When the Open Project button is clicked
	Then the Open Project dialog should be displayed
	 And dialog should have Open Project Header text

	Scenario: When the New Project dialog is displayed, the New Project dialog opens.
	Given the main page is requested
	 And the main page loads
	When the New Project button is clicked
	Then the New Project dialog should be displayed
	 And dialog should have New Project Header text

