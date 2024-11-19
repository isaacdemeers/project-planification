import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from './lib/auth/schemas'
import { verifyPassword } from './lib/auth/utils'
import { db } from './lib/db'
import type { User } from "@prisma/client"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                try {
                    const { email, password } = await signInSchema.parseAsync(credentials)

                    const user = await db.user.findUnique({
                        where: { email }
                    })

                    if (!user) {
                        return null
                    }

                    const isValidPassword = verifyPassword(user.password, password)

                    if (!isValidPassword) {
                        return null
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        fullName: user.fullName,
                    }
                } catch (error) {
                    console.error('Erreur d\'authentification:', error)
                    return null
                }
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 jours
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user
            }
            return token
        },
        async session({ session, token }) {
            session.user = {
                ...(token.user as User),
                emailVerified: null
            }
            return session
        }
    },
    debug: process.env.NODE_ENV === 'development',
})
