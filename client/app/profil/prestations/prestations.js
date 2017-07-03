'use strict';

angular.module('impactApp').config(function($stateProvider) {
  $stateProvider.state('profil.prestations', {
    url: '/prestations',
    authenticate: true,
    resolve: {
      prestations: function($http) {
        return $http.get('api/prestations').then(function(result) {
          return result.data;
        });
      },
    },

    templateUrl: 'app/profil/prestations/prestations.html',
    controllerAs: 'prestationsCtrl',
    controller: function($state, RequestResource, prestations, currentRequest) {
      this.request = currentRequest;
      this.types = _.groupBy(prestations, 'type');

      const getSelectedPrestationIdList = (filter, prestations) => {
        return _.chain(prestations)
         .filter(filter)
         .pluck('id')
         .value();
      };

      this.submit = () => {
        this.request.renouvellements = getSelectedPrestationIdList({choice: true, renouvellement: true}, this.prestations);
        this.request.prestations = getSelectedPrestationIdList(current => current.choice && !current.renouvellement, this.prestations);

        RequestResource.update(this.request).$promise.then(result => {
          this.request = result;
          $state.go('profil');
        });
      };

      this.prestations = [];

      this.cartestationnement = prestations.cartestationnement;
      this.prestations.push(this.cartestationnement);

      this.carteinvalidite = prestations.carteinvalidite;
      this.prestations.push(this.carteinvalidite);

      this.aeeh = prestations.aeeh;
      this.prestations.push(this.aeeh);

      this.aah = prestations.aah;
      this.prestations.push(this.aah);

      this.complement = prestations.complement;
      this.prestations.push(this.complement);

      this.pch = prestations.pch;
      this.prestations.push(this.pch);

      this.rqth = prestations.rqth;
      this.prestations.push(this.rqth);

      this.crp_cpo_ueros = prestations.crp_cpo_ueros;
      this.prestations.push(this.crp_cpo_ueros);

      this.esat = prestations.esat;
      this.prestations.push(this.esat);

      this.marche_travail = prestations.marche_travail;
      this.prestations.push(this.marche_travail);

      this.marche_travail_acc = prestations.marche_travail_acc;
      this.prestations.push(this.marche_travail_acc);

      this.av = prestations.av;
      this.prestations.push(this.av);

      this.ems = prestations.ems;
      this.prestations.push(this.ems);

      this.pps = prestations.pps;
      this.prestations.push(this.pps);

      this.orp = prestations.orp;
      this.prestations.push(this.orp);

      this.formation = prestations.formation;
      this.prestations.push(this.formation);

      this.sms = prestations.sms;
      this.prestations.push(this.sms);

      this.sms_enfant = prestations.sms_enfant;
      this.prestations.push(this.sms_enfant);

      this.ac = prestations.ac;
      this.prestations.push(this.ac);

      this.acfp = prestations.acfp;
      this.prestations.push(this.acfp);

      if (this.request.prestations && this.request.prestations.length > 0) {
        this.request.prestations.forEach(prestation => {
          this[prestation].choice = true;
        });
      }

      if (this.request.renouvellements && this.request.renouvellements.length > 0) {
        this.request.renouvellements.forEach(prestation => {
          this[prestation].choice = true;
          this[prestation].renouvellement = true;
        });
      }
    }
  });
});
