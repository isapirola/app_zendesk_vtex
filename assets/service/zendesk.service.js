app.service("zendeskService", [
    "$q",
    function ($q) {
        this.getClientData = function (cpf) {
            var deferred = $q.defer();
            client
                .request({
                    url: `https://n0e6xtbvqa.execute-api.us-east-1.amazonaws.com/default/flordemaio-zendesk-mock?cpf=${cpf}`,
                    type: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        this.getOrderData = function (idPedido) {
            var deferred = $q.defer();
            client
                .request({
                    url: `https://v4c1btaq78.execute-api.us-east-1.amazonaws.com/default/allShopping?idShopping=${idPedido}`,
                    type: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };
    },
]);
