import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth } = NextAuth({
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      name: "Administrator credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const email =
          typeof credentials?.email === "string"
            ? credentials.email.trim().toLowerCase()
            : "";
        const password =
          typeof credentials?.password === "string"
            ? credentials.password
            : "";
        const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
        const passwordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!configuredEmail || !passwordHash || email !== configuredEmail) {
          return null;
        }

        const passwordMatches = await bcrypt.compare(password, passwordHash);

        if (!passwordMatches) {
          return null;
        }

        return {
          id: "admin",
          name: "Administrator",
          email: configuredEmail,
          role: "ADMIN",
        };
      },
    }),
  ],
  callbacks: {
    authorized() {
      return true;
    },
    jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role;
      }

      return session;
    },
  },
});
