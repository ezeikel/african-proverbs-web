import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import prisma from "./lib/prisma";
import { Role } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      const { email } = user;

      const existingUser = email
        ? await prisma.user.findUnique({ where: { email } })
        : null;

      if (existingUser) {
        return true;
      } else {
        await prisma.user.create({
          data: {
            email,
            name: profile?.name,
            // TODO: remove this once we have a way to add roles to users
            role: Role.ADMIN,
          },
        }); // Create a new user with these details
        return true;
      }
    },
    async session({ session, token }) {
      const dbUser = token.email
        ? await prisma.user.findUnique({
            where: { email: token.email },
          })
        : null;

      session.userId = dbUser?.id as string;
      return session;
    },
  },
});
