'use strict';

describe('RequestSectionCtrl', function() {
  var $controller;
  var scope;
  var controller;
  var MockReadModeService = {
    getReadMode() {
      return true;
    },

    toggle() {}
  };

  beforeEach(function() {
    module('impactApp');
  });

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  describe('noAnswer', function() {
    describe('When there is no answer', function() {
      var fakeSection = {
        id:'environnement',
        label:'Éléments environnementaux',
        trajectoires:{
          Toutes:[
            {
              id:0,
              Section:'éléments environnementaux',
              Libelle:'Composition du foyer',
              Trajectoire:'Toutes',
              Question:'Quelle est la situation familiale de la personne ?',
              Type:'CM',
              Reponses:[
                {
                  id:'II_1 bis_1',
                  CodeValeur:'II.1 bis.1',
                  Tri:'1',
                  Libelle:'vit seul',
                  isSelected:false,
                  isExpanded:false
                },
                {
                  id:'II_1 bis_2',
                  CodeValeur:'II.1 bis.2',
                  Tri:'2',
                  Libelle:'vit avec d\'autres personnes'
                },
                {
                  id:'II_1 bis_4',
                  CodeValeur:'II.1 bis.4',
                  Tri:'3',
                  Libelle:'a des relations familiales ou amicales'
                },
                {
                  id:'II_1 bis_5',
                  CodeValeur:'II.1 bis.5',
                  Tri:'4',
                  Libelle:'n\'a pas de relation familiale ou amicale'
                }
              ],
              isSelected:false,
              isExpanded:false
            }
          ]
        }
      };

      beforeEach(function() {
        scope = {};
        controller = $controller('RequestSectionCtrl', {$scope: scope, section: fakeSection, request: {}, ReadModeService: MockReadModeService, profileSynthese: {}});
      });

      it('should be true', function() {
        var result = scope.noAnswer;
        expect(result).toBe(true);
      });
    });

    describe('When there is an answer', function() {
      var fakeSection = {
        id:'environnement',
        label:'Éléments environnementaux',
        trajectoires:{
          Toutes:[
            {
              id:0,
              Section:'éléments environnementaux',
              Libelle:'Composition du foyer',
              Trajectoire:'Toutes',
              Question:'Quelle est la situation familiale de la personne ?',
              Type:'CM',
              Reponses:[
                {
                  id:'II_1 bis_1',
                  CodeValeur:'II.1 bis.1',
                  Tri:'1',
                  Libelle:'vit seul',
                  isSelected:true,
                  isExpanded:true
                },
                {
                  id:'II_1 bis_2',
                  CodeValeur:'II.1 bis.2',
                  Tri:'2',
                  Libelle:'vit avec d\'autres personnes'
                },
                {
                  id:'II_1 bis_4',
                  CodeValeur:'II.1 bis.4',
                  Tri:'3',
                  Libelle:'a des relations familiales ou amicales'
                },
                {
                  id:'II_1 bis_5',
                  CodeValeur:'II.1 bis.5',
                  Tri:'4',
                  Libelle:'n\'a pas de relation familiale ou amicale'
                }
              ],
              isSelected:true,
              isExpanded:true
            }
          ]
        }
      };

      beforeEach(function() {
        scope = {};
        controller = $controller('RequestSectionCtrl', {$scope: scope, section: fakeSection, request: {}, ReadModeService: MockReadModeService, profileSynthese: {}});
      });

      it('should be false', function() {
        var result = scope.noAnswer;
        expect(result).toBe(false);
      });
    });
  });

  describe('validate', function() {
    describe('When there is some answers', function() {
      var fakeSection = {
        id:'environnement',
        label:'Éléments environnementaux',
        trajectoires:{
          Toutes:[
            {
              id:0,
              Section:'éléments environnementaux',
              Libelle:'Composition du foyer',
              Trajectoire:'Toutes',
              Question:'Quelle est la situation familiale de la personne ?',
              Type:'CM',
              Reponses:[
                {
                  id:'II_1 bis_1',
                  CodeValeur:'II.1 bis.1',
                  Tri:'1',
                  Libelle:'vit seul',
                  isSelected:true,
                  isExpanded:true
                },
                {
                  id:'II_1 bis_2',
                  CodeValeur:'II.1 bis.2',
                  Tri:'2',
                  Libelle:'vit avec d\'autres personnes'
                },
                {
                  id:'II_1 bis_4',
                  CodeValeur:'II.1 bis.4',
                  Tri:'3',
                  Libelle:'a des relations familiales ou amicales'
                },
                {
                  id:'II_1 bis_5',
                  CodeValeur:'II.1 bis.5',
                  Tri:'4',
                  Libelle:'n\'a pas de relation familiale ou amicale'
                }
              ],
              isSelected:true,
              isExpanded:true
            }
          ]
        }
      };

      var fakeSynthese = {
        synthese: {
          geva: {
            environnement: {}
          }
        },

        $update() {}
      };

      beforeEach(function() {
        spyOn(fakeSynthese, '$update');
        scope = {};
        controller = $controller('RequestSectionCtrl', {$scope: scope, section: fakeSection, request: {}, ReadModeService: MockReadModeService, profileSynthese: fakeSynthese});
      });

      it('should save the answer in the request', function() {
        scope.validate();
        expect(fakeSynthese.geva.environnement).toEqual(['II_1 bis_1', 0]);
        expect(fakeSynthese.$update).toHaveBeenCalled();
      });
    });
  });

});
