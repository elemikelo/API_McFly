angular.module('angularNotes', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // Cuando se cargue la página, pide del API todas las notas
    $http.get('/api/notes')
        .success(function(data) {
            $scope.notes = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // Cuando se añade un nueva nota, manda el texto a la API
    $scope.createNote = function(){
        $http.post('/api/notes', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.notes = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

    // Borra una nota despues de checkearlo como acabado
    $scope.deleteNote = function(id) {
        $http.delete('/api/notes/' + id)
            .success(function(data) {
                $scope.notes = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
}
