const nodemailer = require("nodemailer");

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "nkofi639@gmail.com",
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: "Message sent successfully." });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ success: false, message: "Failed to send message." });
    }
}

