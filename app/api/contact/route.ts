import { NextRequest, NextResponse } from "next/server";
const nodemailer = require('nodemailer');

interface body {
    name: string;
    email: string;
    message: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json();
    const { name, email, message :msg} = body;

    const htmlOut = `
                    <p>You have a new contact request</p>
                    <h3>Contact details</h3>
                    <ul>
                    <li>Name   : ${name}</li>
                    <li>Email  : ${email}</li>
                    <li>Message: ${msg}</li>
                    </ul>`

    const message = {
        from: process.env.GMAIL_EMAIL_ADDRESS,
        to: process.env.GMAIL_EMAIL_ADDRESS,
        subject: 'Veleron: New message from ' + name,
        text: `Name: ${name} \nEmail: ${email} \nMessage: ${msg}`,
        html: htmlOut,
  };

  let transporter = nodemailer.createTransport({
    service: 'hotmail',
    // host: 'smtp.gmail.com',
    // port: 465,
    // secure: true,
    auth: {
      user: process.env.GMAIL_EMAIL_ADDRESS,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  try{
    await transporter.sendMail(message);
    return new Response(JSON.stringify({
        success: `Message delivered from ${email}`}), { status: 250 });
    } catch (error) {
        throw error
    }
       
}