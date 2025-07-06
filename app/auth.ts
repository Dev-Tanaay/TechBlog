import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import { compare } from "bcrypt";


export const {handlers,signIn,signOut,auth} = NextAuth({
    adapter:PrismaAdapter(prisma),
    providers:[
        Google,
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
                const checkPassword = await compare(String(credentials.password), userExist.password);
                if (!checkPassword) return null;
                return userExist;
            }
        })
    ]
})