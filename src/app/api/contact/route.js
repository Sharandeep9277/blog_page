import nodemailer from 'nodemailer';

const rateLimitMap = new Map();


function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; 
  const maxRequests = 5;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  const limit = rateLimitMap.get(ip);
  
  if (now > limit.resetTime) {
    
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (limit.count >= maxRequests) {
    return true;
  }

  limit.count += 1;
  return false;
}


function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  
  const phoneRegex = /^[\d\-\+\(\)\s]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

export async function POST(request) {
  try {
    
    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';

    
    if (isRateLimited(clientIp)) {
      return Response.json(
        { 
          success: false, 
          message: 'Too many requests. Please try again later.',
          error: 'RATE_LIMITED'
        },
        { status: 429 }
      );
    }

    
    const body = await request.json();
    const { name, email, phone, message, privacyAccepted, honeypot } = body;

    
    if (honeypot) {
      return Response.json(
        { 
          success: false, 
          message: 'Invalid submission detected.',
          error: 'BOT_DETECTED'
        },
        { status: 400 }
      );
    }

    
    const errors = {};
    let hasErrors = false;

    if (!name || !sanitizeInput(name)) {
      errors.name = 'Name is required';
      hasErrors = true;
    } else if (sanitizeInput(name).length > 100) {
      errors.name = 'Name must be less than 100 characters';
      hasErrors = true;
    }

    if (!email || !sanitizeInput(email)) {
      errors.email = 'Email is required';
      hasErrors = true;
    } else if (!validateEmail(sanitizeInput(email))) {
      errors.email = 'Please enter a valid email address';
      hasErrors = true;
    }

    if (!phone || !sanitizeInput(phone)) {
      errors.phone = 'Phone number is required';
      hasErrors = true;
    } else if (!validatePhone(sanitizeInput(phone))) {
      errors.phone = 'Please enter a valid phone number';
      hasErrors = true;
    }

    if (!message || !sanitizeInput(message)) {
      errors.message = 'Message is required';
      hasErrors = true;
    } else if (sanitizeInput(message).length < 10) {
      errors.message = 'Message must be at least 10 characters';
      hasErrors = true;
    } else if (sanitizeInput(message).length > 2000) {
      errors.message = 'Message must be less than 2000 characters';
      hasErrors = true;
    }

    if (!privacyAccepted) {
      errors.privacy = 'Privacy policy acceptance is required';
      hasErrors = true;
    }

    if (hasErrors) {
      
      return Response.json(
        { 
          success: false, 
          message: 'Please correct the errors below',
          errors,
          error: 'VALIDATION_ERROR'
        },
        { status: 400 }
      );
    }

    
    const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'MAIL_FROM', 'MAIL_TO'];
    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
    
    if (missingEnvVars.length > 0) {
      console.error('Missing environment variables:', missingEnvVars);
      return Response.json(
        { 
          success: false, 
          message: 'Server configuration error. Please try again later.',
          error: 'SERVER_CONFIG_ERROR'
        },
        { status: 500 }
      );
    }

    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      
      pool: true,
      maxConnections: 1,
      rateDelta: 20000,
      rateLimit: 5,
    });

    
    await transporter.verify();

    
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPhone = sanitizeInput(phone);
    const sanitizedMessage = sanitizeInput(message);

    
    const emailSubject = `New Contact Form Submission from ${sanitizedName}`;
    const emailText = `
New contact form submission:

Name: ${sanitizedName}
Email: ${sanitizedEmail}
Phone: ${sanitizedPhone}

Message:
${sanitizedMessage}

Submitted at: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
IP Address: ${clientIp}
    `.trim();

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Contact Form Submission</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Contact Form Submission
        </h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e40af;">Contact Information</h3>
            <p><strong>Name:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${sanitizedPhone}">${sanitizedPhone}</a></p>
        </div>
        
        <div style="background-color: #fff; padding: 20px; border-left: 4px solid #2563eb; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e40af;">Message</h3>
            <p style="white-space: pre-line;">${sanitizedMessage}</p>
        </div>
        
        <div style="font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 15px; margin-top: 30px;">
            <p><strong>Submitted:</strong> ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}</p>
            <p><strong>IP Address:</strong> ${clientIp}</p>
        </div>
    </div>
</body>
</html>
    `;

    
    const mailOptions = {
      from: `"Contact Form" <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_TO,
      replyTo: sanitizedEmail,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    
    const autoReplyOptions = {
      from: `"Your Company" <${process.env.MAIL_FROM}>`,
      to: sanitizedEmail,
      subject: 'お問い合わせを受け付けました / Contact Form Confirmation',
      text: `
${sanitizedName}様

お問い合わせをいただき、ありがとうございます。
以下の内容で受け付けいたしました。

お名前: ${sanitizedName}
メールアドレス: ${sanitizedEmail}
電話番号: ${sanitizedPhone}

お問い合わせ内容:
${sanitizedMessage}

担当者より後日ご連絡いたします。
お急ぎの場合は、直接お電話にてお問い合わせください。

---

Dear ${sanitizedName},

Thank you for contacting us. We have received your inquiry with the following details:

Name: ${sanitizedName}
Email: ${sanitizedEmail}
Phone: ${sanitizedPhone}

Message:
${sanitizedMessage}

Our team will get back to you soon.

Best regards,
Your Company Team
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Contact Form Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">お問い合わせありがとうございます</h2>
        
        <p>${sanitizedName}様</p>
        
        <p>お問い合わせをいただき、ありがとうございます。<br>
        以下の内容で受け付けいたしました。</p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>お名前:</strong> ${sanitizedName}</p>
            <p><strong>メールアドレス:</strong> ${sanitizedEmail}</p>
            <p><strong>電話番号:</strong> ${sanitizedPhone}</p>
            <div style="margin-top: 15px;">
                <strong>お問い合わせ内容:</strong>
                <p style="white-space: pre-line; margin-top: 10px;">${sanitizedMessage}</p>
            </div>
        </div>
        
        <p>担当者より後日ご連絡いたします。<br>
        お急ぎの場合は、直接お電話にてお問い合わせください。</p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <div style="font-size: 12px; color: #6b7280;">
            <p>This is an automated response. Please do not reply to this email.</p>
        </div>
    </div>
</body>
</html>
      `
    };

    
    try {
      await transporter.sendMail(autoReplyOptions);
    } catch (autoReplyError) {
      console.error('Auto-reply failed:', autoReplyError);
      
    }

    return Response.json({
      success: true,
      message: 'お問い合わせが送信されました。ありがとうございます。'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    
    if (error.code === 'EAUTH') {
      return Response.json(
        { 
          success: false, 
          message: 'Email service authentication failed. Please try again later.',
          error: 'EMAIL_AUTH_ERROR'
        },
        { status: 500 }
      );
    }
    
    if (error.code === 'ECONNECTION') {
      return Response.json(
        { 
          success: false, 
          message: 'Unable to connect to email service. Please try again later.',
          error: 'EMAIL_CONNECTION_ERROR'
        },
        { status: 500 }
      );
    }

    return Response.json(
      { 
        success: false, 
        message: 'An unexpected error occurred. Please try again later.',
        error: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}