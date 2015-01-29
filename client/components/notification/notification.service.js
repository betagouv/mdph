'use strict';

angular.module('impactApp')
  .factory('NotificationService', function RecapitulatifService(Notification) {

    return {
      createNotification: function(request, state, message) {
        var notification = new Notification();
        notification.userId = request.user._id;
        notification.requestId = request.shortId;
        notification.state = state;
        notification.message = message;
        notification.$save();
      },

      createNotificationAdmin: function(request, state, message) {
        var notification = new Notification();
        notification.userId = request.evaluator;
        notification.requestId = request.shortId;
        notification.state = state;
        notification.message = message;
        notification.$save();
      }
    };

  });
