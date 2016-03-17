'use strict';

angular.module('impactApp')
  .controller('EspacePersoCtrl', function($scope, sections, sectionsUniqueProfile, currentUser) {
    if (currentUser.isMultiProfiles) {
      $scope.sections = sections;
    } else {
      $scope.sections = sectionsUniqueProfile;
    }

  });
