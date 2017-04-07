'use strict';

angular.module('impactApp')
  .component('passwordStrengthBar', {
    bindings: {
      password: '<'
    },
    templateUrl: 'components/password-strength-bar/password-strength-bar.html',
    controllerAs: 'passwordStrengthBarCtrl',
    controller() {
      const labels = [
        'Très faible',
        'Faible',
        'Moyen',
        'Fort',
        'Excellent'
      ];

      const classes = [
        'progress-bar-danger',
        'progress-bar-danger',
        'progress-bar-warning',
        'progress-bar-info',
        'progress-bar-success'
      ];

      this.refreshScore = (password) => {
        const score = password ? zxcvbn(password).score : 0;
        this.percent = score * 25;
        this.label = labels[score];
        this.class = classes[score];
      };

      this.$onInit = () => {
        this.refreshScore(this.password);
      };

      this.$onChanges = (changes) => {
        this.refreshScore(changes.password.currentValue);
      };

    }
  });
