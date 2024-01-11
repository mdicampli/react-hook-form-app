import { z } from "zod";
import validator from "validator";

export const registerSchema = z.object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(3),
    email: z.string(),
    birthday: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirm: z.string()
}).refine(data => validator.isEmail(data.email), {
    message: "Email must be a valid email address",
    path: ["email"]
}).refine(data => data.password === data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"]
});

export type TRegisterSchema = z.infer<typeof registerSchema>;