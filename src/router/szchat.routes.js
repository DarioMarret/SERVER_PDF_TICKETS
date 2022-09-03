import { FormularioPreRegistro } from "../controller/form.controller";
import { consultarCedula, GenaradorPdrQR } from "../controller/pdf.controller";


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
    }
]

export default routes;