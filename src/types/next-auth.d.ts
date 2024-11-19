import { DefaultSession } from "next-auth"
import { User } from "@prisma/client"

declare module "next-auth" {
    interface Session {
        user: Omit<User, "password"> & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: Omit<User, "password">
    }
} 