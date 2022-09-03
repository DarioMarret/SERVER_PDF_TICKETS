

export const FormularioPreRegistro = async (req, reply) => {
    try {
        const { u_nombre, u_cedula, u_correo, u_fecha, u_banco, u_transaci, u_form, u_telefono } = req.body
        let query = `INSERT INTO usuarios (nombre, cedula, correo, fecha, telefono, banco, transacion, forma) 
        VALUES ('${u_nombre}', '${u_cedula}', '${u_correo}', '${u_fecha}', '${u_telefono}', '${u_banco}', '${u_transaci}', '${u_form}')`;
        await conexion.query(query)
        reply.send({
            success: true,
            message: "Datos guardados correctamente"
        })
    } catch (error) {
        reply.send({
            success: false,
            message: "Error al guardar datos"
        })
    }
}

