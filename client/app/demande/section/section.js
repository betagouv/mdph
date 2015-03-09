'use strict';

angular.module('impactApp')
  .factory('SectionUtils', function SectionUtils($http) {
    return {
      resolveSaveSection: function(sectionModel, updateRequest) {
        return function() {
          sectionModel.__completion = true;
          updateRequest();
        };
      },
      resolveSectionModel: function(request, section) {
          if (typeof request.formAnswers[section.id] === 'undefined') {
            request.formAnswers[section.id] = {};
          }
          return request.formAnswers[section.id];
      },
      findSection: function(sections, sectionId) {
        var section = _.find(sections, {id: sectionId});
        return $http.get('api/questions/' + sectionId).then(function(result) {
          section.questions = _.indexBy(result.data, 'model');
          return section;
        });
      }
    };
  })
  .config(function ($stateProvider) {
    $stateProvider
      // Sections
      .state('departement.demande.identites', {
        url: '/identites',
        templateUrl: 'app/demande/section/identites/identites.html',
        controller: 'IdentitesCtrl',
        resolve: {
          section: function(SectionUtils, sections) {
            return SectionUtils.findSection(sections, 'identites');
          },
          sectionModel: function(SectionUtils, request, section) {
            return SectionUtils.resolveSectionModel(request, section);
          },
          saveSection: function(SectionUtils, sectionModel, updateRequest) {
            return SectionUtils.resolveSaveSection(sectionModel, updateRequest);
          }
        }
      })
      .state('departement.demande.autorite', {
        url: '/autorite',
        templateUrl: 'app/demande/section/autorite/autorite.html',
        controller: 'FormSectionCtrl',
        resolve: {
          section: function(SectionUtils, sections) {
            return SectionUtils.findSection(sections, 'autorite');
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
            return SectionUtils.findSection(sections, 'vie_quotidienne');
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
            return SectionUtils.findSection(sections, 'vie_scolaire');
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
            return SectionUtils.findSection(sections, 'vie_au_travail');
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
            return SectionUtils.findSection(sections, 'renouvellement');
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
            return SectionUtils.findSection(sections, 'aidant');
          },
          sectionModel: function(SectionUtils, request, section) {
            return SectionUtils.resolveSectionModel(request, section);
          },
          saveSection: function(SectionUtils, sectionModel, updateRequest) {
            return SectionUtils.resolveSaveSection(sectionModel, updateRequest);
          }
        }
      })
      .state('departement.demande.contact_partenaire', {
        url: '/contact_partenaire',
        templateUrl: 'app/demande/section/contact_partenaire/contact_partenaire.html',
        controller: 'FormSectionCtrl',
        resolve: {
          section: function(SectionUtils, sections) {
            return SectionUtils.findSection(sections, 'contact_partenaire');
          },
          sectionModel: function(SectionUtils, request, section) {
            return SectionUtils.resolveSectionModel(request, section);
          },
          saveSection: function(SectionUtils, sectionModel, updateRequest) {
            return SectionUtils.resolveSaveSection(sectionModel, updateRequest);
          }
        }
      })
      .state('departement.demande.situations_particulieres', {
        url: '/situations_particulieres',
        templateUrl: 'app/demande/section/section.html',
        controller: 'SectionCtrl',
        abstract: true,
        resolve: {
          section: function(SectionUtils, sections) {
            return SectionUtils.findSection(sections, 'situations_particulieres');
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
            return SectionUtils.findSection(sections, 'documents');
          },
          sectionModel: function(SectionUtils, request, section) {
            return SectionUtils.resolveSectionModel(request, section);
          },
          saveSection: function(SectionUtils, sectionModel, updateRequest) {
            return SectionUtils.resolveSaveSection(sectionModel, updateRequest);
          }
        }
      });
  });
