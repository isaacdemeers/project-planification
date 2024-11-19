import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { signUpSchema } from '@/lib/auth/schemas'
import { saltAndHashPassword } from '@/lib/auth/utils'
import { Prisma } from '@prisma/client'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const validatedData = await signUpSchema.parseAsync(body)

        const existingUser = await db.user.findUnique({
            where: { email: validatedData.email }
        })

        if (existingUser) {
            return NextResponse.json(
                { message: 'Cet email est déjà utilisé' },
                { status: 400 }
            )
        }

        const hashedPassword = saltAndHashPassword(validatedData.password)

        const userData: Prisma.UserCreateInput = {
            email: validatedData.email,
            password: hashedPassword,
            // name: validatedData.name,
            // fullName: validatedData.fullName,
        }

        const user = await db.user.create({
            data: userData,
            select: {
                id: true,
                email: true,
                // name: true,
                // fullName: true,
                createdAt: true,
            }
        })

        return NextResponse.json(user, { status: 201 })
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error)

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json(
                { message: 'Erreur de base de données' },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: 'Une erreur est survenue lors de l\'inscription' },
            { status: 500 }
        )
    }
} 