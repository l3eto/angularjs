app

.controller("appController", ['$scope', '$location', 'TicketsService',
    function ($scope, $location, TicketsService) {
    $scope.title = 'Cargando ..';
    $scope.basePath = $location.$$absUrl;
    $scope.tickets = TicketsService.get();
}])


.controller("eventsController", ['$scope', 'EventService', '$sce', 
    function ($scope, EventService, $sce) {
    $scope.$parent.title = 'Catalogs';
    $scope.events = [];
    $scope.loading = true;
    $scope.init = function() {
        EventService.getList().then(function (res) {
            $scope.events =  res;
            $scope.loading = false;
        });
    };
    $scope.html = function(html) {
        return $sce.trustAsHtml(html);
    }
}])

.controller("eventController", ['$scope', 'EventService', '$stateParams', 'EventService', 'TicketsService', 
    function ($scope, EventService, $stateParams, EventService, TicketsService) {
    $scope.$parent.title = 'Sessions';
    $scope.event = {};
    $scope.loading = true;
    $scope.tickets = $scope.$parent.tickets;
    $scope.id = $stateParams.id;
    $scope.processing = false;
    $scope.init = function () {
        EventService.getDetails($scope.id).then(function (res) {
            if (res.event && res.event.id) {
                $scope.event = res.event;
                $scope.sessions = res.sessions;
            }
            $scope.loading = false;
        });
    };
    $scope.findTicket = function(id, session) {
        return $scope.tickets.find(obj => {
            return obj.event.id == id && obj.session.date == session.date;
        });
    };
    $scope.getNumTicket = function (id, session) {
        var ticket = $scope.findTicket(id, session);
        return (ticket ? ticket.num : 0);
    };
    $scope.setTicket = function (id, session, num) {
        var index = $scope.tickets.findIndex(obj => {
            return obj.event.id == id && obj.session.date == session.date;
        });
        if (index > -1) {
            $scope.tickets[index] = {'event': $scope.event, 'session': session, 'num': num};
        } else {
            $scope.tickets.push({'event': $scope.event, 'session': session, 'num': num });
        }
    };
    $scope.addTicket = function(id, session) {
        if (!$scope.processing) {
            $scope.processing = true;
            var num = $scope.getNumTicket(id, session);
            if (num < session.availability) {
                num += 1;
                $scope.saveTicket(id, session, num);
            } else {
                $scope.processing = false;
            }
        }
    };
    $scope.removeTicket = function (id, session) {
        if (!$scope.processing) {
            $scope.processing = true;
            var num = $scope.getNumTicket(id, session);
            if (num > 0) {
                num -= 1;
                if (num == 0) {
                    $scope.deleteTicket(id, session);
                } else {
                    $scope.saveTicket(id, session, num);
                }
            } else {
                $scope.processing = false;
            }
        }
    };
    $scope.saveTicket = function(id, session, num) {
        $scope.setTicket(id, session, num);
        TicketsService.save($scope.tickets);
        $scope.processing = false;
    };
    $scope.deleteTicket = function (id, session) {
        var index = $scope.tickets.findIndex(obj => {
            return obj.event.id == id && obj.session.date == session.date;
        });
        if (index > -1) {
            $scope.tickets.splice(index, 1);
        }
        TicketsService.save($scope.tickets);
        $scope.processing = false;
    };
    $scope.trashTicket = function (data) {
        $scope.removeTicket(data.event.id, data.session);
    };
}])


;


