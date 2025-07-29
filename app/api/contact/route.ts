import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, mobile, university, message } = await request.json();

    // Validate required fields
    if (!name || !email || !mobile || !university || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can change this to your preferred email service
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER, // Where you want to receive the emails
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333; margin-bottom: 20px; font-size: 22px;">Contact Details</h2>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #667eea; font-size: 16px;">Name:</strong>
              <p style="margin: 5px 0; font-size: 16px; color: #333;">${name}</p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #667eea; font-size: 16px;">Email:</strong>
              <p style="margin: 5px 0; font-size: 16px; color: #333;">
                <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
              </p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #667eea; font-size: 16px;">Mobile Number:</strong>
              <p style="margin: 5px 0; font-size: 16px; color: #333;">
                <a href="tel:${mobile}" style="color: #667eea; text-decoration: none;">${mobile}</a>
              </p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #667eea; font-size: 16px;">University/College:</strong>
              <p style="margin: 5px 0; font-size: 16px; color: #333;">${university}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #667eea; font-size: 16px;">Message/Concern:</strong>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 10px; border-left: 4px solid #667eea;">
                <p style="margin: 0; font-size: 16px; color: #333; line-height: 1.6;">${message}</p>
              </div>
            </div>
            
            <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                <strong>Submitted on:</strong> ${new Date().toLocaleString('en-IN', {
                  timeZone: 'Asia/Kolkata',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })} IST
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
            <p>This Email was sent from the Merge Learning Contact Form.</p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Contact Form Submitted Successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}