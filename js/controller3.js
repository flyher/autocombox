var autocomboxApp = angular.module("autocomboxApp", []);

autocomboxApp.controller("autocomboxController", function ($scope) {

    $scope.rangs_base = [
        {
            value: "provice",
            text: "省份",
            enable:true,
            options: [
                {
                    value: "include",
                    text: "包含",
                    enable: true
                }, {
                    value: "notinclude",
                    text: "不包含",
                    enable: true
                }
            ]
        },
        {
            value: "city",
            text: "城市",
            enable: true,
            options: [
                {
                    value: "include",
                    text: "包含",
                    enable: true
                }, {
                    value: "notinclude",
                    text: "不包含",
                    enable: true
                }
            ]
        },
        {
            value: "sex",
            text: "性别",
            enable: true,
            options: [
                {
                    value: "include",
                    text: "包含",
                    enable: true
                }, {
                    value: "notinclude",
                    text: "不包含",
                    enable: true
                }
            ]
        }
    ];

    $scope.rangs_show = angular.copy($scope.rangs_base);

    $scope.rows = [
        {
            id:1,
            rang_value: $scope.rangs_base[0],
            include_value: $scope.rangs_base[0].options[0]
        }
    ]

    $scope.a = "";

    $scope.test = function (v) {
        var b = "";
    }
});