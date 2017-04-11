'use strict';

describe('ProfilCtrl', function() {
  // Initialize our angular module
  beforeEach(() => {
    module('impactApp');
  });

  let controller;

  // Inject angular services
  beforeEach(inject((_$controller_, _$modal_, _$q_, _$state_, RequestService, RequestResource, ProfileService) => {
    spyOn(RequestResource, 'save').and.callThrough();
    spyOn(_$state_, 'go');
    spyOn(_$modal_, 'open').and.returnValue({
      // http://stackoverflow.com/questions/21214868/mocking-modal-in-angularjs-unit-tests
      result: {
        then: function(confirmCallback) {
          //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
          this.confirmCallBack = confirmCallback;
          return confirmCallback(true);
        }
      },

      close: function(item) {
        //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
        this.result.confirmCallBack(item);
      }
    });

    controller = _$controller_('ProfilCtrl', {
      $state: _$state_,
      $modal: _$modal_,
      $http: {},
      User: {},
      currentUser: {_id: '5678'},
      profile: {
        _id: '1234',
        $delete(params, callback) {
          callback();
        },

        getTitle() {}
      },
      currentRequest: {},
      hasRequest: 0,
      ProfileService,
      RequestService,
      RequestResource,
      toastr: {
        error() {},

        success() {}
      },
      $anchorScroll: jasmine.createSpy('anchorScroll')
    });
  }));

  describe('nouvelleDemande', function() {

    beforeEach(() => {
      controller.RequestResource.save.calls.reset();
    });

    describe('with a need for CV', function() {
      it('should create a Request with the correct parameters', function() {
        // given
        spyOn(controller.ProfileService, 'getMissingSection').and.returnValue(null);
        spyOn(controller.ProfileService, 'getAskedDocumentTypes').and.returnValue(['cv']);

        // when
        controller.nouvelleDemande();

        // then
        expect(controller.RequestResource.save).toHaveBeenCalled();
        expect(controller.RequestResource.save.calls.mostRecent().args[0].profile).toEqual('1234');
        expect(controller.RequestResource.save.calls.mostRecent().args[0].user).toEqual('5678');
        expect(controller.RequestResource.save.calls.mostRecent().args[0].askedDocumentTypes[0]).toEqual('cv');
      });

    });

    describe('without a need for CV', function() {
        it('should create a Request with the correct parameters', function() {
          // given
          spyOn(controller.ProfileService, 'getMissingSection').and.returnValue(null);
          spyOn(controller.ProfileService, 'getAskedDocumentTypes').and.returnValue(null);

          // when
          controller.nouvelleDemande();

          // then
          expect(controller.RequestResource.save).toHaveBeenCalled();
          expect(controller.RequestResource.save.calls.mostRecent().args[0].profile).toEqual('1234');
          expect(controller.RequestResource.save.calls.mostRecent().args[0].user).toEqual('5678');
          expect(controller.RequestResource.save.calls.mostRecent().args[0].askedDocumentTypes).toBeNull();
        });
      });

    describe('with a missing section', function() {

      beforeEach(() => {
        controller.$anchorScroll.calls.reset();
      });

      it('should set the anchor to the missing section and notify the error with toastr', function() {
        // given
        spyOn(controller.ProfileService, 'getMissingSection').and.returnValue(['beneficiaire']);
        spyOn(controller.ProfileService, 'getAskedDocumentTypes').and.returnValue(null);

        // when
        controller.nouvelleDemande();

        // then
        expect(controller.$anchorScroll).toHaveBeenCalled();
        expect(controller.$anchorScroll.calls.first().args[0]).toEqual('beneficiaire');
        expect(controller.options.beneficiaire.error).toEqual(true);
      });

    });
  });

  describe('should delete profile and go back to departement page', function() {
    beforeEach(function() {
      controller.$modal.open.calls.reset();
      controller.$state.go.calls.reset();
    });

    it('should go back to departement', function() {
      // when
      controller.delete();

      // then
      expect(controller.$modal.open).toHaveBeenCalled();
      expect(controller.$state.go).toHaveBeenCalled();
      expect(controller.$state.go.calls.argsFor(0)[0]).toEqual('departement');
    });

  });
});
