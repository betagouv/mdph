'use strict';

angular.module('impactApp')
  .config(function ($stateProvider) {
    $stateProvider
      // Sections
      .state('departement.demande.autorite', {
        url: '/autorite',
        templateUrl: 'app/demande/section/autorite/autorite.html',
        controller: 'FormSectionCtrl',
        resolve: {
          section: function(SectionUtils, sections) {
            return _.find(sections, {id: 'autorite'});
          },
          sectionModel: function(SectionUtils, request, section) {
            return SectionUtils.resolveSectionModel(request, section);
          },
          saveSection: function(SectionUtils, sectionModel, updateRequest) {
            return SectionUtils.resolveSaveSection(sectionModel, updateRequest);
          }
        }
      })
      .state('departement.demande.vie_quotidienne', {
        url: '/vie_quotidienne',
        templateUrl: 'app/demande/section/section.html',
        controller: 'SectionCtrl',
        abstract: true,
        resolve: {
          section: function(SectionUtils, sections) {
            return _.find(sections, {id: 'vie_quotidienne'});
          },
          sectionModel: function(SectionUtils, request, section) {
            return SectionUtils.resolveSectionModel(request, section);
          },
          saveSection: function(SectionUtils, sectionModel, updateRequest) {
            return SectionUtils.resolveSaveSection(sectionModel, updateRequest);
          }
        }
      })
      .state('departement.demande.vie_scolaire', {
        url: '/vie_scolaire',
        templateUrl: 'app/demande/section/section.html',
        controller: 'SectionCtrl',
        abstract: true,
        resolve: {
          section: function(SectionUtils, sections) {
            return _.find(sections, {id: 'vie_scolaire'});
          },
          sectionModel: function(SectionUtils, request, section) {
            return SectionUtils.resolveSectionModel(request, section);
          },
          saveSection: function(SectionUtils, sectionModel, updateRequest) {
            return SectionUtils.resolveSaveSection(sectionModel, updateRequest);
          }
        }
      })
      .state('departement.demande.vie_au_travail', {
        url: '/vie_au_travail',
        templateUrl: 'app/demande/section/section.html',
        controller: 'SectionCtrl',
        abstract: true,
        resolve: {
          section: function(SectionUtils, sections) {
            return _.find(sections, {id: 'vie_au_travail'});
          },
          sectionModel: function(SectionUtils, request, section) {
            return SectionUtils.resolveSectionModel(request, section);
          },
          saveSection: function(SectionUtils, sectionModel, updateRequest) {
            return SectionUtils.resolveSaveSection(sectionModel, updateRequest);
          }
        }
      })
      .state('departement.demande.renouvellement', {
        url: '/renouvellement',
        templateUrl: 'app/demande/section/section.html',
        controller: 'SectionCtrl',
        abstract: true,
        resolve: {
          section: function(SectionUtils, sections) {
            return _.find(sections, {id: 'renouvellement'});
          },
          sectionModel: function(SectionUtils, request, section) {
            return SectionUtils.resolveSectionModel(request, section);
          },
          saveSection: function(SectionUtils, sectionModel, updateRequest) {
            return SectionUtils.resolveSaveSection(sectionModel, updateRequest);
          }
        }
      })
      .state('departement.demande.aidant', {
        url: '/aidant',
        templateUrl: 'app/demande/section/section.html',
        controller: 'SectionCtrl',
        abstract: true,
        resolve: {
          section: function(SectionUtils, sections) {
            return _.find(sections, {id: 'aidant'});
          },
          sectionModel: function(SectionUtils, request, section) {
            return SectionUtils.resolveSectionModel(request, section);
          },
          saveSection: function(SectionUtils, sectionModel, updateRequest) {
            return SectionUtils.resolveSaveSection(sectionModel, updateRequest);
          }
        }
      })
      .state('departement.demande.documents', {
        url: '/documents',
        templateUrl: 'app/demande/section/documents/documents.html',
        controller: 'DocumentsCtrl',
        resolve: {
          section: function(SectionUtils, sections) {
            return _.find(sections, {id: 'documents'});
          },
          sectionModel: function(SectionUtils, request, section) {
            return SectionUtils.resolveSectionModel(request, section);
          }
        }
      });
  });
