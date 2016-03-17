'use strict';

angular.module('impactApp')
  .controller('EspacePersoCtrl', function($scope, sections, sectionsUniqueProfile, currentUser) {
    debugger;
    if (currentUser.isMultiProfiles) {
      $scope.sections = sections;
    } else {
      $scope.sections = sectionsUniqueProfile;
    }

  });
