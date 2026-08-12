import { z } from "zod";

//sign up page
export const signUpSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required!"),
  lastName: z.string().trim().min(1, "Last name is required!"),
  email: z.email("Enter a valid email.").trim().min(1, "Email is required"),
  password: z.string().min(15, "Password must be atleast 8 characters."),
});

export type signUpFormSchema = z.infer<typeof signUpSchema>;

//sign in page
export const signInSchema = z.object({
  email: z.email("Enter a valid email.").trim().min(1, "Email is required!"),
  password: z.string().min(8, "Password must be atleast 8 characters."),
});

export type signInFormScema = z.infer<typeof signInSchema>;

//verification code sachema.
export const codeSchema = z.object({
  code: z.string().min(1, "Enter the verification code."),
});

export type codeFormSchema = z.infer<typeof codeSchema>;
