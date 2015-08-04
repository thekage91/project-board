
/* jshint -W098 */
app.controller('PivotalTrackerCtrl', ['$scope', '$http', 'PivotalTracker', function ($scope, $http, PivotalTracker) {

  $http.defaults.useXDomain = true;
  $scope.projectID = 1398148; //Passparyou project id hardcoded
  $scope.andreaID = 1748762;
  $scope.davideID = 1748768;
  $scope.ugoID = 1748750;
  $scope.nextDemoDay = new Date('08/13/2015');
  $scope.teamMembers = 3; //per ora

  $scope['package'] = {
    name: 'pivotal-tracker'
  };

  // Get all project stories
  PivotalTracker.getAllStories($scope.projectID).then(function (stories) {
    $scope.allStories = stories;
  });

  // Get all sprint stories
  PivotalTracker.getAllIterations($scope.projectID).then(function (iterations) {
    $scope.allIterations = iterations;
  });

  // Get current sprint
  // and its stories
  // and calculates remaining mandays
  PivotalTracker.getCurrentIteration($scope.projectID).then(function (currentIteration) {
    $scope.currentIterationStories = currentIteration.stories;
    $scope.currentIteration = currentIteration;
  });

  PivotalTracker.getCurrentIterationUserAssignedStories($scope.projectID, $scope.ugoID).then(function (stories) {
    $scope.storiesUgo = stories;
  });
  PivotalTracker.getCurrentIterationUserAssignedStories($scope.projectID, $scope.davideID).then(function (stories) {
    $scope.storiesDavide = stories;
  });
  PivotalTracker.getCurrentIterationUserAssignedStories($scope.projectID, $scope.andreaID).then(function (stories) {
    $scope.storiesAndrea = stories;
  });

  //Per prendere i task di una storia, vedo l'attibuto 'data-story-id' del bottone premuto
  $scope.getStoryTasks = function (storyId) {
    /*PivotalTracker.getStoryTasks($scope.projectID, element.target.getAttribute('data-story-id')).then(function (tasks) {
      $scope.tasks = tasks;
    });*/
    PivotalTracker.getStoryTasks($scope.projectID, storyId).then(function (tasks) {
      $scope.tasks = tasks;
    });

    console.log($scope.tasks);
  };

  $scope.getRemainingMandays = function (demoDay, teamMembers) {
    return PivotalTracker.getRemainingMandays(demoDay, teamMembers);
  };
}]);

//# sourceMappingURL=pivotalTrackerController.js.map