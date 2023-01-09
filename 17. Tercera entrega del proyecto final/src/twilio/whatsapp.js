const twilio = require('twilio');

const accountSid = 'AC593fefa8673f71867108d8ee65b62cff';
const authToken = '9ad5549bbee38f39fcb4b0d7baee2c16';

const cliente = twilio(accountSid, authToken);

const sendWhatsapp = async (user) => {
    try {
        const message = await cliente.messages.create({
            body: 'Buuuuueeeen dia, un usuario acaba de registrarse',
            from: 'whatsapp:+14155238886',
            to: `whatsapp:+541157610975`
        });
        console.log(message)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { sendWhatsapp };