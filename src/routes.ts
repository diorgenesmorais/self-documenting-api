import { z } from "zod";
import type { FastifyTypedInstance } from "./types";

interface User {
    id: string;
    name: string;
    email: string;
}

const users: User[] = [];

export async function routes(app: FastifyTypedInstance) {
    app.get("/users", {
        schema: {
            description: "Get all users",
            tags: ["users"],
            response: {
                200: z.array(z.object({
                    id: z.string(),
                    name: z.string(),
                    email: z.string(),
                })),
            },
        },
    }, async () => {
        return users;
    });

    app.post("/users", {
        schema: {
            description: "Create a new user",
            tags: ["users"],
            body: z.object({
                name: z.string().min(3).max(255),
                email: z.string().email()
            }),
            response: { 201: z.object({ id: z.string(), name: z.string(), email: z.string() }) },
        },
    }, async (request, reply) => {
        const { name, email } = request.body;

        const user = { id: crypto.randomUUID(), name, email };
        users.push(user);

        return reply.code(201).send(user);
    });
}