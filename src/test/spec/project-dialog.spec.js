//Feature: to open or create a new project, the Project Dialog is used to gather important information
describe('Given the Main Page is open', function() {
  var mainPage = require('./pages/main.js');
  beforeEach(function() {
    mainPage.get();
  });

  describe('When the File Menu is clicked', function(){
    beforeEach(function() {
      mainPage.ClickFileMenu();
    });

    it('Then the New Project Menu item should be visibile', function(){
      expect(mainPage.menuNewProject.isDisplayed()).toBe(true);
    });
  });

  describe('When the New Project dialog opens', function() {
    beforeEach(function() {
      mainPage.ClickFileMenu();
      mainPage.ClickNewProjectMenu();
    });

    //Scenario: When New Project dialog displayed, it should display correct elements
    it('Then a New Project dialog header should be displayed', function() {
      //Then a New Project label should be displayed,
      expect(mainPage.ProjectDialogHeader.isDisplayed()).toBe(true);
    });

    //Scenario: When New Project dialog displayed, it should display correct elements
    it('Then a New Project dialog header should have New Project text', function() {
      //Then a New Project label should be displayed,
      expect(mainPage.ProjectDialogHeader.getText()).toEqual(mainPage.NewProjectHeaderText);
    });

    it('Then a Project Name label should be displayed', function() {
      //Then a Open Project label should be displayed,
      expect(mainPage.ProjectNameLabel.isDisplayed()).toBe(true);
    });

    it('Then the Project Name label should have Project Name text', function() {
      //And the New Project label should have New Project Name text
      expect(mainPage.ProjectNameLabel.getText()).toEqual(mainPage.ProjectNameLabelText);
    });

    it('Then a Project Name textbox should be displayed', function() {
      //And a New Project textbox should be displayed
      expect(mainPage.ProjectNameInput.isDisplayed()).toBe(true);
    });

    it('Then the Project Name textbox should have Project Name placeholder text', function() {
      //And the New Project textbox should have Project Name placeholder text
      expect(mainPage.ProjectNameInput.getAttribute('placeholder')).toEqual(mainPage.ProjectNameInputPlaceholder);
    });

    it('Then a Project Directory label should be displayed', function() {
      //And a New Project textbox should be displayed
      expect(mainPage.ProjectDirectoryLabel.isDisplayed()).toBe(true);
    });

    it('Then the Project directory label should have Directory text', function() {
      //And the New Project label should have New Project Name text
      expect(mainPage.ProjectDirectoryLabel.getText()).toEqual(mainPage.ProjectDirectoryLabelText);
    });

    it('Then a Project Directory textbox should be displayed', function() {
      //And a New Project textbox should be displayed
      expect(mainPage.ProjectDirectoryInput.isDisplayed()).toBe(true);
    });

    it('Then the Project directory textbox should have Project Directory placeholder text', function() {
      //And the New Project textbox should have Project Name placeholder text
      expect(mainPage.ProjectDirectoryInput.getAttribute('placeholder')).toEqual(mainPage.ProjectDirectoryInputPlaceholder);
    });

    it('And a file system navigation tree should be displayed', function() {
      //And a file system navigation tree should be displayed
      expect(mainPage.ProjectDialogFileSystemTree.isDisplayed()).toBe(true);
    });

    it('And the file system tree should display the top level file nodes', function() {
      //And the file system tree should display the top level file nodes
      mainPage.GetBrowseFileTreeLevels(true).then(function(treeLevels){
        expect(treeLevels).toEqual(1);
      });
    });

    it('And the file system tree should have two levels of nodes loaded', function() {
      //And the file system tree should have two levels of nodes locally
      mainPage.GetBrowseFileTreeLevels(false).then(function(treeLevels){
        expect(treeLevels).toEqual(2);
      });
    });

    it('Then a Cancel button should be displayed', function() {
      //And a Build From Existing Site label should be displayed
      expect(mainPage.ProjectCancelButton.isDisplayed()).toBe(true);
    });

    it('Then the Cancel Button should have Cancel text', function() {
      //And the Build From Existing Site label should have Build From Existing Site text
      expect(mainPage.ProjectCancelButton.getText()).toEqual(mainPage.cancel);
    });

    it('Then a Create button should be displayed', function() {
      //And a Build From Existing Site label should be displayed
      expect(mainPage.ProjectActionButton.isDisplayed()).toBe(true);
    });

    it('Then the Create Button should have Create text', function() {
      //And the Build From Existing Site label should have Build From Existing Site text
      expect(mainPage.ProjectActionButton.getText()).toEqual(mainPage.create);
    });

  });

  describe('When the File Menu is clicked', function(){
    beforeEach(function() {
      mainPage.ClickFileMenu();
    });

    it('Then the Open Project Menu item should be visibile', function(){
      expect(mainPage.menuOpenProject.isDisplayed()).toBe(true);
    });
  });

  describe('When the Open Project dialog opens', function() {
    beforeEach(function() {
      mainPage.ClickFileMenu();
      mainPage.ClickOpenProjectMenu();
    });

    //Scenario: When New Project dialog displayed, it should display correct elements
    it('Then a Open Project dialog header should be displayed', function() {
      //Then a New Project label should be displayed,
      expect(mainPage.ProjectDialogHeader.isDisplayed()).toBe(true);
    });

    //Scenario: When New Project dialog displayed, it should display correct elements
    it('Then a Open Project dialog header should have Open Project text', function() {
      //Then a New Project label should be displayed,
      expect(mainPage.ProjectDialogHeader.getText()).toEqual(mainPage.OpenProjectHeaderText);
    });

    //Scenario: When Open Project dialog displayed, it should display correct elements
    it('Then a Project Name label should be displayed', function() {
      //Then a Open Project label should be displayed,
      expect(mainPage.ProjectNameLabel.isDisplayed()).toBe(true);
    });

    it('And the Project Name label should have Project Name text', function() {
      //And the Open Project label should have Open Project Name text
      expect(mainPage.ProjectNameLabel.getText()).toEqual(mainPage.ProjectNameLabelText);
    });

    it('And a Project Name textbox should be displayed', function() {
      //And a Open Project textbox should be displayed
      expect(mainPage.ProjectNameInput.isDisplayed()).toBe(true);
    });

    it('And the Project Name textbox should have Project Name placeholder text', function() {
      //And the Open Project textbox should have Project Name placeholder text
      expect(mainPage.ProjectNameInput.getAttribute('placeholder')).toEqual(mainPage.ProjectNameInputPlaceholder);
    });

    it('Then a Project Directory label should be displayed', function() {
      //And a New Project textbox should be displayed
      expect(mainPage.ProjectDirectoryLabel.isDisplayed()).toBe(true);
    });

    it('Then the Project directory label should have Directory text', function() {
      //And the New Project label should have New Project Name text
      expect(mainPage.ProjectDirectoryLabel.getText()).toEqual(mainPage.ProjectDirectoryLabelText);
    });

    it('Then a Project Directory textbox should be displayed', function() {
      //And a New Project textbox should be displayed
      expect(mainPage.ProjectDirectoryInput.isDisplayed()).toBe(true);
    });

    it('Then the Project directory textbox should have Project Directory placeholder text', function() {
      //And the New Project textbox should have Project Name placeholder text
      expect(mainPage.ProjectDirectoryInput.getAttribute('placeholder')).toEqual(mainPage.ProjectDirectoryInputPlaceholder);
    });

    it('And a file system navigation tree should be displayed', function() {
      //And a file system navigation tree should be displayed
      expect(mainPage.ProjectDialogFileSystemTree.isDisplayed()).toBe(true);
    });

    it('And the file system tree should display the top level file nodes', function() {
      //And the file system tree should display the top level file nodes
      mainPage.GetBrowseFileTreeLevels(true).then(function(treeLevels){
        expect(treeLevels).toEqual(1);
      });
    });

    it('And the file system tree should have two levels of nodes loaded', function() {
      //And the file system tree should have two levels of nodes locally
      mainPage.GetBrowseFileTreeLevels(false).then(function(treeLevels){
        expect(treeLevels).toEqual(2);
      });
    });

    it('Then a Cancel button should be displayed', function() {
      //And a Build From Existing Site label should be displayed
      expect(mainPage.ProjectCancelButton.isDisplayed()).toBe(true);
    });

    it('Then the Cancel Button should have Cancel text', function() {
      //And the Build From Existing Site label should have Build From Existing Site text
      expect(mainPage.ProjectCancelButton.getText()).toEqual(mainPage.cancel);
    });

    it('Then a Create button should be displayed', function() {
      //And a Build From Existing Site label should be displayed
      expect(mainPage.ProjectActionButton.isDisplayed()).toBe(true);
    });

    it('Then the Create Button should have Create text', function() {
      //And the Build From Existing Site label should have Build From Existing Site text
      expect(mainPage.ProjectActionButton.getText()).toEqual(mainPage.open);
    });

  });
});





 
 
  
 
 
 
 
 
 

