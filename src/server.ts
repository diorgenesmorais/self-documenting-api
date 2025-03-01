import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
    validatorCompiler,
    serializerCompiler,
    type ZodTypeProvider,
    jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { routes } from "./routes";
import { env } from "./env";

const { PORT } = env;

const app = fastify().withTypeProvider<ZodTypeProvider>();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(fastifyCors, { origin: "*" });
app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "Fastify API",
            description: "Building a REST API with Fastify",
            version: "1.0.0",
        },
        servers: [
            { url: `http://localhost:${PORT}`, description: "Local server" },
        ],
        tags: [{ name: "users", description: "User related endpoints" }],
    },
    transform: jsonSchemaTransform,
});
app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
});

app.register(routes);

app.listen({ port: PORT, host: '0.0.0.0' })
    .then(() => {
        console.log(`Server is running on port: ${PORT}`);
    })
    .catch((err) => {
        console.error('Error starting server:', err);
    });
