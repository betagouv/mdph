'use strict';

describe('ProfilCtrl', function() {
  let $controller;
  let $scope = {};

  let toastr = {
    error() {}
  };

  beforeEach(function() {
    module('impactApp');
  });

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  describe('nouvelleDemande', function() {

    describe('without missing section', function() {
      let ProfileService = {
        estAdulte() {
          return true;
        },

        getMissingSection() {
          return [];
        },

        needUploadCV() {
          return true;
        }
      };

      var spyRequestRessource = jasmine.createSpy('spy');
      function RequestResource(par) {
        spyRequestRessource(par);
        this.$save = function() {};
      }

      beforeEach(function() {
        $controller('ProfilCtrl', {
          $scope,
          $state: {},
          $modal: {},
          $http: {},
          User: {},
          ProfileService,
          RequestResource,
          currentUser: {_id: '5678'},
          profile: {_id: '1234'},
          lastCreatedRequest: {},
          toastr,
          $anchorScroll: {}
        });
      });

      it('should create a Request with the correct parameters', function() {
        $scope.nouvelleDemande();
        expect(spyRequestRessource).toHaveBeenCalled();
        expect(spyRequestRessource.calls.first().args[0].profile).toEqual('1234');
        expect(spyRequestRessource.calls.first().args[0].user).toEqual('5678');
        expect(spyRequestRessource.calls.first().args[0].askedDocumentTypes[0]).toEqual('cv');
      });

    });

    describe('with a missing section', function() {
      let ProfileService = {
        estAdulte() {
          return true;
        },

        getMissingSection() {
          return ['beneficiaire'];
        }
      };

      let $anchorScroll = jasmine.createSpy('anchorScroll');

      let toastr = {
        error() {}
      };

      beforeEach(function() {
        $controller('ProfilCtrl', {
          $scope,
          $state: {},
          $modal: {},
          $http: {},
          User: {},
          ProfileService,
          RequestResource: {},
          currentUser: {_id: '5678'},
          profile: {_id: '1234'},
          lastCreatedRequest: {},
          toastr,
          $anchorScroll
        });
      });

      it('should set the anchor to the missing section and notify the error with toastr', function() {
        $scope.nouvelleDemande();
        expect($anchorScroll).toHaveBeenCalled();
        expect($anchorScroll.calls.first().args[0]).toEqual('beneficiaire');
        expect($scope.options.beneficiaire.error).toEqual(true);
      });

    });
  });
});
