import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const getEmailTemplate = (otp: string, isResend: boolean, purpose: 'signup' | 'reset-password' | 'login') => {
  let title = 'Verification Code';
  let subText = '';

  if (purpose === 'signup') {
    title = isResend ? 'New Signup Verification Code' : 'Signup Verification Code';
    subText = isResend ? 'Here is your new signup code.' : 'Welcome! You requested a secure signup verification.';
  } else if (purpose === 'reset-password') {
    title = isResend ? 'New Password Reset Code' : 'Password Reset Code';
    subText = isResend ? 'Here is your new password reset code.' : 'You requested to reset your password.';
  } else if (purpose === 'login') {
    title = isResend ? 'New Login Verification Code' : 'Login Verification Code';
    subText = isResend ? 'Here is your new login code.' : 'You requested a secure login verification.';
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Bowling Planet</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #ffffff; color: #333333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .brand { font-size: 24px; font-weight: bold; color: #111827; margin-bottom: 30px; letter-spacing: -0.5px; }
        .brand span { color: #5FC1D1; }
        .title { font-size: 20px; font-weight: 600; color: #111827; margin-bottom: 12px; }
        .text { font-size: 15px; line-height: 1.5; color: #4B5563; margin-bottom: 24px; }
        .otp-box { background-color: #f0fdfa; border-left: 4px solid #5FC1D1; padding: 20px; margin-bottom: 24px; border-radius: 0 8px 8px 0; }
        .otp-code { font-size: 32px; font-weight: bold; color: #0d9488; letter-spacing: 4px; margin: 0; }
        .footer { font-size: 12px; color: #9CA3AF; border-top: 1px solid #E5E7EB; padding-top: 20px; margin-top: 40px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="brand">Bowling<span>Planet</span></div>
        <div class="title">${title}</div>
        <div class="text">${subText}</div>
        
        <div class="otp-box">
          <p class="otp-code">${otp}</p>
        </div>
        
        <div class="text">
          This secure code is valid for <strong>5 minutes</strong>.<br>
          Please do not share it with anyone.
        </div>
        
        <div class="footer">
          <p>If you didn't request this code, please ignore this email or contact support.</p>
          <p>&copy; ${new Date().getFullYear()} Bowling Planet. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const sendOtpEmail = async (email: string, otp: string, purpose: 'signup' | 'reset-password' | 'login', isResend: boolean = false) => {
  try {
    const mailOptions = {
      from: {
        name: 'Bowling Planet',
        address: process.env.MAIL_USER as string
      },
      to: email,
      subject: purpose === 'signup' ? 'Signup Verification Code' : purpose === 'login' ? 'Login Verification Code' : 'Password Reset Code',
      html: getEmailTemplate(otp, isResend, purpose),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};

export const sendLeadNotification = async (leadData: any) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SUPERADMIN_EMAIL;
    const user = process.env.MAIL_USER || process.env.SMTP_USER;

    if (!adminEmail || !user) {
      console.warn('[EmailService] SMTP credentials or ADMIN_EMAIL not configured, skipping email notification.');
      return;
    }

    const { name, phone, email, city, businessDetails, enquiryItems, utm } = leadData;

    let enquiryDetails = '';
    if (enquiryItems && enquiryItems.length > 0) {
      enquiryDetails = `
      <h3>Enquiry Interests:</h3>
      <ul>
        ${enquiryItems.map((item: any) => `<li>${item.title}</li>`).join('')}
      </ul>`;
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #0d9488;">New Lead Received!</h2>
        <p>A new lead has just submitted their details.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr style="background: #f0fdfa;">
            <td style="padding: 10px; border: 1px solid #E5E7EB; font-weight: bold; width: 30%;">Name</td>
            <td style="padding: 10px; border: 1px solid #E5E7EB;">${name || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #E5E7EB; font-weight: bold;">Phone</td>
            <td style="padding: 10px; border: 1px solid #E5E7EB;">${phone || 'N/A'}</td>
          </tr>
          <tr style="background: #f0fdfa;">
            <td style="padding: 10px; border: 1px solid #E5E7EB; font-weight: bold;">Email</td>
            <td style="padding: 10px; border: 1px solid #E5E7EB;">${email || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #E5E7EB; font-weight: bold;">City</td>
            <td style="padding: 10px; border: 1px solid #E5E7EB;">${city || 'N/A'}</td>
          </tr>
          ${businessDetails ? `
          <tr style="background: #f0fdfa;">
            <td style="padding: 10px; border: 1px solid #E5E7EB; font-weight: bold;">Business Details</td>
            <td style="padding: 10px; border: 1px solid #E5E7EB;">${businessDetails}</td>
          </tr>
          ` : ''}
        </table>

        ${enquiryDetails}

        <p style="margin-top: 30px; font-size: 12px; color: #9CA3AF;">
          Source: ${utm?.source || 'Direct/Organic'} | Medium: ${utm?.medium || 'N/A'} <br/>
          <em>You can view the full lead details in the Admin Dashboard CRM.</em>
        </p>
      </div>
    `;

    const mailOptions = {
      from: {
        name: 'Bowling Planet Admin',
        address: user as string
      },
      to: adminEmail,
      subject: `🚨 New Lead: ${name || 'Someone'} (${city || 'Unknown Location'})`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`[EmailService] Admin notification sent successfully to ${adminEmail}`);
  } catch (error) {
    console.error('[EmailService] Failed to send admin email notification:', error);
  }
};
