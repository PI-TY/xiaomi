<?php
header('content-type:text/html;charset="utf-8"');
//统一返回格式
$responseData = array("code"=>0,"message"=>"");
$phone = $_POST['phoneNum'];
$pw = $_POST['password'];
//$maxbox = $_POST['maxBox'];
//$nation = $_POST['nation'];
// $link = mysql_coonect('localhost','root','root');
// //2 判断是否连接成功
// if(!$link){
//     echo "连接失败";
//     $responseData["code"] = 3;
//     $responseData["message"] = "数据库连接失败";
//     echo json_encode($responseData);
//     exit;
// }
$conn = mysqli_connect('localhost','root','root','user');
$sql = "SELECT * FROM `users` WHERE `phonenumber` = '$phone'";
$res = mysqli_query($conn,$sql);
//取出一行数据
$row = mysqli_fetch_assoc($res);
if(!$phone){
    $responseData["code"] = 1;
    $responseData["message"] = "手机号不能为空";
    echo json_encode($responseData);
    exit;
}
if(!$pw){
    $responseData["code"] = 2;
    $responseData["message"] = "密码不能为空";
    echo json_encode($responseData);
    exit;
}
if($row){
    $responseData['code'] = 4;
    $responseData['message'] = '用户已存在';
    echo json_encode($responseData);
    exit;
}
    //md5加密
    $str = md5(md5(md5($pw)."xxx")."yyy");
    $sql1 = "INSERT INTO `users` (`phonenumber`,`password`) VALUES ('$phone','$str')";
    $result = mysqli_query($conn,$sql1);
    // $result = mysqli_query($sql1);
    // if(!$res){
    //     $responseData['code'] = 5;
    //     $responseData['message'] = '注册失败';
    //     echo json_encode($responseData);
    // }else{
    //     $responseData['message'] = '注册成功';
    //     echo json_encode($responseData);
    // }
    $responseData['message'] = '注册成功';
    
    echo json_encode($responseData);
    mysqli_close($conn);
    
?>