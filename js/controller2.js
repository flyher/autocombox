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
                //, {
                //    value: "mayinclude",
                //    text: "可能包含",
                //    enable: true
                //}
            ]
        }
    ];

    $scope.rangs_show = angular.copy($scope.rangs_base);

    $scope.rows = [
        {
            id:1,
            rang_value: $scope.rangs_base[0],
            include_value: $scope.rangs_base[0].options[0],
            contents:[]
        }
    ]
    //第一次,计算剩余的
    update_include_show_2(1, $scope.rangs_base[0].options[0]);


    $scope.update_rang_show = function (id, rang, include,$evant,click_rang_value) {

        //将点击的转换为对象
        for (var i = 0; i < $scope.rangs_base.length; i++) {
            if ($scope.rangs_base[i].value == click_rang_value) {
                rang = $scope.rangs_base[i];
            }
        }
        //赋值给被选中的
        for (var i = 0; i < $scope.rows.length; i++) {
            if($scope.rows[i].id==id){
                $scope.rows[i].rang_value = rang;
            }
        }


        //重新初始化提示选项

        //更新
        //被选中的值(只有1条时候,也就是当前页面中另一条已经被选中)
        //这时要更新选中的数据
        //var rangs_show= angular.copy($scope.rangs_base);
        if ($scope.options.length==1) {
            for (var i = 0; i < $scope.rows.length; i++) {
                if ($scope.rows[i].id == id) {//当前选项
                    //从可用的里面找剩余一个对象
                    for (var j = 0; j < $scope.rangs_show.length; j++) {
                        if ($scope.rangs_show[j].value == $scope.rows[i].rang_value.value) {
                            //当前对象
                            //剩余1个就是第0项了
                            var include = $scope.rangs_show[j].options[0];
                            //计算剩余这个对应的索引值
                            var rang = $scope.rows[i].rang_value;

                            $scope.rows[i].include_value = get_include_index(rang, include);
                            var b = "";
                        }

                    }
                }
            }
        }

        update_include_show_2(id, include);

        $scope.options = [];
        //更新第二栏可选框
        for (var j = 0; j < $scope.rows.length; j++) {
            if ($scope.rows[j].id == id) {
                for (var i = 0; i < $scope.rangs_show.length; i++) {
                    if ($scope.rangs_show[i].value == $scope.rows[j].rang_value.value) {
                        $scope.options = $scope.rangs_show[i].options;
                    }
                }
            }
        }

        update_include_show_2(id, include);
        //更新默认选项(可能每个的包含不同个数的选项#修正)
        //for (var i = 0; i < $scope.rows.length; i++) {
        //    if($scope.rows[i].id==id){
        //        for (var j = 0; j < $scope.rangs_show.length; j++) {

        //        }
        //    }
        //}

    } 

    //第二栏更新关联
    $scope.update_include_show = function (id,rang,include,$event,click_include_value) {


        for (var i = 0; i < $scope.rows.length; i++) {
            if ($scope.rows[i].id == id) {
                for (var j = 0; j < $scope.rangs_base.length; j++) {
                    if ($scope.rows[i].rang_value.value == $scope.rangs_base[j].value) {
                        for (var k = 0; k < $scope.rangs_base[j].options.length; k++) {
                            console.log($scope.rangs_base[j].options[k].value);
                            if ($scope.rangs_base[j].options[k].value == click_include_value) {
                                $scope.rows[i].include_value = $scope.rangs_base[j].options[k];
                            }
                        }
                    }
                }

            }
        }





        //重新初始化提示选项
        $scope.options = [];

        var rangs_show = [];
        var rangs_base = angular.copy($scope.rangs_base);
        //更新剩余可用的

        //给所有的增加true/false标识
        for (var i = 0; i < rangs_base.length; i++) {
            for (var j = 0; j < $scope.rows.length; j++) {
                if (rangs_base[i].value == $scope.rows[j].rang_value.value) {
                    for (var k = 0; k < rangs_base[i].options.length; k++) {
                        if (rangs_base[i].options[k].value == $scope.rows[j].include_value.value) {
                            rangs_base[i].options[k].enable = false;
                        }
                    }
                }
            }
        }

        for (var i = 0; i < rangs_base.length; i++) {
            var options = [];
            for (var j = 0; j < rangs_base[i].options.length; j++) {
                if (rangs_base[i].options[j].enable) {
                    options.push(
                    {
                        value: rangs_base[i].options[j].value,
                        text: rangs_base[i].options[j].text,
                        enable: rangs_base[i].options[j].enable
                    });
                }
            }

            if (options.length > 0) {
                rangs_show.push(
                    {
                        value: rangs_base[i].value,
                        text: rangs_base[i].text,
                        enable: rangs_base[i].enable,
                        options: options
                    }
                    );
            }
        }

        $scope.rangs_show = rangs_show;


        for (var j = 0; j < $scope.rows.length; j++) {
            if ($scope.rows[j].id == id) {
                for (var i = 0; i < $scope.rangs_show.length; i++) {
                    if ($scope.rangs_show[i].value == $scope.rows[j].rang_value.value) {
                        $scope.options = $scope.rangs_show[i].options;
                    }
                }
            }
        }

    }

    //添加一栏
    $scope.add_row = function () {
        if ($scope.rangs_show.length >= 1) {//剩余可被选择
            var id=$scope.rows[$scope.rows.length - 1].id + 1;
            var rang_value=$scope.rangs_show[0];
            var include_value=$scope.rangs_show[0].options[0];
            //换算成base里面的数据

            for (var i = 0; i < $scope.rangs_base.length; i++) {
                //当前这项
                if($scope.rangs_base[i].value==rang_value.value){
                    rang_value=$scope.rangs_base[i];
                    for (var j = 0; j < $scope.rangs_base[i].options.length; j++) {
                        if(include_value.value==$scope.rangs_base[i].options[j].value){
                            include_value=$scope.rangs_base[i].options[j];
                        }
                    }
                }
            }

            $scope.rows.push(
                {
                    id: id,
                    rang_value:rang_value,
                    include_value: include_value,
                    contents: []
                }
                );
            //更新show中的内容

            update_include_show_2(id, include_value);
        }
    }

    //删除一栏
    $scope.del_row = function (id) {
        var rows_tmp = [];
        var include_tmp = {};
        for (var i = 0; i < $scope.rows.length; i++) {
            if ($scope.rows[i].id!=id) {
                rows_tmp.push($scope.rows[i]);
            } else if ($scope.rows[i].id == id) {
                include_tmp = $scope.rows[i].include_value;
                //update_include_show_2(id, $scope.rows[i].include_value);// 更新show信息
            }
        }
        $scope.rows = rows_tmp;
        update_include_show_2(id, include_tmp)
    }

    $scope.show_row = function () {
        console.log($scope.rows);

    }

    function update_include_show_2 (id, include) {

        var rangs_show = [];
        var rangs_base = angular.copy($scope.rangs_base);
        //更新剩余可用的

        //给所有的增加true/false标识
        for (var i = 0; i < rangs_base.length; i++) {
            for (var j = 0; j < $scope.rows.length; j++) {
                if (rangs_base[i].value == $scope.rows[j].rang_value.value) {
                    for (var k = 0; k < rangs_base[i].options.length; k++) {
                        if (rangs_base[i].options[k].value == $scope.rows[j].include_value.value) {
                            rangs_base[i].options[k].enable = false;
                        }
                    }
                }
            }
        }

        for (var i = 0; i < rangs_base.length; i++) {
            var options = [];
            for (var j = 0; j < rangs_base[i].options.length; j++) {
                if (rangs_base[i].options[j].enable) {
                    options.push(
                    {
                        value: rangs_base[i].options[j].value,
                        text: rangs_base[i].options[j].text,
                        enable: rangs_base[i].options[j].enable
                    });
                }
            }

            if (options.length > 0) {
                rangs_show.push(
                    {
                        value: rangs_base[i].value,
                        text: rangs_base[i].text,
                        enable: rangs_base[i].enable,
                        options: options
                    }
                    );
            }
        }

        $scope.rangs_show = rangs_show;

        //如果已经被选中,则缓存去掉该项(可用选项)
        rangs_base = angular.copy($scope.rangs_base);
        for (var i = 0; i < rangs_base.length; i++) {
            for (var j = 0; j < $scope.rows.length; j++) {
                if (rangs_base[i].value == $scope.rows[j].rang_value.value) {
                    rangs_base[i].enable = false;
                }
            }
        }
        var rangs_show_tmp = [];
        for (var i = 0; i < $scope.rangs_show.length; i++) {
            var enable = true;
            for (var j = 0; j< rangs_base.length; j++) {
                if ($scope.rangs_show[i].value == rangs_base[j].value) {
                    enable= rangs_base[j].enable;
                }
            }
            if (enable) {
                rangs_show_tmp.push($scope.rangs_show[i]);
            }
        }

        $scope.rangs_show_tmp = rangs_show_tmp;

        
        for (var j = 0; j < $scope.rows.length; j++) {
            if($scope.rows[j].id==id){
                for (var i = 0; i < $scope.rangs_show.length; i++) {
                    if ($scope.rangs_show[i].value == $scope.rows[j].rang_value.value) {
                        $scope.options = $scope.rangs_show[i].options;
                    }
                }
            }
        }
        

    }

    //计算剩余对象所对的索引值
    function get_include_index(rang, include) {
        for (var i = 0; i <$scope.rangs_base.length; i++) {
            if ($scope.rangs_base[i].value==rang.value) {
                for (var j = 0; j< $scope.rangs_base[i].options.length; j++) {
                    if ($scope.rangs_base[i].options[j].value == include.value) {
                        return $scope.rangs_base[i].options[j];
                        break;
                    }
                }
            }
        }
    }

});