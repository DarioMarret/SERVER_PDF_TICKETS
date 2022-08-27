import { GenaradorPdrQR } from "../controller/pdf.controller";


const routes = [
    {
        path: '/api/v1/szchat',
        method: 'POST',
        handler: GenaradorPdrQR
    }
]

export default routes;