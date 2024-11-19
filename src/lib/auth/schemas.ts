import { z } from "zod"

export const signInSchema = z.object({
    email: z.string().email("Email invalide"),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères")
})

export const signUpSchema = z.object({
    email: z.string().email("Email invalide"),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    name: z.string().min(2, "Le nom d'utilisateur doit contenir au moins 2 caractères"),
    fullName: z.string().min(2, "Le nom complet doit contenir au moins 2 caractères")
})

export type SignInCredentials = z.infer<typeof signInSchema>
export type SignUpCredentials = z.infer<typeof signUpSchema> 