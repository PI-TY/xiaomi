<?php
require('./_connect.php');

//书写sql语句
$sql = "CREATE TABLE users (
			user_id VARCHAR(300) NOT NULL PRIMARY KEY,
			user_ phonenumber VARCHAR(30) NOT NULL,
			user_password VARCHAR(300) NOT NULL,
			user_mailbox VARCHAR(300) NOT NULL,
)";
$result = mysqli_query($conn,$sql);
if($result){
	echo "数据表创建成功";
}else{
	echo "数据表创建失败";
}

?>