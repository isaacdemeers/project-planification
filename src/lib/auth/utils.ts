import crypto from 'crypto'
import { db } from '@/lib/db' // Assurez-vous d'avoir configuré votre connexion à la base de données

export function saltAndHashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex')
    return `${salt}:${hash}`
}

export function verifyPassword(storedPassword: string, inputPassword: string): boolean {
    const [salt, storedHash] = storedPassword.split(':')
    const hash = crypto
        .pbkdf2Sync(inputPassword, salt, 1000, 64, 'sha512')
        .toString('hex')
    return storedHash === hash
}

export async function getUserFromDb(email: string, pwHash: string) {
    try {
        const user = await db.user.findFirst({
            where: {
                email,
                password: pwHash
            }
        })
        return user
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur: ', error)
        return null
    }
} 