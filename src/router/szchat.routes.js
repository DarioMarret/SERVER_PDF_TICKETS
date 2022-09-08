import { FormularioPreRegistro } from "../controller/form.controller";
import { consultarCedula, editarTicket, eliminarTicket, GenaradorPdrQR, listarRegistroTickets } from "../controller/pdf.controller";


const routes = [
    {
        path: '/api/v1/szchat',
        method: 'POST',
        handler: GenaradorPdrQR
    },
    {
        path: '/api/v1/cedula/:cedula',
        method: 'GET',
        schema: {
            params: {
                type: 'object',
                properties: {
                    cedula: { type: 'string' }
                }
            }
        },
        handler: consultarCedula
    },
    {
        path: '/api/v1/registro',
        method: 'POST',
        schema: {
            body: {
                type: 'object',
                properties: {
                    u_nombre: { type: 'string' },
                    u_cedula: { type: 'string' },
                    u_correo: { type: 'string' },
                    u_fecha: { type: 'string' },
                    u_banco: { type: 'string' },
                    u_transaci: { type: 'string' },
                    u_form: { type: 'string' },
                    u_telefono: { type: 'string' }
                }
            }
        },
        handler: FormularioPreRegistro
    },
    {
        path: '/api/v1/szchat/listar/:nombreconcert',
        method: 'GET',
        schema: {
            params: {
                type: 'object',
                properties: {
                    nombre: { type: 'string' }
                }
            }
        },
        handler: listarRegistroTickets
    },
    {
        path: '/api/v1/szchat/eliminar/:id',
        method: 'DELETE',
        schema: {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string' }
                }
            }
        },
        handler: eliminarTicket
    },
    {
        path: '/api/v1/szchat/editar/:id',
        method: 'PUT',
        schema: {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string' }
                }
            }
        },
        handler: editarTicket
    }
]

export default routes;