import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { signUpSchema } from '@/lib/auth/schemas'
import { saltAndHashPassword } from '@/lib/auth/utils'
import { Prisma } from '@prisma/client'

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Valider les données avec le schéma
        const validatedData = await signUpSchema.parseAsync(body)

        // Vérifier si l'email existe déjà
        const existingUser = await db.user.findUnique({
            where: { email: validatedData.email }
        })

        if (existingUser) {
            return NextResponse.json(
                { message: 'Cet email est déjà utilisé' },
                { status: 400 }
            )
        }

        // Hasher le mot de passe
        const hashedPassword = saltAndHashPassword(validatedData.password)

        // Créer l'utilisateur
        const user = await db.user.create({
            data: {
                email: validatedData.email,
                password: hashedPassword,
                name: validatedData.name,
                fullName: validatedData.fullName,
            },
        })

        // Retourner l'utilisateur sans le mot de passe
        const { password: _, ...userWithoutPassword } = user

        return NextResponse.json(userWithoutPassword, { status: 201 })
    } catch (error) {
        // Log l'erreur complète pour le débogage
        console.error('Erreur détaillée:', error)

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json(
                {
                    message: 'Erreur de base de données',
                    code: error.code,
                    meta: error.meta
                },
                { status: 400 }
            )
        }

        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: 'Une erreur est survenue lors de l\'inscription' },
            { status: 500 }
        )
    }
} 