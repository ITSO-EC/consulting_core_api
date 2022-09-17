const { Client, LocalAuth, MessageMedia, Buttons, List } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const qr_class = require('qr-image')

const number = "0978759814";

const routeQR = `./src/files/${number}.svg`;
console.log(`Iniciando servicio de whataspp para ${number}`);

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.initialize();

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

const generateImage = (base64, cb = () => { }) => {
    let qr_svg = qr_class.image(base64, { type: 'svg', margin: 4 });
    qr_svg.pipe(require('fs').createWriteStream(routeQR));
    console.log(`⚡ Actualiza F5 el navegador para mantener el mejor QR⚡`);
    cb()
}
client.on('qr', (qr) => generateImage(qr, () => {
    qrcode.generate(qr, { small: true });
    console.log(`Ver QR http://localhost:3000/v1/ws/${number}`)
}))

client.on('authenticated', () => {
    console.log(`Logeado como ${number}`);
    fs.stat(routeQR, function (err, stats) {
        if (!err) {
        }
        fs.unlink(routeQR, function (err) {
        });
    });
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error(`AUTHENTICATION FAILURE con ${number}`, msg);
});

client.on('ready', async () => {
    // console.log(client, 'ready');
    console.log(`⚡⚡⚡ Conexión establecida con ${number}`);
});

client.on('message', async (message) => {

    console.log('MESSAGE', {
        from: message.from,
        text: message.body,
        name: message?._data?.notifyName || "Sin nombre",
    });
    if (message.body === '!ping') {
        message.reply('pong');
    }

});



const sendMessage = (to, message) => {
    const n = to + '@c.us';
    console.log(`Enviando mensaje a ${n}`);
    client.sendMessage(n, message);
}
// '593963688259'

module.exports = {
    sendMessage
}
