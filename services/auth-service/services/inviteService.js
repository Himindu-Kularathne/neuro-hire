/*
Copyright (c) 2025 Neuro Hire

Licensed under the MIT License.
See LICENSE file in the project root for full license information.
*/

const db = require("../db/mysql");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const sendInvite = async (req, res) => {
  try {
    const { userName, email, role } = req.body;

    if (!email || !role || !userName) {
      return res.status(400).json({
        message: "Email, Role, and User Name are required",
      });
    }

    // Generate a random password
    const generateRandomPassword = (length = 12) => {
      const chars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
      let password = "";
      for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return password;
    };

    const password = generateRandomPassword();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into DB
    const [result] = await db.execute(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [userName, email, hashedPassword, role]
    );

    // Configure nodemailer transporter (use your SMTP details here)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Use real SMTP host here
      port: 465,
      secure: true,
      auth: {
        user: "himindu.21@cse.mrt.ac.lk",
        pass: "gexf emei oyqs ewnr",
      },
      tls: {
        rejectUnauthorized: false, // optional, for some servers
      },
    });

    // Compose email
    const mailOptions = {
      from: '"Your App" <no-reply@yourapp.com>',
      to: email,
      subject: "You're invited to join our platform",
      html: `
        <p>Hello ${userName},</p>
        <p>You have been invited to join our platform with the role of <b>${role}</b>.</p>
        <p>Your temporary password is: <b>${password}</b></p>
        <p>Please log in and change your password as soon as possible.</p>
        <p>Best regards,<br/>The Team</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      message: "Invitation sent successfully",
      userId: result.insertId,
    });
  } catch (err) {
    console.error("Error sending invite:", err);
    return res.status(500).json({
      message: "Failed to send invite",
      error: err.message,
    });
  }
};

module.exports = {
  sendInvite,
};
