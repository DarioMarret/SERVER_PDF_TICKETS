import { base64encode, base64decode } from 'nodejs-base64'
import { conexion } from "../database/Conexion"
var html_to_pdf = require('html-pdf-node')
import 'dotenv/config'
import fs from 'fs'


export const GenaradorPdrQR = async (req, reply) => {

    let options = { format: 'A4' };
    let file = { url: `http://localhost:3000?${base64encode(JSON.stringify(req.body))}` };
    html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
        fs.writeFileSync(`../public/tickets/${req.body.protocol}.pdf`, pdfBuffer);
    });
    const link = `${process.env.DOMINIO}/tickets/${req.body.protocol}.pdf`
    const qr = `${req.body.nombre}-${req.body.cedula}-${req.body.celular}-${req.body.protocol}-${req.body.actual}`
    await GuardarDatos(req.body.nombre, req.body.cedula, req.body.celular, req.body.protocol, req.body.actual, qr, link)
    reply.send({
        success: true,
        url:link
    });
}

async function GuardarDatos(nombre, cedula, celular, protocol, actual, qr, link){
    let query = `INSERT INTO generados_tickets (nombre, cedula, celular, protocol, actual, qr, link) VALUES ('${nombre}', '${cedula}', '${celular}', '${protocol}', '${actual}', '${qr}', '${link}')`;
    await conexion.query(query)
}