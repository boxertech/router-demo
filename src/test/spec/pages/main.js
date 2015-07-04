//var basePage = require('basePage');
var q = require('q');

var MainPage = function () {
  //string constants
  //this.treeNewProjectButtonText = "New...";
  //this.treeOpenProjectButtonText = "Open...";
  this.NewProjectHeaderText = "Create New Project";
  this.OpenProjectHeaderText = "Open Project";
  this.ProjectNameLabelText = "Project Name";
  this.ProjectDirectoryLabelText = "Directory Path";
  //this.BuildFromExistingSiteLabelText = "Create from existing site";
  //this.ExistingSiteLabelText = "Select site directory";
  this.ProjectNameInputPlaceholder = "project name...";
  this.ProjectDirectoryInputPlaceholder = "directory path...";
  //this.ellipsis = "...";
  this.cancel = "Cancel";
  this.create = "Create";
  this.open = "Open";
  this.toolbarCollapsedWidth = "20px";
  this.toolbarExpandedWidth = "95px"; //this evaluates t0 "80px" in Chrome. IE subtracts padding; evaluates to 72px;

  //primary element ids
  var mainContainerId = "be-main";
  var treeContainerId = "be-main-tree";
  var workspaceContainerId = "be-main-workspace";
  var previewContainerId = "be-main-preview";

  //menu element ids
  var menuFileId = "be-main-menu-file";
  var menuNewProjectId = "be-main-menu-new-project";
  var menuOpenProjectId = "be-main-menu-open-project";

  //tree element ids
  var treeNewProjectButtonId = "be-main-tree-btn-new-project";
  var treeOpenProjectButtonId = "be-main-tree-btn-open-project";

  //project dialog ids
  var projectDialogId = "be-main-project-dialog";
  var projectDialogHeaderId = "project-dialog-header";
  //var openProjectDialogHeaderId = "project-dialog-open-header";
  var projectNameLabelId = "project-dialog-name-label";
  var projectNameInputId = "project-dialog-name-textbox";
  var projectDirectoryLabelId = "project-dialog-directory-label";
  var projectDirectoryInputId = "project-dialog-directory-textbox";
  var projectDialogFileSystemTree = "project-dialog-file-tree";
  var projectCancelButtonId = "project-dialog-btn-cancel";
  var projectActionButtonId = "project-dialog-btn-action";
  //var existingSiteLabelId = "project-dialog-existing-site-label";
  //var existingSiteInputId = "project-dialog-existing-site-fileinput";

  //workspace element ids/classes
  //var toolbarClass = "toolbar"
  var toolbarDivId = "tool-div";
  var workCanvasId = "be-main-workcanvas";

  //primary elements
  this.mainContainer = element(by.id(mainContainerId));
  this.treeContainer = element(by.id(treeContainerId));
  this.workspaceContainer = element(by.id(workspaceContainerId));
  this.previewContainer = element(by.id(previewContainerId));

  //menu elements
  this.menuFile = element(by.id(menuFileId));
  this.menuNewProject = element(by.id(menuNewProjectId));
  this.menuOpenProject = element(by.id(menuOpenProjectId));

  //tree elements
  this.treeOpenProjectButton = element(by.id(treeOpenProjectButtonId));

  //project dialog elements
  this.NewProjectDialog = element(by.id(projectDialogId));
  this.OpenProjectDialog = element(by.id(projectDialogId));
  this.ProjectDialogHeader = element(by.id(projectDialogHeaderId));
  //this.OpenProjectDialogHeader = element(by.id(projectDialogHeaderId));
  this.ProjectNameLabel = element(by.id(projectNameLabelId));
  this.ProjectNameInput = element(by.id(projectNameInputId));
  this.ProjectDirectoryLabel = element(by.id(projectDirectoryLabelId));
  this.ProjectDirectoryInput = element(by.id(projectDirectoryInputId));
  //this.NewProjectDirectorySearchButton = element(by.id(newProjectDirectorySearchButtonId));
  this.ProjectCancelButton = element(by.id(projectCancelButtonId));
  this.ProjectActionButton = element(by.id(projectActionButtonId));
  //this.ExistingSiteLabel = element(by.id(existingSiteLabelId));
  //this.ExistingSiteInput = element(by.id(existingSiteInputId));
  this.ProjectDialogFileSystemTree = element(by.id(projectDialogFileSystemTree));

  //workspace elements
  this.toolbar = element(by.css('.toolbar'));
  this.toolbarDiv = element(by.id(toolbarDivId));
  this.workCanvas = element(by.id(workCanvasId));

  //page actions
  this.get = function() {
      browser.get('/');
  };

  this.getTitle = function() {
      return browser.getTitle();
  };

  //menu actions
  this.ClickFileMenu = function() {
    var fileMenu = this.menuFile;
    fileMenu.click();
  };
  this.ClickNewProjectMenu = function() {
    var newProjectMenu = this.menuNewProject;
    newProjectMenu.click();
  };
  this.ClickOpenProjectMenu = function() {
    var openProjectMenu = this.menuOpenProject;
    openProjectMenu.click();
  };

  //tree actions

  //custom selector
  function immediateSelector(locator, parentElement){
    console.log("in here");
    var selector = locator || 'ul li';
    var parent = parentElement || document;
    var elements = parent.querySelectorAll(selector);
    return elements;
  }

  function getTreeLevels(parent, visibleOnly){
    var deferredFunc = q.defer();
    var levels = 0;
    by.addLocator("immediate", immediateSelector);
    parent.isElementPresent(by.css('.ya-node')).then(function(yaNodeFound){
      if (!yaNodeFound){
        deferredFunc.resolve(levels);
        return;
      }
      //.ya-node present
      var yaNode = element(by.immediate('.ya-node',parent), parent); //by.css
      yaNode.isElementPresent(by.tagName('ul')).then(function(ulElemFound){
        if (!ulElemFound){
          deferredFunc.resolve(levels);
          return;
        }
        //ul present
        var ulHidden = true;
        element(by.immediate('ul', yaNode)).then(function(ulelem){ //by.tagName
          ulelem.getCssValue('display').then(function(displayValue){
            if (displayValue.indexOf('none') < 0){
              ulHidden = false;
            }
            if (visibleOnly && ulHidden){
              deferredFunc.resolve(levels);
              return;
            }

            //count this level, and check for next
            levels = 1;
            var ulinnards;
            ulelem.getInnerHtml().then(function(ulinner){
              ulinnards = ulinner;

              ulelem.all(by.tagName('li')).then(function(lis){
                var promises = [];
                lis.forEach(function(lielem, index, array){
                  var deferred = q.defer();
                  var liLevels = 0;
                  lielem.element(by.xpath('..')).then(function(xpathul){
                    xpathul.getInnerHtml().then(function(xpathinnards){
                      if (xpathinnards===ulinnards){
                        getTreeLevels(lielem, visibleOnly).then(function(childLevels){
                          deferred.resolve(childLevels);
                        });
                      } else{
                        deferred.resolve(0);
                      }
                    });
                  });

                  promises.push(deferred.promise);
                });

                q.all(promises).then(function(childLevels){
                  console.log("childLevels found: "+childLevels.length);
                  var largestChildLevel = 0;
                  childLevels.forEach(function(childLevel, index, array){
                    if (childLevel > largestChildLevel){
                      largestChildLevel = childLevel;
                    }
                  });

                  levels += largestChildLevel;
                  deferredFunc.resolve(levels);
                  return;
                });
              });
            });
          });
        });
      });
    });

    return deferredFunc.promise;
  }

  //project modal actions
  this.GetBrowseFileTreeLevels = function(visibleOnly){
    var deferred = q.defer();
    var tree = this.ProjectDialogFileSystemTree;
    getTreeLevels(tree, visibleOnly).then(function(levelsFound){
      deferred.resolve(levelsFound);
    });

    return deferred.promise;
  };

}

module.exports = new MainPage();
