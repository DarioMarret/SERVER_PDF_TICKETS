import { base64encode, base64decode } from 'nodejs-base64'
import { conexion } from "../database/Conexion"
var html_to_pdf = require('html-pdf-node')
import NanoDate from "nano-date"
import moment from "moment"
import path from 'path'
import 'dotenv/config'
import fs from 'fs'
import axios from 'axios'
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
    await GuardarDatos(req.body.nombre, req.body.cedula, req.body.celular, req.body.protocol, req.body.actual, qr, link, req.body.nombreconcert, req.body.cuidadconcert)
    reply.send({
        success: true,
        url:link
    });
}

async function GuardarDatos(nombre, cedula, celular, protocol, actual, qr, link, nombreconcert, cuidadconcert) {
    let query = `INSERT INTO generados_tickets (nombre, cedula, celular, protocol, actual, qr, link, nombreconcert, cuidadconcert) 
    VALUES ('${nombre}', '${cedula}', '${celular}', '${protocol}', '${actual}', '${qr}', '${link}', '${nombreconcert}', '${cuidadconcert}')`;
    await conexion.query(query)
}

export const consultarCedula = async (req, reply) => {
    try {
        const { data } = await axios.get(`https://turnos.manta.gob.ec/consultacedula/${req.params.cedula}`)
        reply.send(data)
    } catch (error) {
        reply.send({
            success: false,
            message: "Error al consultar cedula"
        })        
    }
}