import 'dotenv/config'
import path from 'path'
import Fastify from 'fastify'
import swagger from "./utils/swagger"
import Szchat from './router/szchat.routes'

const fastify = Fastify({
    logger: {
        level: 'info',
    }
});


fastify.register(require("@fastify/swagger"), swagger.options)

fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, './public/tickets'),
    prefix: '/tickets/',
})

fastify.register(async fastify => {

    fastify.setErrorHandler(async err => {
        console.log(err.message)
        throw new Error(err.message)
    })

    Szchat.forEach(route => {
        fastify.route(route)
    });

})


fastify.setErrorHandler(async err => {
    console.log(err.message)
    throw new Error(err.message)
})






const start = async () => {
    try {
        await fastify.listen({ port: process.env.PORT, host: process.env.HOST || '' })
        await fastify.swagger();
        console.log(`server listening on ${process.env.PORT}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start()