const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3500;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

//Envio de mail
const sendMail = (data) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'fcj199914@gmail.com', 
            pass: 'uyknjdfxlafdkynb',   
        }
    });

    const mailOptions = {
        from: 'fcj199914@gmail.com',        
        to: 'proyectos.fernando.cazares@gmail.com',     
        subject: 'Contacto pagina Cronos', 
        text: 'ola',
        html: `
            <p>Nombre: ${data.nombre}</p> <br>
            <p>Email: ${data.email}</p> <br>
            <p>Equipo o refaccion de interes: ${data.equipoORefaccion}</p> <br>
            <p>Comentarios: ${data.comentarios}</p> <br>
        `, 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error al enviar el correo:', error);
        }
        console.log('Correo enviado:', info.response);
    });
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

app.post('/sendData', (req, res) => {
    let data = req.body;
    sendMail(data);
    /* res.send({message: "Exito"}); */
});

app.listen(PORT, () => {
    console.log("puerto: ", PORT);
});


