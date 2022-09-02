import { consultarCedula, GenaradorPdrQR } from "../controller/pdf.controller";


const routes = [
    {
        path: '/api/v1/szchat',
        method: 'POST',
        handler: GenaradorPdrQR
    },
    {
        path: '/api/v1/cedula:cedula',
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
    }
]

export default routes;