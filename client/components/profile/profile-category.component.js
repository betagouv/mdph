'use strict';

const PROFILE_CATEGORY_COMPONENT_NAME = 'profileCategory';

const profileCategoryComponent = {
  bindings: {
    options: '<',
    profile: '<'
  },
  templateUrl: 'components/profile/profile-category.html',
  controllerAs: 'profileCategoryCtrl',
  controller: class demoController {
    constructor($state) {
      const { title, subhead, content, icon, model, action } = this.options;

      this.$state = $state;
      this.title = title;
      this.subhead = subhead;
      this.content = content;
      this.icon = icon;
      this.action = action;

      this.section = _.property(model)(this.profile);
      this.updatedAt = this.section && this.section.updatedAt;
      this.completion = this.computeCompletion();
    }

    go() {
      this.$state.go(this.action.sref);
    }

    getActionLabel() {
      switch (this.completion) {
        case 'empty':
          return 'Commencer';
        case 'complete':
          return 'Modifier';
        case 'half':
          return 'Reprendre';
      }
    }

    computeCompletion() {
      if (!this.section) {
        return 'empty';
      } else if (this.section.__completion) {
        return 'complete';
      } else {
        return 'half';
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
