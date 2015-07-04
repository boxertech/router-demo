describe('Given the main page is requested', function() {
  var mainPage = require('./pages/main.js');

  describe('And Given the main page loads', function() {
    beforeEach(function() {
      mainPage.get();
    });

//    describe('When the New Project Button is clicked, ', function() {
//      beforeEach(function() {
//        mainPage.ClickNewProject();
//      });
//
//      //Scenario: When the New Project button is clicked, the New Project dialog opens.
//      it('then the New Project dialog should be displayed ', function() {
//        expect(mainPage.NewProjectDialog.isDisplayed()).toBe(true);
//      });
//
//      it('then dialog should have New Project Header text ', function() {
//        expect(mainPage.NewProjectDialogHeader.getText()).toEqual(mainPage.NewProjectHeaderText);
//      });
//    });

//    describe('When the Open Button is clicked, ', function() {
//      beforeEach(function() {
//        mainPage.ClickOpenProjectMenu();
//      });
//
//      //Scenario: When the Open Project button is clicked, the Open Project dialog opens.
//      it('then the Open Project dialog should be displayed ', function() {
//        expect(mainPage.OpenProjectDialog.isDisplayed()).toBe(true);
//      });
//
//      it('then dialog should have Open Project Header text ', function() {
//        expect(mainPage.OpenProjectDialogHeader.getText()).toEqual(mainPage.OpenProjectHeaderText);
//      });
//    });
  });

});
