import { conexion } from "../database/Conexion";
import jwt from "jsonwebtoken";
import moment from "moment";
import { comparePassword, hashPassword } from "../function/bcrypt";

moment.locale("es");

export const GuardarUsuario = async (req, reply) => {
    try {
        const { username, password, perfil } = req.body;
        const hash = await hashPassword(password);
        let fechaCracion = moment().format("YYYY-MM-DD HH:mm:ss");
        const usuario = await conexion.query(
            `INSERT INTO admin (username, password, perfil, fecha_creacio) VALUES (?, ?, ?, ?)`,
            [username, hash, perfil, fechaCracion]
        );
        if (!usuario) {
            return reply.code(200).send({
                success: false,
                message: "Error al guardar el usuario",
            });
        } else {
            return reply.code(200).send({
                success: true,
                message: "Usuario guardado correctamente",
            });
        }
    } catch (error) {
        throw new Error("GuardarUsuario-->  " + error);
    }
}
export const ObtenerUsuarios = async (req, reply) => {
    try {
        const usuarios = await conexion.query(`SELECT * FROM admin`);
        if (!usuarios) {
            return reply.code(200).send({
                success: false,
                message: "Error al obtener los usuarios",
            });
        } else {
            return reply.code(200).send({
                success: true,
                message: "Usuarios obtenidos correctamente",
                usuarios: usuarios[0],
            });
        }
    } catch (error) {
        throw new Error("ObtenerUsuarios-->  " + error);
    }
}

export const ActualizarUsuario = async (req, reply) => {
    try {
        const { id, username, new_password, perfil } = req.body;
        if(new_password != ""){
            const hash = await hashPassword(new_password);
            const usuario = await conexion.query(
                `UPDATE admin SET username = ?, password = ?, perfil = ? WHERE id = ?`,
                [username, hash, perfil, id]
            );
            if (!usuario) {
                return reply.code(200).send({
                    success: false,
                    message: "Error al actualizar el usuario",
                });
            } else {
                return reply.code(200).send({
                    success: true,
                    message: "Usuario actualizado correctamente",
                });
            }
        }else{
            const usuario = await conexion.query(
                `UPDATE admin SET username = ?, perfil = ? WHERE id = ?`,
                [username, perfil, id]
            );
            if (!usuario) {
                return reply.code(200).send({
                    success: false,
                    message: "Error al actualizar el usuario",
                });
            } else {
                return reply.code(200).send({
                    success: true,
                    message: "Usuario actualizado correctamente",
                });
            }
        }
    } catch (error) {
        throw new Error("ActualizarUsuario-->  " + error);
    }
}

export const EliminarUsuario = async (req, reply) => {
    try {
        const { id } = req.body;
        const usuario = await conexion.query(`DELETE FROM admin WHERE id = ?`, [id]);
        if (!usuario) {
            return reply.code(200).send({
                success: false,
                message: "Error al eliminar el usuario",
            });
        } else {
            return reply.code(200).send({
                success: true,
                message: "Usuario eliminado correctamente",
            });
        }
    } catch (error) {
        throw new Error("EliminarUsuario-->  " + error);
    }
}

export const LoginAdmin = async (req, reply) => {
    const { username, password } = req.body;
    const response = await conexion.query(`SELECT * FROM admin WHERE username = ?`, [username]);
    if (response[0].length == 0) {
        reply.code(500).send({
            success: false,
            message: "Error al iniciar sesion"
        });
    } else {
        if (response[0][0].enable != 0) {
            reply.send({
                success: false,
                message: "Cuenta deshabilitada"
            });
        }else{
            const x = await comparePassword(password, response[0][0].password)
            if (x) {
                delete response[0][0].password
                var token = jwt.sign(response[0][0], 'speed', { expiresIn: '1h'});
                reply.send({
                    success: true,
                    data:token
                });
            }else{
                reply.send({
                    success: false,
                    message: "Error al iniciar sesion"
                });
            }
        }
    }
}