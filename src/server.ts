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
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

const envSchema = z.object({
    PORT: z
        .string()
        .transform(Number)
        .refine((val) => val > 0 && val < 65536, {
            message: "The PORT must be a number between 1 and 65535"
        }),
    NODE_ENV: z.enum(["development", "production", "test"]),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error(
        "Validation error in environment variables:",
        parsedEnv.error.format()
    );
    process.exit(1);
}

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

app.listen({ port: PORT }).then(() => {
    console.log(`Server is running on port: ${PORT}`);
});
