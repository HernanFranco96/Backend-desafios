const twilio = require(`twilio`);
require('dotenv').config();

const ACCOUNT_SID = process.env.TWILIO_SID;
const AUTH_TOKEN = process.env.TWILIO_TOKEN;

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

const sendWhatsApp = async (body, from, to) => {
    try {
        const message = await client.messages.create({
            body: body,
            from: from,
            to:
            `whatsapp:+541157610975`
        })
        console.log(message);

    } catch (e) {
        console.error(e.message);
    }}



module.exports = sendWhatsApp;