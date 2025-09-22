import api from "@/services/api"
import axios from "axios"
import { IUser } from "../types/user.type";

export const getProfile = async() => {
    return api.get("/users/profile");
}


export const updateProfile = async(data:Partial<IUser>) => {
    return api.put("/users/profile",data);
}