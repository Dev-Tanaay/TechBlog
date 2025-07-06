import * as z from "zod";

export const registerUser= z.object({
    username:z.string().min(3,"Atleast three char").trim(),
    email:z.string().email("Invalid email").trim(),
    password:z.string().min(8).trim(),
})

export const loginUser=z.object({
    email:z.string().email("Invalid email").trim(),
    password:z.string().min(8).trim()
})