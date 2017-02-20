angular.module('angularNotes', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // Cuando se cargue la página, pide del API todas las notas
    $http.get('/api/notes')
        .success(function(data) {
            $scope.notes = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // Cuando se añade un nueva nota, manda el texto de la nota a la API
    $scope.createNote = function(){
        $http.post('/api/notes', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.notes = data;
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

    // Borra una nota
    $scope.deleteNote = function(id) {
        $http.delete('/api/notes/' + id)
            .success(function(data) {
                $scope.notes = data;
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

    //Cuando se añade un nueva nota favorita
    $scope.addNoteFavourite = function(){
        $http.post('/api/favourites/', {user: 'luismi', favouritesNotes: $scope.favourites})
            .success(function(data) {
                $scope.favourites = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

    // Cuando click boton peticion de todos las favoritas
  $scope.renderFavourites = function(){
    $http.get('/api/favourites')
        .success(function(data) {
            $scope.favourites = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
      }

}
