import api from "@/services/api"
import axios from "axios"
import { IUser, ReviewUpgradeRequest } from "../types/user.type";

export const getProfile = async() => {
    return api.get("/users/profile");
}


export const updateProfile = async(data:Partial<IUser>) => {
    return api.put("/users/profile",data);
}


export const upgradeRole = async(data:Partial<IUser>) => {
    return api.post("/users/request-role-upgrade",data);
}

export const getUpgradeRequests = async() => {
    return api.get("/users/review");
}

export const reviewRoleUpgradeRequest = async (data: ReviewUpgradeRequest) => {
    return api.put(`/users/review/${data.requestId}`, data);
}