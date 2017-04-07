'use strict';

/* globals jasmine */

describe('ProfilCtrl', function() {
  let $controller;
  let $modal;

  let toastr = {
    error() {},

    success() {}
  };

  beforeEach(function() {
    module('impactApp');
  });

  beforeEach(inject(function(_$controller_, _$modal_) {
    $controller = _$controller_;
    $modal = _$modal_;
  }));

  describe('nouvelleDemande', function() {

    describe('without missing section', function() {
      var spyRequestRessource = jasmine.createSpy('spy');
      function RequestResource(par) {
        spyRequestRessource(par);
        this.$save = function() {};
      }

      describe('with a need for CV', function() {
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

        let controller;

        beforeEach(function() {
          controller = $controller('ProfilCtrl', {
            $state: {},
            $modal: {},
            $http: {},
            User: {},
            ProfileService,
            RequestResource,
            currentUser: {_id: '5678'},
            profile: {_id: '1234'},
            currentRequest: {},
            hasRequest: false,
            toastr,
            $anchorScroll: {}
          });
        });

        it('should create a Request with the correct parameters', function() {
          controller.nouvelleDemande();
          expect(spyRequestRessource).toHaveBeenCalled();
          expect(spyRequestRessource.calls.first().args[0].profile).toEqual('1234');
          expect(spyRequestRessource.calls.first().args[0].user).toEqual('5678');
          expect(spyRequestRessource.calls.first().args[0].askedDocumentTypes[0]).toEqual('cv');
        });

      });

      describe('without a need for CV', function() {
        let ProfileService = {
          estAdulte() {
            return true;
          },

          getMissingSection() {
            return [];
          },

          needUploadCV() {
            return false;
          }
        };

        let controller;

        beforeEach(function() {
          controller = $controller('ProfilCtrl', {
            $state: {},
            $modal: {},
            $http: {},
            User: {},
            ProfileService,
            RequestResource,
            currentUser: {_id: '5678'},
            profile: {_id: '1234'},
            currentRequest: {},
            hasRequest: 0,
            toastr,
            $anchorScroll: {}
          });

          spyRequestRessource.calls.reset();
        });

        it('should create a Request with the correct parameters', function() {
          controller.nouvelleDemande();
          expect(spyRequestRessource).toHaveBeenCalled();
          expect(spyRequestRessource.calls.first().args[0].profile).toEqual('1234');
          expect(spyRequestRessource.calls.first().args[0].user).toEqual('5678');
          expect(spyRequestRessource.calls.first().args[0].askedDocumentTypes.length).toEqual(0);
        });

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

      let controller;

      beforeEach(function() {
        controller = $controller('ProfilCtrl', {
          $state: {},
          $modal: {},
          $http: {},
          User: {},
          ProfileService,
          RequestResource: {},
          currentUser: {_id: '5678'},
          profile: {_id: '1234'},
          currentRequest: {},
          hasRequest: 0,
          toastr,
          $anchorScroll
        });
      });

      it('should set the anchor to the missing section and notify the error with toastr', function() {
        controller.nouvelleDemande();
        expect($anchorScroll).toHaveBeenCalled();
        expect($anchorScroll.calls.first().args[0]).toEqual('beneficiaire');
        expect(controller.options.beneficiaire.error).toEqual(true);
      });

    });
  });

  describe('should delete profile and go back to departement page', function() {
    let $state = {
      go() {}
    };

    beforeEach(function() {
      spyOn($state, 'go');
    });

    var spyRequestRessource = jasmine.createSpy('spy');
    function RequestResource(par) {
      spyRequestRessource(par);
      this.$delete = function() {};
    }

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

    let profile = {
      $delete(args, callback) {
        return callback();
      },

      getTitle() {
        return null;
      }
    };

    // http://stackoverflow.com/questions/21214868/mocking-modal-in-angularjs-unit-tests
    let fakeModal = {
      result: {
        then: function(confirmCallback, cancelCallback) {
          //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog

          this.confirmCallBack = confirmCallback;
          this.cancelCallback = cancelCallback;
          return confirmCallback(true);
        }
      },

      close: function(item) {
        //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item

        this.result.confirmCallBack(item);

      },

      dismiss: function(type) {
        //The user clicked cancel on the modal dialog, call the stored cancel callback

        this.result.cancelCallback(type);

      }
    };

    let controller;

    beforeEach(function() {
      controller = $controller('ProfilCtrl', {
        $state,
        $modal,
        $http: {},
        User: {},
        ProfileService,
        RequestResource,
        currentUser: {_id: '5678'},
        profile,
        currentRequest: {},
        hasRequest: 0,
        toastr,
        $anchorScroll: {}
      });
    });

    beforeEach(inject(function($modal) {
      spyOn($modal, 'open').and.returnValue(fakeModal);
    }));

    it('should go back to departement', function() {
      controller.delete();

      expect($modal.open).toHaveBeenCalled();
      expect($state.go).toHaveBeenCalled();
      expect($state.go.calls.argsFor(0)[0]).toEqual('departement');
    });

  });
});
