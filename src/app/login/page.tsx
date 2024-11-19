import { SignIn } from '@/components/sign-in'
import Link from 'next/link'

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Connexion à votre compte
                    </h2>
                </div>
                <SignIn />
                <div className="text-center">
                    <Link
                        href="/register"
                        className="text-sm text-blue-600 hover:text-blue-500"
                    >
                        Pas encore de compte ? S'inscrire
                    </Link>
                </div>
            </div>
        </div>
    )
}   
