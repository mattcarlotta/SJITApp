export default (CLIENT, firstName, lastName, token) =>
  `<h2 style="margin-bottom: 30px; color: #006d75;">
    Forgot your password, ${firstName} ${lastName}?
  </h2>
  <p style="font-size: 16px; margin-bottom: 30px; color: #000000;">
    Please click the button below to set up a new password.
  </p>
  <p style="font-size: 16px; margin-bottom: 30px; color: #000000;">
    If you did not initiate this request, please contact us immediately at <a href="mailto:carlotta.matt@gmail.com" target="_blank" rel="noopener noreferrer">carlotta.matt@gmail.com</a>
  </p>
  <p style="font-size: 16px; margin-bottom: 30px; color: #000000;">
    Thank you,
    <br />
    <span style="font-style: italic;">The San Jose Sharks Ice Team</span>
  </p>
  <div style="margin-bottom: 20px; text-align: center">
    <a style="font-size: 18px; text-decoration: none; line-height: 40px; width: 200px; color: #FFFFFF; background-color: #006d75; display: inline-block;" href="${CLIENT}/employee/newpassword/verify?token=${token}" target="_blank" rel="noopener noreferrer">Create New Password</a>
  </div>
  <div style="color:#999999;font-size:11px;text-align:center;margin-top: 10px;">
    Or click on this link:
    <a style="color: #999999; text-decoration: underline; margin-left: 2px;" href="${CLIENT}/employee/newpassword/verify?token=${token}" target="_blank" rel="noopener noreferrer">${CLIENT}/employee/newpassword/verify?token=${token}</a>
  </div>`;
