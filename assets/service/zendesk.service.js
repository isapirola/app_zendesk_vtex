app.service("zendeskService", [
    "$q",
    function ($q) {
        this.getClientData = function (cpf) {
            var deferred = $q.defer();
            client
                .request({
                    url: `https://nOe6xtbvqa.execute-api.us-east-1.amazonaws.com/default/flordemaio-zendesk-mock?cpf=${cpf}`,
                    type: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": "JBjAVMqtRovzYJ8iRJm559U5mLn9Hw17X5iVCvm9",
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
