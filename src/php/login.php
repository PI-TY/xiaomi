<?php
header('content-type:text/html;charset="utf-8"');
$responseData = array("code"=>0,"message"=>'');
$phone = $_POST['phoneNum'];
$pw = $_POST['password'];
//$maxbox = $_POST['maxBox'];
$str = md5(md5(md5($pw)."xxx")."yyy");
$conn = mysqli_connect('localhost','root','root','user');
$sql = "SELECT * FROM `users` WHERE `phonenumber` = '$phone' AND `password` = '$str'";
$row = mysqli_query($conn,$sql);
// 3.1 只能解析一行数据
// $row = mysqli_fetch_assoc($res);
// print_r($row);
if(!$phone){
    $responseData['code'] = 1;
    $responseData['message'] ='手机号不能为空';
    echo json_encode($responseData);
    exit;
}
if(!$pw){
    $responseData['code'] = 2;
    $responseData['message'] ='密码不能为空';
    echo json_encode($responseData);
    exit;
}
// 3.2 解析全部数据
//$data = mysqli_fetch_all($res,MYSQLI_ASSOC);
$res = mysqli_fetch_assoc($row);
if(!$res){
    //登录成功
    $responseData['code'] = 3; 
    $responseData['message'] = '登录失败,手机号或密码错误！'; 
    echo json_encode($responseData);
}else{
    $responseData['message'] = '登录成功';
    echo json_encode($responseData); 
}
mysqli_close($conn);

?>