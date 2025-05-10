import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

//export default NextAuth.default({
const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login/login.html"
  },
});

 export { handler as GET, handler as POST };
