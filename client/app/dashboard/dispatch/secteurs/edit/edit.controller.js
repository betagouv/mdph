'use strict';

angular.module('impactApp')
  .controller('SecteurEditCtrl', function($state, secteur, evaluators, currentMdph) {
    this.name =  secteur.name;
    this.communes = secteur.communes;

    this.add = (form) => {
      if (!form.$valid) {
        return;
      }

      this.communes.push(this.codePostal);
      this.codePostal = '';
    };

    this.remove = (idx) => {
      this.communes.splice(idx, 1);
    };

    this.save = () => {
      secteur.name = this.name;
      secteur.communes = this.communes;
      secteur.mdph = currentMdph._id;
      secteur.$save({mdph: currentMdph.zipcode}, function() {
        $state.go('^', {}, {reload: true});
      });
    };

    this.cancel = function() {
      $state.go('^', {}, {reload: true});
    };
  });
