import bybitRoute from "./modules/bybit/routes";

const fastify = require('fastify')({ logger: true })

// Routes
fastify.register(bybitRoute);

const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start();