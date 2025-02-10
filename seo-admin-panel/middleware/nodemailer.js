const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'amitdervadiya@gmail.com',
        pass: 'khcupljjyiqqppns'
    }
})

module.exports.sendOTP = (to, otp) => {
    const mailOption = {
        from: 'amitdervadiya@gmail.com',
        to: to,
        subject: 'password reset otp',
        text: `hi, your password reset otp is ${otp}`
    }
    transporter.sendMail(mailOption, (err) => err ? console.log(err) : console.log('send otp successfully...'))
}