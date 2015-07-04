
describe('	Given the main page is requested', function() {
  var mainPage = require('./pages/main.js');

  describe('When the main page loads, ', function() {
    beforeEach(function() {
      mainPage.get();
    });
  
    //Scenario: When application starts, the main page is displayed.
    it('then the main page should have the main page title ', function() {
        mainPage.getTitle().then(function(title) {
            expect(title).toEqual('Behavior UI');
        });
    });

    it('then the page should contain the main content section ', function() {
        expect(mainPage.mainContainer.isDisplayed()).toBe(true);
    });

    it('then the page should should contain tree div ', function() {
        expect(mainPage.treeContainer.isDisplayed()).toBe(true);
    });

    it('then the page should should contain workspace div ', function() {
        expect(mainPage.workspaceContainer.isDisplayed()).toBe(true);
    });

    // 141112 kfw this test removed. Preview will be moved to an external browser window/tab.
//    it('then the page should should contain preview div ', function() {
//        expect(mainPage.previewContainer.isDisplayed()).toBe(true);
//    });
    //    it('then the tree should contain New Project button ', function() {
//        expect(mainPage.treeNewProjectButton.isDisplayed()).toBe(true);
//    });
//
//    it('then the New Project button should have New Project text ', function() {
//        expect(mainPage.treeNewProjectButton.getText()).toEqual(mainPage.treeNewProjectButtonText);
//    });
//

//    it('then the tree should contain Open Project button ', function() {
//        expect(mainPage.treeOpenProjectButton.isDisplayed()).toBe(true);
//    });
//
//    it('then the New Project button should have Open Project text', function() {
//        expect(mainPage.treeOpenProjectButton.getText()).toEqual(mainPage.treeOpenProjectButtonText);
//    });
//
  });

});
  
