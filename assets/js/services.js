app

.factory('TicketsService', function ($window) {
    var id = 'TICKETS_SESSION_SEVICE_ANGULARJS';
    return {
        clear: function() {
            $window.sessionStorage.removeItem(id);
        },
        save: function (tickets) {
            $window.sessionStorage.setItem(id, JSON.stringify(tickets));
        },
        get: function() {
            var data = $window.sessionStorage.getItem(id);
            return (data ? angular.fromJson(data) : []);
        }
    };
})

.factory('EventService', function($http) {
    //  MOCK URLS DATA JSON
    var events =  {
        all: "http://www.mocky.io/v2/5dbc6e4331000072064c1006",
        info68: "http://www.mocky.io/v2/5dbc6e84310000c2074c1008",
        info184: "http://www.mocky.io/v2/5dbc6ea7310000c2074c1009",
        info219: "http://www.mocky.io/v2/5dbd4a63330000f35a16a16b",
        info175: "http://www.mocky.io/v2/5dbd4a63330000f35a16a16b"
    };
    return {
        getList: function(){
        return $http.get(events.all).then(function(res){
            return res.data;
        });
        },
        getDetails: function (id) {
            return $http.get(events['info'+id]).then(function (res) {
                return res.data;
            });
        }
    };
});