
var myapp = angular.module('birdApp',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});


myapp.controller('birdController',function($scope,$http){

    $scope.addBirdSpecies = function(){
        var dataParams = {
            'Name' : $scope.name,
            'Color' : $scope.color,
            'Size' : $scope.size,
            'Weight' : $scope.weight
        };
        console.log("Function Called");
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        var req = $http.post('http://127.0.0.1:8082/createBirdSpecies',dataParams);
        req.success(function(data, status, headers, config) {
            $scope.message = data;
            alert("Bird Added Successfully");
            $('#birdSpeciesModal').modal('toggle');
            $scope.getData();
            console.log(data);
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };

    $scope.getData=function(){
        var req = $http.get('http://127.0.0.1:8082/getBirdSpecies');
        req.success(function(data, status, headers, config) {
            $scope.birdList = data;
            console.log(data);
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });

    };


    $scope.deleteBirdSpecies = function(id,callback){
        $http.get('http://127.0.0.1:8082/deleteBirdSpecies/'+id)
            .success(function(data){
                console.log("Successfully deleted");
                $scope.getData();
            });
    };


    $scope.updateBirdSpecies = function(bird,callback){
        console.log(bird)
        $http.get('http://127.0.0.1:8082/updateBirdSpecies/'+bird._id, {params : bird})
            .success(function(data){
                alert("Bird Edited Successfully");
                console.log("Successfully updated");
                $scope.getData();
            });
    }






    $scope.addBirdSighting = function(){
        var dataParams = {
            'BirdSpecie' : $scope.bsname,
            'DateTime' : $scope.dateTime,
            'Location' : $scope.location
        };
        console.log("Function Called");
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        var req = $http.post('http://127.0.0.1:8082/createBirdSighting',dataParams);
        req.success(function(data, status, headers, config) {
            $scope.message = data;
            alert("Bird Sighting Added Successfully");
            $('#birdSightingModal').modal('toggle');
            $scope.getSightingData();
            console.log(data);
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };

    $scope.getSightingData=function(){
        var req = $http.get('http://127.0.0.1:8082/getBirdSighting');
        req.success(function(data, status, headers, config) {
            $scope.birdSightList = data;
            console.log(data);
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });

    };

    $scope.deleteBirdSighting = function(id,callback){
        $http.get('http://127.0.0.1:8082/deleteBirdSighting/'+id)
            .success(function(data){
                console.log("Successfully deleted");
                $scope.getSightingData();
            });
    };


    $scope.updateBirdSighting = function(bird,callback){
        console.log(bird)
        $http.get('http://127.0.0.1:8082/updateBirdSighting/'+bird._id, {params : bird})
            .success(function(data){
                alert("Bird Sighting Edited Successfully");
                console.log("Successfully updated");
                $scope.getSightingData();
            });
    }

});