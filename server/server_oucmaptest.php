<?php
    //以下为数据库配置信息

    //　 用户名　 :  SAE_MYSQL_USER
    $SAE_MYSQL_USER = 'wx3j1n535z';
    //　 密　　码 :  SAE_MYSQL_PASS
    $SAE_MYSQL_PASS = 'yywwjz4hj0jw3yzmj4hzwky244z2j52mji0mxzki';
    //　 主库域名 :  SAE_MYSQL_HOST_M
    $SAE_MYSQL_HOST_M = 'w.rdc.sae.sina.com.cn';
    //　 从库域名 :  SAE_MYSQL_HOST_S
    $SAE_MYSQL_HOST_S = '';
    //　 端　　口 :  SAE_MYSQL_PORT
    $SAE_MYSQL_PORT = '3307';
    //　 数据库名 :  SAE_MYSQL_DB
    $SAE_MYSQL_DB = '';

    //数据库配置信息修改完毕，以下为代码部分

    $name = $_REQUEST["name"];
    $symbol = $_REQUEST["sym"];
            // 连主库
            $db = mysql_connect($SAE_MYSQL_HOST_M.':'.$SAE_MYSQL_PORT,$SAE_MYSQL_USER,$SAE_MYSQL_PASS);
			$number = 0;//记录查询到的结果数量
			if ($db) {
    			mysql_select_db(SAE_MYSQL_DB, $db);
                if($symbol == "all")
                    $query = "select * from teaching where name like '%".$name."%' UNION ALL 
                          select * from institute where name like '%".$name."%' UNION ALL 
                          select * from others where name like '%".$name."%';";//模糊查询名字等于用户输入的目标地点
                else
                    $query = "select * from ".$symbol." where name != '%".$name."%';";
   			 	if($r = mysql_query($query, $db)){
        			while($row = mysql_fetch_array($r)){
                        $number++;
       	 			}
    			}
                if($number == 0){
                        echo '*';
                }
                else {
                    echo $number."&";
                    if($r = mysql_query($query, $db)){
                        while($row = mysql_fetch_array($r)){
                            echo $row['name'].'#'.$row['longitude'].'#'.$row['latitude']."&";
                        }
       	 			}
    			}
       	 	}
?>