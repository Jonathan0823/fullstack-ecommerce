import { BACKEND_URL } from "@/lib/constant";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }
                const { username, password } = credentials;
                try {
                    const res = await axios.post(`${BACKEND_URL}/auth/login`, { username, password });
                    if (res.status === 200) {
                        return res.data;
                    }
                    if (res.status === 401) {
                        console.log(res.statusText);
                        return null;
                    }
                } catch (error) {
                    console.error(error);
                    return null;
                }
            }
        })
    ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };