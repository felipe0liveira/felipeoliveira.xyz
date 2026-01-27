import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { formatPhoneNumber } from '@/utils/phoneFormatter';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface ValidationError {
  field: string;
  message: string;
}

function validateFormData(data: ContactFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate name
  if (!data.name || data.name.trim().length < 3) {
    errors.push({ field: 'name', message: 'Name must be at least 3 characters' });
  }

  // Validate phone
  const cleanPhone = data.phone.replace(/\D/g, '');
  if (!data.phone || !data.phone.startsWith('+') || cleanPhone.length < 10) {
    errors.push({ field: 'phone', message: 'Invalid phone number' });
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push({ field: 'email', message: 'Invalid email' });
  }

  // Validate message
  if (!data.message || data.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
  }

  return errors;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate form data
    const validationErrors = validateFormData(data);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', errors: validationErrors },
        { status: 400 }
      );
    }

    // Get environment variables
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_PASSWORD;

    if (!gmailUser || !gmailPassword) {
      console.error('Missing GMAIL_USER or GMAIL_PASSWORD environment variables');
      return NextResponse.json(
        { error: 'Email configuration error' },
        { status: 500 }
      );
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
    });

    // Create no-reply email address
    const noreplyEmail = gmailUser.replace('@', '+noreply@');

    // Email options for thank you message
    const mailOptions = {
      from: `"Felipe Oliveira (No Reply)" <${noreplyEmail}>`,
      to: data.email,
      bcc: gmailUser,
      subject: 'Thank you for contacting me!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .header {
              background-color: #8B7355;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 0 0 8px 8px;
            }
            .footer {
              margin-top: 20px;
              text-align: center;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Contacting Me!</h1>
            </div>
            <div class="content">
              <p>Hello, <strong>${data.name}</strong>!</p>
              
              <p>I received your message and I really appreciate you reaching out.</p>
              
              <p>I'll respond as soon as possible to the email you provided.</p>
              
              <p><strong>Summary of your message:</strong></p>
              <p style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #8B7355; margin: 15px 0;">
                ${data.message}
              </p>
              
              <p><strong>Your contact information:</strong></p>
              <ul>
                <li>Email: ${data.email}</li>
                <li>Phone: ${formatPhoneNumber(data.phone)}</li>
              </ul>
              
              <p>Talk soon!</p>
              <p>Best regards,<br>Felipe Oliveira</p>
            </div>
            <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Hello, ${data.name}!
        
        I received your message and I really appreciate you reaching out.
        
        I'll respond as soon as possible to the email you provided.
        
        Summary of your message:
        ${data.message}
        
        Your contact information:
        - Email: ${data.email}
        - Phone: ${formatPhoneNumber(data.phone)}
        
        Talk soon!
        
        Best regards,
        Felipe Oliveira
        
        ---
        This is an automated message. Please do not reply to this email.
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
}
