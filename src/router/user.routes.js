import { FormularioPreRegistro } from "../controller/form.controller";
import { ActualizarUsuario, EliminarUsuario, GuardarUsuario, LoginAdmin, ObtenerUsuarios } from "../controller/user.controller";


const routes = [
    {
        path: '/api/v1/user',
        method: 'POST',
        handler: GuardarUsuario
    },
    {
        path: '/api/v1/user',
        method: 'GET',
        handler: ObtenerUsuarios
    },
    {
        path: '/api/v1/user',
        method: 'PUT',
        handler: ActualizarUsuario
    },
    {
        path: '/api/v1/user',
        method: 'DELETE',
        handler: EliminarUsuario
    },
    {
        path: '/api/v1/login',
        method: 'POST',
        handler: LoginAdmin
    },
]

export default routes;