<?php
$data = $_POST;
$to = $data['email'];
$link = $data['link'];
$duration = $data['duration'];
$password = $data['password'];
$quizname = $data['quizname'];
$classname = $data['classname'];
$open = 'open sans';
$heaven = 'helvetica neue';
$subject=$quizname." "."details for ".$classname;
$message='
<html style="width:100%;font-family:'.$open.', '.$heaven.', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;">
 <head> 
  <meta charset="UTF-8"> 
  <meta content="width=device-width, initial-scale=1" name="viewport"> 
  <meta name="x-apple-disable-message-reformatting"> 
  <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
  <meta content="telephone=no" name="format-detection"> 
  <title>Edu</title> 
  
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i" rel="stylesheet"> 
  <!--<![endif]--> 
  <style type="text/css">
@media only screen and (max-width:600px) {p, ul li, ol li, a { font-size:16px!important; line-height:150%!important } h1 { font-size:32px!important; text-align:center; line-height:120%!important } h2 { font-size:26px!important; text-align:center; line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } h1 a { font-size:32px!important } h2 a { font-size:26px!important } h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button { font-size:16px!important; display:inline-block!important; border-width:15px 30px 15px 30px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } .es-desk-menu-hidden { display:table-cell!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
#outlook a {
	padding:0;
}
.ExternalClass {
	width:100%;
}
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
	line-height:100%;
}
.es-button {
	mso-style-priority:100!important;
	text-decoration:none!important;
}
a[x-apple-data-detectors] {
	color:inherit!important;
	text-decoration:none!important;
	font-size:inherit!important;
	font-family:inherit!important;
	font-weight:inherit!important;
	line-height:inherit!important;
}
.es-desk-hidden {
	display:none;
	float:left;
	overflow:hidden;
	width:0;
	max-height:0;
	line-height:0;
	mso-hide:all;
}
</style> 
 </head> 
 <body style="width:100%;font-family:'.$open.', '.$heaven.', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;"> 
  <div class="es-wrapper-color" style="background-color:#EFEFEF;"> 
   <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#efefef"></v:fill>
			</v:background>
		<![endif]--> 
   <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;"> 
     <tr style="border-collapse:collapse;"> 
      <td valign="top" style="padding:0;Margin:0;"> 
       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"> 
         <tr style="border-collapse:collapse;"> 
         </tr> 
         <tr style="border-collapse:collapse;"> 
          <td align="center" style="padding:0;Margin:0;"> 
           <table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#044767;" width="900" cellspacing="0" cellpadding="0" bgcolor="#044767" align="center"> 
             <tr style="border-collapse:collapse;"> 
              <td align="left" bgcolor="#6fa8dc" style="Margin:0;padding-top:35px;padding-bottom:35px;padding-left:35px;padding-right:35px;background-color:#6FA8DC;"> 
               <table cellspacing="0" cellpadding="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                 <tr style="border-collapse:collapse;"> 
                  <td class="es-m-p0r" width="830" valign="top" align="center" style="padding:0;Margin:0;"> 
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                     <tr style="border-collapse:collapse;"> 
                      <td class="es-m-txt-c" align="left" style="padding:0;Margin:0;"> <h1 style="Margin:0;line-height:36px;mso-line-height-rule:exactly;font-family:'.$open.', '.$heaven.', helvetica, arial, sans-serif;font-size:36px;font-style:normal;font-weight:bold;color:#FFFFFF;">Eduscope</h1> </td> 
                     </tr> 
                   </table> </td> 
                 </tr> 
               </table> </td> 
             </tr> 
           </table> </td> 
         </tr> 
       </table> 
       <table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top;"> 
         <tr style="border-collapse:collapse;"> 
          <td align="center" bgcolor="transparent" style="padding:0;Margin:0;background-color:transparent;"> 
           <table class="es-header-body" width="900" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;"> 
             <tr style="border-collapse:collapse;"> 
              <td style="Margin:0;padding-bottom:35px;padding-left:35px;padding-right:35px;padding-top:40px;background-color:#F7F7F7;" bgcolor="#f7f7f7" align="left"> 
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                 <tr style="border-collapse:collapse;"> 
                  <td width="830" valign="top" align="center" style="padding:0;Margin:0;"> 
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                     <tr style="border-collapse:collapse;"> 
                      <td align="center" style="Margin:0;padding-top:20px;padding-bottom:25px;padding-left:35px;padding-right:35px;"> <a style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'.$open.', '.$heaven.', helvetica, arial, sans-serif;font-size:14px;text-decoration:none;color:#FFFFFF;"> <img src="https://penal.stripocdn.email/content/guids/ecded6b9-c6cf-4c42-a589-dc71f0215f3d/images/5071549896433696.png" alt="img" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" title="ship" width="150"> </a> </td> 
                     </tr> 
                     <tr style="border-collapse:collapse;"> 
                      <td align="center" style="padding:0;Margin:0;padding-bottom:15px;"> <h2 style="Margin:0;line-height:36px;mso-line-height-rule:exactly;font-family:'.$open.', '.$heaven.', helvetica, arial, sans-serif;font-size:30px;font-style:normal;font-weight:bold;color:#333333;">Your Quiz details are here!</h2></td> 
                     </tr> 
                     <tr style="border-collapse:collapse;"> 
                      <td class="es-m-txt-l" align="left" style="padding:0;Margin:0;padding-top:20px;"> <h3 style="Margin:0;line-height:22px;mso-line-height-rule:exactly;font-family:'.$open.', '.$heaven.', helvetica, arial, sans-serif;font-size:18px;font-style:normal;font-weight:bold;color:#333333;">Hello ,</h3><h3 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:'.$open.', '.$heaven.', helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333;"><br></h3><h3 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:'.$open.', '.$heaven.', helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333;">Please find below the details of your quiz .<br></h3><h3 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:'.$open.', '.$heaven.', helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333;">To start the quiz,open the link or click on Take me to my Quiz button.</h3> </td> 
                     </tr> 
                   </table> </td> 
                 </tr> 
               </table> </td> 
             </tr> 
             <tr style="border-collapse:collapse;"> 
              <td align="left" bgcolor="#ffffff" style="Margin:0;padding-left:35px;padding-right:35px;padding-top:40px;padding-bottom:40px;background-color:#FFFFFF;"> 
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                 <tr style="border-collapse:collapse;"> 
                  <td width="830" valign="top" align="center" style="padding:0;Margin:0;"> 
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                     <tr style="border-collapse:collapse;"> 
                      <td align="center" style="padding:0;Margin:0;padding-top:20px;"> 
                       <ul> 
                        <li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'.$open.', '.$heaven.', helvetica, arial, sans-serif;line-height:21px;Margin-bottom:15px;color:#FFFFFF;"><h3 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:'.$open.', '.$heaven.', helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333;text-align:left;">Quiz name : '.$quizname.'</h3></li> 
                        <li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'.$open.', '.$heaven.', helvetica, arial, sans-serif;line-height:21px;Margin-bottom:15px;color:#FFFFFF;"><h3 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:'.$open.', '.$heaven.', helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333;text-align:left;">Duration : '.$duration.'&nbsp; min</h3></li> 
                        <li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'.$open.', '.$heaven.', helvetica, arial, sans-serif;line-height:21px;Margin-bottom:15px;color:#FFFFFF;"><h3 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:'.$open.', '.$heaven.', helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333;text-align:left;">Link :&nbsp;'.$link.'</h3></li> 
                        <li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'.$open.', '.$heaven.', helvetica, arial, sans-serif;line-height:21px;Margin-bottom:15px;color:#FFFFFF;"><h3 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:'.$open.', '.$heaven.', helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333;text-align:left;">Password :&nbsp;'.$password.'</h3></li> 
                       </ul> </td> 
                     </tr> 
                     <tr style="border-collapse:collapse;"> 
                      <td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-bottom:15px;padding-top:20px;"> <span class="es-button-border" style="border-style:solid;border-color:transparent;background:#ED8E20;border-width:6px;display:inline-block;border-radius:100px;width:auto;"> <a href="'.$link.'" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'.$open.', '.$heaven.', helvetica, arial, sans-serif;font-size:22px;color:#FFFFFF;border-style:solid;border-color:#ED8E20;border-width:15px 30px;display:inline-block;background:none 0% 0% repeat scroll #ED8E20;border-radius:100px;font-weight:normal;font-style:normal;line-height:26px;width:auto;text-align:center;">Take me to my quiz </a> </span> </td> 
                     </tr> 
                   </table> </td> 
                 </tr> 
               </table> </td> 
             </tr> 
           </table> </td> 
         </tr> 
       </table> 
       <table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top;"> 
         <tr style="border-collapse:collapse;"> 
          <td align="center" style="padding:0;Margin:0;"> 
           <table class="es-footer-body" width="900" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;"> 
             <tr style="border-collapse:collapse;"> 
              <td align="left" bgcolor="#f7f7f7" style="Margin:0;padding-top:35px;padding-left:35px;padding-right:35px;padding-bottom:40px;background-color:#F7F7F7;"> 
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                 <tr style="border-collapse:collapse;"> 
                  <td width="830" valign="top" align="center" style="padding:0;Margin:0;"> 
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"> 
                     <tr style="border-collapse:collapse;"> 
                      <td align="center" style="padding:0;Margin:0;padding-bottom:15px;"> <img src="https://penal.stripocdn.email/content/guids/ecded6b9-c6cf-4c42-a589-dc71f0215f3d/images/35861549896703237.png" alt="Beretun logo" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" title="Beretun logo" width="37"></td> 
                     </tr> 
                     <tr style="border-collapse:collapse;"> 
                      <td align="center" style="padding:0;Margin:0;padding-bottom:35px;"> <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:'.$open.', '.$heaven.', helvetica, arial, sans-serif;line-height:24px;color:#333333;"><strong>© Eduscope 2018</strong></p> </td> 
                     </tr> 
                   </table> </td> 
                 </tr> 
               </table> </td> 
             </tr> 
           </table> </td> 
         </tr> 
       </table> </td> 
     </tr> 
   </table> 
  </div>  
 </body>
</html>';
$headers = "MIME-Version: 1.0" . "\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\n";
$headers .= 'From: Admin Eduscope <noreply@mujquiz.com>' . "\r\n";
$headers .= 'Bcc: lokeshdugarld@gmail.com, rajulsaxena13@gmail.com' . "\r\n";

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