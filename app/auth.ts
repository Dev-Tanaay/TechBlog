import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";
import { prisma } from "./prisma";

export const {handlers,signIn,signOut,auth} = NextAuth({
    adapter:PrismaAdapter(prisma),
    providers:[
        GoogleProvider({ clientId: process.env.AUTH_GOOGLE_ID, clientSecret: process.env.AUTH_GOOGLE_SECRET }),
        Credentials({
            name:"credentials",
            credentials:{
                email:{label:"Email",type:'email'},
                password:{label:"Password",type:'password'},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                const userExist = await prisma.user.findFirst({
                    where: { email: credentials.email }
                });
                if (!userExist) return null;
                if(userExist.password){
                    const checkPassword = await compare(String(credentials.password), userExist.password);
                }
                if (!userExist.password) return null;
                return userExist;
            }
        })
    ],
    session:{
        strategy:"jwt"
    },
    pages:{
        signIn:"/login"
    },
    callbacks:{
        async session({ session,token }){
            if(token){
                session.user.id = token.id as string;
            }
            return session;
        },
        async jwt({token,user}){
            if(user){
                token.id=user.id;
            }
            return token;
        }
    }
})