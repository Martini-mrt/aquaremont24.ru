<?php
// echo '23223';
// require_once  $_SERVER["DOCUMENT_ROOT"]."/wp-load.php";

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$title = "aquaremont24.ru";

$c = true;

date_default_timezone_set('Europe/Moscow');
$date = date("Y-m-d H:i:s");
// Формирование самого письма
 $body .= "<h2>Заявка с сайта</h2>"; 
 $body .= "<p>$date</p>";
 
foreach ( $_POST as $key => $value ) {
  if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
    $body .= "
    " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
      <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
      <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
    </tr>
    ";
  }
}



$body = "<table style='width: 100%;'>$body</table>";


// echo $body;

// echo "<pre>";
// print_r($body);
// echo "</pre>";


// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
  $mail->isSMTP();
  $mail->CharSet = "UTF-8";
  $mail->SMTPAuth   = true;

  // Настройки вашей почты
  $mail->Host       = 'smtp.yandex.ru'; // SMTP сервера вашей почты
  $mail->Username   = 'aquaremont24@yandex.ru'; // Логин на почте
  $mail->Password   = 'rkdvmczqvlakbloa'; // Пароль на почте
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;
   
  $mail->setFrom('aquaremont24@yandex.ru', 'Заявка с aquaremont24.ru'); // Адрес самой почты и имя отправителя

  // Получатель письма
  $mail->addAddress('martinidance@mail.ru');



  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail->send();

} catch (Exception $e) {
  $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}



// TELEGRAM

$bot_token = "6576945162:AAFErFWwasYU5iqr5MsnBsXfwC2iYtWBlYg";
$chat_id = "-1001931823867";

$text = "<b>" . "\xE2\x9D\x87 Новая заявка с сайта" . "\xE2\x80\xBC </b>" . "%0A";  
$text .= "<i>\xE2\x8F\xB0 $date</i>". "%0A";



foreach ( $_POST as $key => $value ) {
 
 switch ($key) {
     case 'name':   
         $text .= "\xF0\x9F\x91\x94 Имя: " . $value . "%0A";
         break;
     case 'phone':
     case 'phone-site':
         $text .= "\xE2\x98\x8E Позвонить: " . $value . "%0A";
         break;
          case 'email':
         $text .= "\xF0\x9F\x93\xA7 Email: " . $value . "%0A";
         break;
     case 'message':
         $text .= "\xF0\x9F\x92\xAC Сообщение: " . $value . "%0A";
         break;
    
 }
 
}

fopen("https://api.telegram.org/bot{$bot_token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$text}&disable_web_page_preview=true","r");



