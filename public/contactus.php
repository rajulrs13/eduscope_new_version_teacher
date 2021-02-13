<?php
$data = $_POST;
$name = $data['name'];
$email = $data['email'];
$msg = $data['message'];
$contact = $data['contact'];
$to = 'lokeshdugarld@gmail.com, rajulsaxena13@gmail.com';
$subject = 'Message from '.$name;
$message = "New message from ".$name.",\n";
$message.= "reply email: ".$email."\n";
$message.= "reply contact: ".$contact."\n";
$message.= "message: ".$msg."\n";

$headers = "MIME-Version: 1.0" . "\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\n";
$headers .= 'From: Admin Eduscope <noreply@mujquiz.com>' . "\r\n";

if(mail($to, $subject, $message, $headers)){
  $json = array(
            'status' => 'true'
        );
    $jsonstring = json_encode($json);
    echo $jsonstring;
}
else{
  $json = array(
            'status' => 'false'
        );
    $jsonstring = json_encode($json);
    echo $jsonstring;
}
?>
