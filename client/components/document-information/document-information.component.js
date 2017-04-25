'use strict';

const DOCUMENT_INFORMATION_COMPONENT_NAME = 'documentInformation';

const documentInformationComponent = {
  bindings: {
    type: '<',
    mdph: '<',
  },
  templateUrl: 'components/document-information/document-information.html',
  controllerAs: 'documentInformationCtrl'
};

angular.module('impactApp')
  .component(DOCUMENT_INFORMATION_COMPONENT_NAME, documentInformationComponent);
