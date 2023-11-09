import { AdminSavedDbInterface } from "@src/types/adminAuthInterface"
import Admin from "../models/admin"

export const adminRepoMongodb=()=>{
    const getAdminByEmail=async(email:string)=>{
        const admin:AdminSavedDbInterface|null=await Admin.findOne({email});
        return admin
    }

    return {
        getAdminByEmail
    }
}

export type AdminRepoMongodb=typeof adminRepoMongodb;   