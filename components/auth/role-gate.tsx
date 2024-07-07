"use client"

import { useCurrentRole } from "@/hook/use-current-role";
import { Role } from "@prisma/client";
import React from "react";
import { FormError } from "../form-error";
import { Else, If, Then } from "react-if";

interface RoleGateProps{
    children:React.ReactNode
    allowedRole :Role
}
export const RoleGate : React.FC<RoleGateProps> = ({allowedRole,children}) =>{
    const role = useCurrentRole()

    return <If condition={role!== allowedRole}>
        <Then>
            <FormError message="You do not have permission to view this content!"/>
        </Then>
        <Else>
            {children}
        </Else>
    </If>
}