import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                    scope: "openid email profile",
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            console.log("JWT Callback - Account:", account ? "Has account" : "No account");
            if (account) {
                token.accessToken = account.access_token;
                token.idToken = account.id_token;
                token.refreshToken = account.refresh_token;
                token.expiresAt = account.expires_at;
            }
            return token;
        },
        async session({ session, token }) {
            console.log("Session Callback - Token has accessToken:", !!token.accessToken);
            session.accessToken = token.accessToken as string;

            if (token.sub) {
                session.user.id = token.sub;
            }

            return session;
        },
    },
});

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        user: {
            id?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }

    interface JWT {
        accessToken?: string;
        idToken?: string;
        refreshToken?: string;
        expiresAt?: number;
    }
}