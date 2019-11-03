app

.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/events');
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');

    var eventsState = {
        name: 'events',
        url: '/events',
        templateUrl: 'assets/views/events.html',
        controller: 'eventsController'
    }

    var eventState = {
        name: 'event',
        url: '/event/:id',
        templateUrl: 'assets/views/event.html',
        controller: 'eventController'
    }

    $stateProvider.state(eventsState);
    $stateProvider.state(eventState);
    $stateProvider.state("otherwise", { url: '/events'});

});