angular.module('impactApp').component('mesProfils', {
  templateUrl: 'components/mes_profils/mes_profils.html',
  controller: 'MesProfilsCtrl',
  controllerAs: 'mesprofilsctrl',
  bindings: {
    hideNew: '=',
    user: '='
  }
});
