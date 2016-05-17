'use strict';

angular.module('impactApp')
  .component('requestProgress', {
    bindings: {
      request: '='
    },
    templateUrl: 'components/request/request.progress.html',
    controllerAs: 'rpg',
    controller() {
      this.values = [
        {
          title: 'Transmission',
          status: 'en_cours',
          desc: {
            done: `Envoyée le ${moment(this.request.submittedAt).format('Do MMMM YYYY à HH:mm')}`
          }
        },
        {
          title: 'Validation',
          status: 'emise',
          desc: {
            active: 'En attente de validation par votre MDPH'
          }
        },
        {
          title: 'À compléter',
          status: 'en_attente_usager',
          warning: true
        },
        {
          title: 'Enregistrée',
          status: 'enregistree',
          desc: {
            done: 'Validée, en cours de traitement dans votre MDPH'
          }
        }
      ];

      this.getDesc = function(value) {
        if (!value.desc) {
          return null;
        }

        if (value.done) {
          return value.desc.done;
        } else if (value.active) {
          return value.desc.active;
        }
      };

      function refreshActive(values, request) {
        let found = false;
        values.reverse().forEach(value => {
          if (found) {
            value.done = true;
          }

          if (request.status === value.status) {
            value.active = true;
            found = true;
          }
        });

        if (request.status === 'enregistree') {
          _.find(values, {status: 'enregistree'}).active = false;
          _.find(values, {status: 'enregistree'}).done = true;
        }

        values.reverse();
      }

      function refreshHidden(values, request) {
        let byStatus = _.indexBy(values, 'status');

        if (request.status === 'en_attente_usager') {
          byStatus.enregistree.hidden = true;
          byStatus.emise.hidden = true;
        } else if (request.status === 'enregistree') {
          byStatus.en_attente_usager.hidden = true;
          byStatus.emise.hidden = true;
        } else {
          byStatus.en_attente_usager.hidden = true;
          byStatus.enregistree.hidden = true;
        }
      }

      refreshActive(this.values, this.request);
      refreshHidden(this.values, this.request);
    }
  });
