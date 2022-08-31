import { base64encode, base64decode } from 'nodejs-base64'
import { conexion } from "../database/Conexion"
var html_to_pdf = require('html-pdf-node')
import NanoDate from "nano-date"
import moment from "moment"
import path from 'path'
import 'dotenv/config'
import fs from 'fs'
moment.locale("es")


export const GenaradorPdrQR = async (req, reply) => {
    var nano = Number(new NanoDate(moment().format("YYYY-MM-DD HH:mm:ss")).getTime())

    let options = { format: 'A4' };
    let file = { url: `https://rec.netbot.ec/pdf/${base64encode(JSON.stringify(req.body))}` };
    html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
        fs.writeFileSync(path.join(__dirname, `../public/tickets/${req.body.protocol}-${nano}.pdf`), pdfBuffer);
    });
    const link = `${process.env.DOMINIO}/tickets/${req.body.protocol}-${nano}.pdf`
    const qr = `${req.body.nombre}-${req.body.cedula}-${req.body.celular}-${req.body.protocol}-${req.body.actual}`
    await GuardarDatos(req.body.nombre, req.body.cedula, req.body.celular, req.body.protocol, req.body.actual, qr, link, req.body.nombreconcert)
    reply.send({
        success: true,
        url:link
    });
}

async function GuardarDatos(nombre, cedula, celular, protocol, actual, qr, link, nombreconcert){
    let query = `INSERT INTO generados_tickets (nombre, cedula, celular, protocol, actual, qr, link, nombreconcert) VALUES ('${nombre}', '${cedula}', '${celular}', '${protocol}', '${actual}', '${qr}', '${link}', '${nombreconcert}')`;
    await conexion.query(query)
}