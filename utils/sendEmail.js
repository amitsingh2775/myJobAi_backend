import nodemailer from "nodemailer"

export const SendEmail=async(to,subject,html)=>{
    const transporter=nodemailer.createTransport({
        service:"gmail",
        secure:false,
        tls:{
            rejectUnauthorized:false
        },
        auth:{
            user:process.env.EMAIL,
            pass:process.env.EMAIL_PASS
        }
    })
    await transporter.sendMail({
         from:`"MyJob AI" <${process.env.EMAIL}>`,
         to:to,
         subject:subject,
         html
    })
}