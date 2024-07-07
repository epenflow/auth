"use server"

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export async function socialSignIn(provider:"google"|"github"){
    signIn(provider,{
        redirectTo:DEFAULT_LOGIN_REDIRECT,
    })
}