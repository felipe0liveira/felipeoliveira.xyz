import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
    errors.push({ field: 'name', message: 'Nome deve ter pelo menos 3 caracteres' });
  }

  // Validate phone
  const phoneRegex = /^[\d\s()+-]+$/;
  const cleanPhone = data.phone.replace(/\D/g, '');
  if (!data.phone || !phoneRegex.test(data.phone) || cleanPhone.length < 10) {
    errors.push({ field: 'phone', message: 'Telefone inválido' });
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push({ field: 'email', message: 'Email inválido' });
  }

  // Validate message
  if (!data.message || data.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Mensagem deve ter pelo menos 10 caracteres' });
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

    // Email options for thank you message
    const mailOptions = {
      from: gmailUser,
      to: data.email,
      subject: 'Obrigado pelo seu contato!',
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
              <h1>Obrigado pelo Contato!</h1>
            </div>
            <div class="content">
              <p>Olá, <strong>${data.name}</strong>!</p>
              
              <p>Recebi sua mensagem e agradeço muito por entrar em contato.</p>
              
              <p>Responderei o mais breve possível no email informado.</p>
              
              <p><strong>Resumo da sua mensagem:</strong></p>
              <p style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #8B7355; margin: 15px 0;">
                ${data.message}
              </p>
              
              <p><strong>Seus dados de contato:</strong></p>
              <ul>
                <li>Email: ${data.email}</li>
                <li>Telefone: ${data.phone}</li>
              </ul>
              
              <p>Até breve!</p>
              <p>Atenciosamente,<br>Felipe Oliveira</p>
            </div>
            <div class="footer">
              <p>Esta é uma mensagem automática. Por favor, não responda este email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Olá, ${data.name}!
        
        Recebi sua mensagem e agradeço muito por entrar em contato.
        
        Responderei o mais breve possível no email informado.
        
        Resumo da sua mensagem:
        ${data.message}
        
        Seus dados de contato:
        - Email: ${data.email}
        - Telefone: ${data.phone}
        
        Até breve!
        
        Atenciosamente,
        Felipe Oliveira
        
        ---
        Esta é uma mensagem automática. Por favor, não responda este email.
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
