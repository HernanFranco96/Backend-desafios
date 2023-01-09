const { createTransport } = require('nodemailer');

const TEST_MAIL = 'hernan.franco051096@gmail.com';
const TEST_PASSWORD = 'dcvdflxmrlacmerh';

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: TEST_PASSWORD
    }
});

const sendMail = async (user) => {
    try {
        const info = await transporter.sendMail(
            {
                from: 'Servidor de NodeJS',
                to: TEST_MAIL,
                subject: 'Nuevo Registro',
                html: `<ul>
                    <li>${user.username}</li>
                    <li>${user.name}</li>
                    <li>${user.address}</li>
                    <li>${user.age}</li>
                    <li>${user.phone}</li>
                    <li>${user.passwordHash}</li>
                    <li>${user.photo}</li>
                    <li>${user.idCart}</li>
                </ul>`,
            }
        );
        console.log(info);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { sendMail };