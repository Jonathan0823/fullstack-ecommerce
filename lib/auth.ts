import { BACKEND_URL } from "@/lib/constant";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
    const res = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        authorization: `Refresh ${token.backendTokens.refreshToken}`,
      },
    });
    const response = await res.json();
      return {
          ...token,
          backendTokens: response,
      };
  }
  
  export const authOptions: NextAuthOptions = {
    pages: {
      signIn: "/login",
    },
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
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
                "Content-Type": "application/json",
              },
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
        },
      }),
    ],
  
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          return { ...token, ...user };
        }
        if (new Date().getTime() < token.backendTokens.expiresIn) {
          return token;
        }
          return await refreshToken(token);
      },
      async session({ session, token }) {
        session.user = {
          ...token.user,
          IsAdmin: token.user.isAdmin,
        };
        session.backendTokens = token.backendTokens;
        return session;
      },
    },
  };