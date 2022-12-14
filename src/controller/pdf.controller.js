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

    const generadorQR = await GenerarPdfQR(req.body)
    if (generadorQR) {
        const link = `${process.env.DOMINIO}/tickets/${req.body.protocol}-${nano}.pdf`
        const qr = `${req.body.nombre}-${req.body.cedula}-${req.body.celular}-${req.body.protocol}-${req.body.actual}`
        await GuardarDatos(req.body.nombre, req.body.cedula, req.body.celular, req.body.protocol, req.body.actual, qr, link, req.body.nombreconcert, req.body.cuidadconcert, req.body)
        reply.send({
            success: true,
            url: link
        });
    } else {
        reply.send({
            success: false,
            url: ""
        });
    }
}

async function GenerarPdfQR(body) {
    return new Promise((resolve, reject) => {
        var nano = Number(new NanoDate(moment().format("YYYY-MM-DD HH:mm:ss")).getTime())
        let options = { format: 'A4' };
        let file = { url: `https://rec.netbot.ec/pdf/${base64encode(JSON.stringify(body))}` };
        html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
            fs.writeFileSync(path.join(__dirname, `../public/tickets/${body.protocol}-${nano}.pdf`), pdfBuffer);
            resolve(true)
        });
    })

}

async function GuardarDatos(nombre, cedula, celular, protocol, actual, qr, link, nombreconcert, cuidadconcert, body) {
    let query = `INSERT INTO generados_tickets (nombre, cedula, celular, protocol, actual, qr, link, nombreconcert, cuidadconcert,body) 
    VALUES ('${nombre}', '${cedula}', '${celular}', '${protocol}', '${actual}', '${qr}', '${link}', '${nombreconcert}', '${cuidadconcert}','${JSON.stringify(body)}')`;
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

export const listarRegistroTickets = async (req, reply) => {
    try {
        const { nombreconcert } = req.params
        if (nombreconcert.length === 0) {
            let query = `SELECT * FROM generados_tickets`;
            const data = await conexion.query(query)
            reply.send({
                success: true,
                data: data[0]
            })
        } else {
            let query = `SELECT * FROM generados_tickets WHERE nombreconcert = '${nombreconcert}'`;
            const data = await conexion.query(query)
            reply.send({
                success: true,
                data: data[0]
            })
        }
    } catch (error) {
        reply.send({
            success: false,
            message: "Error "+error
        })
    }
}

export const eliminarTicket = async (req, reply) => {
    try {
        const { id } = req.params
        let query = `DELETE FROM generados_tickets WHERE id = '${id}'`;
        await conexion.query(query)
        reply.send({
            success: true,
            message: "Eliminado"
        })
    } catch (error) {
        reply.send({
            success: false,
            message: "Error al eliminar"
        })
    }
}

export const editarTicket = async (req, reply) => {
    try {
        const { id } = req.params
        let query = `UPDATE generados_tickets SET nombre = '${req.body.nombre}', cedula = '${req.body.cedula}', celular = '${req.body.celular}', protocol = '${req.body.protocol}', actual = '${req.body.actual}', nombreconcert = '${req.body.nombreconcert}', cuidadconcert = '${req.body.cuidadconcert}' WHERE id = '${id}'`;
        await conexion.query(query)
        reply.send({
            success: true,
            message: "Editado"
        })
    } catch (error) {
        reply.send({
            success: false,
            message: "Error al editar"
        })
    }
}