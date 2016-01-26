'use strict';

describe('Controller: list.controller', function() {

  var request1;
  var request2;

  // load the service's module
  beforeEach(module('impactApp'));

  beforeEach(inject(function(_$q_) {
    var $q = _$q_;

    request1 = {
      isSelected: true,
      evaluator: 'toto',
      secteur: 'sector1',

      $update: function() {
        var deferred = $q.defer();
        return deferred.promise;
      }
    };

    request2 = {
      isSelected: false,
      evaluator: 'toto',
      secteur: 'sector2',

      $update: function() {
        var deferred = $q.defer();
        return deferred.promise;
      }
    };
  }));

  it('should select all the requests if they are not all selected', function() {
    //given
    var scope = {};

    //when
    inject(function($controller) {
      $controller('RequestListCtrl', {
        $scope: scope,
        requests: [{isSelected: false}, {isSelected: true}, {isSelected: false}],
        banette: {},
        secteurs: {},
        user: {},
        currentSecteur: {},
        currentUser: {},
      });
    });

    scope.selectAll();

    //then
    expect(_.every(scope.requests, 'isSelected')).toEqual(true);

  });

  it('should unselect all the requests if they are all true', function() {
    //given
    var scope = {};

    //when
    inject(function($controller) {
      $controller('RequestListCtrl', {
        $scope: scope,
        requests: [{isSelected: true}, {isSelected: true}, {isSelected: true}],
        banette: {},
        secteurs: {},
        user: {},
        currentSecteur: {},
        currentUser: {},
      });
    });

    scope.selectAll();

    //then
    expect(_.every(scope.requests, {isSelected: false})).toEqual(true);

  });

  it('should assign the selected requests to the currentUser', function() {
    //given
    var scope = {};

    //when
    inject(function($controller) {
      $controller('RequestListCtrl', {
        $scope: scope,
        requests: [request1, request2],
        banette: {},
        secteurs: {},
        user: {},
        currentSecteur: {},
        currentUser: {_id: '1234'},
      });
    });

    scope.assigner(scope.requests);

    //then
    expect(scope.requests[0].evaluator).toEqual('1234');
    expect(scope.requests[1].evaluator).toEqual('toto');
  });

  it('should transfer the selected requests to the sectors in the parameters', function() {
    //given
    var scope = {};

    //when
    inject(function($controller) {
      $controller('RequestListCtrl', {
        $scope: scope,
        requests: [request1, request2],
        banette: {},
        secteurs: {},
        user: {},
        currentSecteur: {},
        currentUser: {_id: '1234'},
      });
    });

    scope.transfer(scope.requests, 'newSector');

    //then
    expect(scope.requests[0].secteur).toEqual('newSector');
    expect(scope.requests[1].secteur).toEqual('sector2');
  });
});
