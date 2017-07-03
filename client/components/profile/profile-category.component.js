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
    constructor($state) {
      const { title, subhead, content, icon, model, action, completion } = this.options;

      this.$state = $state;
      this.title = title;
      this.subhead = subhead;
      this.content = content;
      this.icon = icon;
      this.action = action;

      this.section = _.property(model)(this.profile);
      this.updatedAt = this.section && this.section.updatedAt;
      this.completion = this.completion || this.computeCompletion();
    }

    go() {
      this.$state.go(this.action.sref);
    }

    computeCompletion() {
      if (this.section && this.section.__completion) {
        return 'complete';
      } else if (this.options.mandatory) {
        return 'error';
      }
    }

    static get $inject() {
      return [
        '$state'
      ];
    }
  }
};

angular.module('impactApp')
  .component(PROFILE_CATEGORY_COMPONENT_NAME, profileCategoryComponent);
