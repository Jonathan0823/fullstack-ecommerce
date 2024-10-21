// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";
declare module "next-auth" {
    interface Session {
        user:{
            isAdmin: any;
            IsAdmin: any;
            id: string;
            name: string;
            email: string;
            image: string;
            createdAt: string;
            updatedAt: string;
        },
        backendTokens: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";
declare module "next-auth/jwt" {
    interface JWT {
        user: {
            id: string;
            name: string;
            email: string;
            image: string;
            address:{
                firstname: string;
                lastname: string;
                emailadd: string;
                country: string;
                state: string;
                city: string;
                street: string;
                zipCode: string;
            }
            isAdmin: boolean;
            createdAt: string;
            updatedAt: string;
        };
        backendTokens: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
        };
    }
}