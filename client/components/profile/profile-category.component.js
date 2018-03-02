'use strict';

const PROFILE_CATEGORY_COMPONENT_NAME = 'profileCategory';

const profileCategoryComponent = {
  bindings: {
    options: '<',
    profile: '<',
    completion: '<',
  },
  templateUrl: 'components/profile/profile-category.html',
  controllerAs: 'profileCategoryCtrl',
  controller: class profileCategoryController {
    constructor($state, ProfileService) {
      const { title, subhead, content, icon, model, action } = this.options;

      this.$state = $state;
      this.title = title;
      this.subhead = subhead;
      this.content = content;
      this.icon = icon;
      this.action = action;

      this.section = _.property(model)(this.profile);
      this.updatedAt = this.section && this.section.updatedAt;
      this.mandatory = this.computeMandatory(model, ProfileService);
      this.completion = this.completion || this.computeCompletion();
    }

    go() {
      this.$state.go(this.action.sref, {}, {reload:true});
    }

    computeCompletion() {
      if (this.section && this.section.__completion) {
        return 'complete';
      } else if (this.mandatory) {
        return 'error';
      }
    }

    computeMandatory(model, ProfileService) {
      if (model === 'identites.representant') {
        return ProfileService.representantObligatoire(this.profile);
      } else if (model === 'identites.autorite') {
        return ProfileService.autoriteObligatoire(this.profile);
      } else {
        return this.options.mandatory;
      }
    }

    static get $inject() {
      return [
        '$state', 'ProfileService'
      ];
    }
  }
};

angular.module('impactApp')
  .component(PROFILE_CATEGORY_COMPONENT_NAME, profileCategoryComponent);
