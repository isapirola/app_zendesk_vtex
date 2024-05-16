app.controller("AppController", [
    "$scope",
    "zendeskService",

    function ($scope, zendeskService) {
        $scope.pedidos = [];
        var idsPedidos;

        $scope.validarCPF = function (cpf) {
            if (!cpf || cpf.length !== 11 || /^(.)\1+$/.test(cpf)) return false;

            // Calcula o primeiro dígito verificador
            let sum = 0;
            for (let i = 0; i < 9; i++) {
                sum += parseInt(cpf.charAt(i)) * (10 - i);
            }
            let remainder = 11 - (sum % 11);
            let digit = remainder > 9 ? 0 : remainder;

            if (parseInt(cpf.charAt(9)) !== digit) return false;

            // Calcula o segundo dígito verificador
            sum = 0;
            for (let i = 0; i < 10; i++) {
                sum += parseInt(cpf.charAt(i)) * (11 - i);
            }
            remainder = 11 - (sum % 11);
            digit = remainder > 9 ? 0 : remainder;

            return parseInt(cpf.charAt(10)) === digit;
        };

        $scope.pesquisarCliente = function () {
            zendeskService
                .getClientData($scope.cpf)
                .then((response) => {
                    $scope.clientData = JSON.parse(response);
                    idsPedidos = $scope.clientData.pedidos;
                    getAllOrders(idsPedidos);
                })
                .catch(function (error) {
                    // Manipular erros aqui
                    console.error(error);
                });
        };

        function getAllOrders(idsPedidos) {
            let promises = []; // Array para armazenar as promessas

            idsPedidos.forEach((idPedido) => {
                // Armazena cada promessa retornada por getOrderData
                promises.push(zendeskService.getOrderData(idPedido));
            });

            // Espera todas as promessas serem resolvidas
            Promise.all(promises)
                .then((responses) => {
                    // As promessas foram resolvidas, agora podemos adicionar os dados à tabela
                    $scope.$apply(() => {
                        $scope.pedidos = responses;
                    });
                })
                .catch(function (error) {
                    // Manipular erros aqui
                    console.error(error);
                });
        }

        $scope.clickPedido = function (pedido) {
            $scope.orderData = pedido;

            var span = document.getElementsByClassName("close")[0];
            var modal = document.getElementById("modalPedido");

            modal.style.display = "block";

            span.onclick = function () {
                modal.style.display = "none";
            };
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            };
        };
    },
]);
