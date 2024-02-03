import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: 'email-smtp.us-east-2.amazonaws.com',
    port: 587,
    secure: false,
    auth: {
        user: "AKIAZWUK5NHHDOHBATEU",
        pass: "BC8S498huXhjf9SyEDCl5m4Jgd6TFwWRKuVjB2GDlwdZ"
    }
});

interface IMailBody {
    subject: string;
    content: string;
    html: string;
}

class Mail {
    public body: IMailBody;

    constructor(body: IMailBody) {
        this.body = body;
    }

    sendTo(destinatary: string) {
        return transporter.sendMail({
            from: 'rafaelrsi108@gmail.com',
            to: destinatary,
            subject: this.body.subject,
            text: this.body.content,
            html: this.body.html
        })
    }
}

export default Mail;