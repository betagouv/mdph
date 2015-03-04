'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {

    var findSection = function(sectionId) {
      return function($http, sections) {
        var section = _.find(sections, {id: sectionId});
        return $http.get('api/questions/' + sectionId).then(function(result) {
          section.questions = _.indexBy(result.data, 'model');
          return section;
        });
      };
    };

    var resolveSectionModel = function(request, section) {
      if (typeof request.formAnswers[section.id] === 'undefined') {
        request.formAnswers[section.id] = {};
      }
      return request.formAnswers[section.id];
    };

    var resolveSaveSection = function(sectionModel, updateRequest) {
      return function() {
        sectionModel.__completion = true;
        updateRequest();
      };
    };

    $stateProvider
      // Sections
      .state('departement.demande.identites', {
        url: '/identites',
        templateUrl: 'app/demande/section/identites/identites.html',
        controller: 'FormSectionCtrl',
        resolve: {
          section: findSection('identites'),
          sectionModel: resolveSectionModel,
          saveSection: resolveSaveSection
        }
      })
      .state('departement.demande.autorite', {
        url: '/autorite',
        templateUrl: 'app/demande/section/autorite/autorite.html',
        controller: 'FormSectionCtrl',
        resolve: {
          section: findSection('autorite'),
          sectionModel: resolveSectionModel,
          saveSection: resolveSaveSection
        }
      })
      .state('departement.demande.vie_quotidienne', {
        url: '/vie_quotidienne',
        templateUrl: 'app/demande/section/section.html',
        controller: 'SectionCtrl',
        abstract: true,
        resolve: {
          section: findSection('vie_quotidienne'),
          sectionModel: resolveSectionModel,
          saveSection: resolveSaveSection
        }
      })
      .state('departement.demande.vie_scolaire', {
        url: '/vie_scolaire',
        templateUrl: 'app/demande/section/section.html',
        controller: 'SectionCtrl',
        abstract: true,
        resolve: {
          section: findSection('vie_scolaire'),
          sectionModel: resolveSectionModel,
          saveSection: resolveSaveSection
        }
      })
      .state('departement.demande.vie_au_travail', {
        url: '/vie_au_travail',
        templateUrl: 'app/demande/section/section.html',
        controller: 'SectionCtrl',
        abstract: true,
        resolve: {
          section: findSection('vie_au_travail'),
          sectionModel: resolveSectionModel,
          saveSection: resolveSaveSection
        }
      })
      .state('departement.demande.renouvellement', {
        url: '/renouvellement',
        templateUrl: 'app/demande/section/section.html',
        controller: 'SectionCtrl',
        abstract: true,
        resolve: {
          section: findSection('renouvellement'),
          sectionModel: resolveSectionModel,
          saveSection: resolveSaveSection
        }
      })
      .state('departement.demande.aidant', {
        url: '/aidant',
        templateUrl: 'app/demande/section/section.html',
        controller: 'SectionCtrl',
        abstract: true,
        resolve: {
          section: findSection('aidant'),
          sectionModel: resolveSectionModel,
          saveSection: resolveSaveSection
        }
      })
      .state('departement.demande.contact_partenaire', {
        url: '/contact_partenaire',
        templateUrl: 'app/demande/section/contact_partenaire/contact_partenaire.html',
        controller: 'FormSectionCtrl',
        resolve: {
          section: findSection('contact_partenaire'),
          sectionModel: resolveSectionModel,
          saveSection: resolveSaveSection
        }
      })
      .state('departement.demande.situations_particulieres', {
        url: '/situations_particulieres',
        templateUrl: 'app/demande/section/section.html',
        controller: 'SectionCtrl',
        abstract: true,
        resolve: {
          section: findSection('situations_particulieres'),
          sectionModel: resolveSectionModel,
          saveSection: resolveSaveSection
        }
      })
      .state('departement.demande.documents', {
        url: '/documents',
        templateUrl: 'app/demande/section/documents/documents.html',
        controller: 'DocumentsCtrl',
        resolve: {
          section: findSection('documents'),
          sectionModel: resolveSectionModel,
          saveSection: resolveSaveSection
        }
      });
  });
