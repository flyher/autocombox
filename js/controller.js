var autocomboxApp = angular.module("autocomboxApp", []);

autocomboxApp.controller("autocomboxController", function ($scope) {

    $scope.rang_initdata = [

    ];


    $scope.rangs_base = [
        {
            id: 1,
            text: "省份",
            value:"provice",
            enable: true,
            count:2,
            option: [
                {
                    id: 1,
                    text: "包含",
                    value: "include",
                    enable: true,
                    count: 2
                },
                {
                    id: 2,
                    text: "不包含",
                    value: "notinclude",
                    enable: true,
                    count: 2
                }
            ]
        },
        {
            id: 2,
            text: "城市",
            value: "city",
            enable: true,
            count: 2,
            option: [
                {
                    id: 1,
                    text: "包含",
                    value: "include",
                    enable: true,
                    count: 2
                },
                {
                    id: 2,
                    text: "不包含",
                    value: "notinclude",
                    enable: true,
                    count: 2
                }
            ]
        },
        {
            id: 3,
            text: "性别",
            value: "sex",
            enable: false,
            count: 2,
            option: [
                {
                    id: 1,
                    text: "包含",
                    value: "include",
                    enable: true,
                    count: 2
                },
                {
                    id: 2,
                    text: "不包含",
                    value: "notinclude",
                    enable: true,
                    count: 2
                }
            ]
        }
    ];

    $scope.includes_base = [
        {
            id: 1,
            text: "包含",
            value: "include",
            enable: true,
            count: 2
        },
        {
            id: 2,
            text: "不包含",
            value: "notinclude",
            enable: true,
            count: 2
        }
    ];

    $scope.test="222";

    $scope.rangs_show = angular.copy($scope.rangs_base);
    $scope.includes_show= angular.copy($scope.includes_base);


    //默认选中
    $scope.rangs_show_selected = $scope.rangs_show[0];
    $scope.includes_show_selected = $scope.includes_show[0];

    $scope.rows_base = [
        {
            id: 1,
            rang_id: 0,
            rang_value: $scope.rangs_show[0],
            include_id: 0,
            include_value: $scope.includes_show[0]
            //rangs_show: 
        }
    ];
    $scope.rows_show = [
        {
            id: 1,
            rang_id: 0,
            rang_value: $scope.rangs_show[0],
            include_id: 0,
            include_value: $scope.includes_show[0]
            //rangs_show: 
        }
    ];

    //已选索引
    $scope.index_used = [];
    //可选索引
    $scope.index_enable = [];

    //增加一栏(触发rang/include)
    $scope.add_row = function () {
        console.log("111");

        var index_list = [];
        var index_used = [];
        var index_enable = [];
        //初始化索引数组
        for (var i = 0; i < $scope.rangs_show.length; i++) {
            //index_list.push($scope.rangs_show[i].id + "|" + 0);
            //index_list.push($scope.rangs_show[i].id + "|" + 1);
            index_list.push(i + "|" + 0);
            index_list.push(i + "|" + 1);
        }

        //已经使用的索引集合
        for (var i = 0; i < $scope.rows_show.length; i++) {
            index_used.push($scope.rows_show[i].rang_id + "|" + $scope.rows_show[i].include_id);
        }

        //剩余可用的index_enable
        for (var i = 0; i < index_list.length; i++) {
            var noused = true;
            for (var j = 0; j < index_used.length; j++) {
                if (index_list[i] == index_used[j]) {
                    noused = false;
                }
            }
            if (noused) {
                index_enable.push(index_list[i]);
            }
        }
        console.log(index_used);
        console.log(index_enable);
        //cope.index_enable = index.enable;

        var rang_id = 0;
        var include_id = 0;
        if (index_enable.length > 0) {
            rang_id = index_enable[0].split("|")[0];
            include_id = index_enable[0].split("|")[1];
        }
        else {
            console.log("已满");
            return false;
        }

        var row_tmp = {
            id: $scope.rows_show[$scope.rows_show.length - 1].id + 1,
            rang_id: rang_id,
            rang_value: $scope.rangs_show[rang_id],
            include_id: include_id,
            include_value: $scope.includes_show[include_id]
        };

        $scope.rows_show.push(row_tmp);
        $scope.rows_base.push(row_tmp);
    },
    //删除一栏
    $scope.del_row = function (rowid) {
        console.log("222");
        var rows_tmp = [];
        for (var i = 0; i < $scope.rows_show.length; i++) {
            if ($scope.rows_show[i].id != rowid) {
                rows_tmp.push($scope.rows_show[i]);
            }
        }
        $scope.rows_show = rows_tmp;
        $scope.rows_base = rows_tmp;
    }

    //更新下拉框范围
    $scope.update_rang_show = function (rowid) {

        var index_used = [];
        //已经使用的索引集合
        for (var i = 0; i < $scope.rows_show.length; i++) {
            index_used.push($scope.rows_show[i].rang_id + "|" + $scope.rows_show[i].include_id);
        }
        //循环自身,发现是否重复选中
        var noused = true;
        for (var i = 0; i < $scope.rows_show.length; i++) {
            for (var j = i + 1; j < $scope.rows_show.length; j++) {
                if ($scope.rows_show[i].rang_id == $scope.rows_show[i].rang_id && $scope.rows_show[j].rang_id == $scope.rows_show[j].rang_id) {
                    noused = false;
                    console.log($scope.rows_show[i] + "#" + $scope.rows_show[j]);
                    break;
                }
            }
        }
        console.log(noused);

        if (!noused) {//需要还原
            $scope.rows_show = $scope.rows_base;
        } else if (noused) {//无需还原
            $scope.rows_base = $scope.rows_show;
        }


    }

    //查看一栏
    $scope.show_row = function () {
        console.log($scope.rows_show);

    }

});