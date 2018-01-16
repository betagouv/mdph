'use strict';

angular.module('impactApp')
  .controller('PrestationsCtrl', function($state, RequestResource, prestations, currentRequest) {
    this.request = currentRequest;
    this.types = _.groupBy(prestations, 'type');

    this.submit = () => {
      this.request.prestations =_.chain(this.prestations)
        .filter(current => current.choice)
        .map(function(value) {
          return {code: value.id, precision: value.precision};
        })
        .value();

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

    this.esms = prestations.esms;
    this.prestations.push(this.esms);

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
        this[prestation.code].choice = true;
        this[prestation.code].precision = prestation.precision;
      });
    }
  });
