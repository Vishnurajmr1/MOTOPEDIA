export const resetPassEmailTemplate = function (token: string) {
	const html = `
    <!DOCTYPE html>
    <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

    <head>
      <meta charset="utf-8">
      <meta name="x-apple-disable-message-reformatting">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
      <title>Reset your Password</title>
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700"
        rel="stylesheet" media="screen">
      <style>
        
      </style>
    </head>

    <body>
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Elevate</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing Elevate. To reset your password, please click on the following link. This link is valid for a limited time. For security reasons, we recommend that you reset your password promptly and do not share this link with anyone. If you did not request this password reset, please disregard this email
    </p>
    <a href="http://localhost:4200/auth/reset-password/${token}">
    click here to verify
    </a>
    <p style="font-size:0.9em;">Regards,<br />Elevate</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Elevate Inc</p>
      <p>Kochi Kerala</p>
      <p>India</p>
    </div>
  </div>
</div>
    </body>

    </html>`;
	const text = `
  Password Reset Initiated: A request has been made to reset your Elevate account password. Please follow the provided instructions to securely reset your password and regain access to your account`;
	return {
		html: html,
		text: text
	};
};