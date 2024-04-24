app.controller("AppController", [
    "$scope",
    "zendeskService",

    function ($scope, zendeskService) {
        $scope.pesquisarCliente = function () {
            zendeskService
                .getClientData($scope.cpf)
                .then((response) => {
                    console.log(response);
                })
                .catch(function (error) {
                    // Manipular erros aqui
                    console.error(error);
                });
        };
    },
]);
