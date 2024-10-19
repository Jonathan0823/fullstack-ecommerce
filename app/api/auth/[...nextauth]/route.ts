import { BACKEND_URL } from "@/lib/constant";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login",

    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email"},
                password: { label: "Password", type: "password"}
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const { email, password } = credentials;
                try {
                    const res = await fetch(`${BACKEND_URL}/auth/login`, {
                        method: "POST",
                        body: JSON.stringify({ email, password }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (!res.ok) {
                        return null;
                    }
                    const user = await res.json();
                    return user;
                } catch (error) {
                    console.error(error);
                    return null;
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return { ...token, ...user };
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            session.backendtoken = token.backendtoken;
            return session;
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };