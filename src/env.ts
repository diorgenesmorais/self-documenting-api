import { z } from 'zod';

const envSchema = z.object({
    PORT: z
        .string()
        .transform(Number)
        .refine((val) => val > 0 && val < 65536, {
            message: "The PORT must be a number between 1 and 65535"
        }),
    NODE_ENV: z.enum(["development", "production", "test"]).default('development')
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error(
        "Validation error in environment variables:",
        _env.error.format()
    );
    process.exit(1);
}

export const env = _env.data;
