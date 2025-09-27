import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import * as userService from "../services/user.service"
import { AxiosError } from "axios";
import { IRequestStatus } from "../types";
import { IUpgradeRequest, IUser, ReviewUpgradeRequest } from "../types/user.type";

export const getUserProfile = createAsyncThunk<IRequestStatus<IUser>>(
    "user/getUserProfile",
    async(_, {rejectWithValue}) => {
        try {
             
            const response = await userService.getProfile();
            return response.data as IRequestStatus<IUser>;
        } catch (err) {
            const error = err as AxiosError<{message:string}>
            return rejectWithValue(error.response?.data?.message || error.message || "Failed to update profile");
        }
    }
)


export const updateUserProfile = createAsyncThunk<
  IRequestStatus<IUser>,
  Partial<IUser>,   
  { rejectValue: { message: string } } 
>(
  "user/updateUserProfile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userService.updateProfile(data);
      return response.data as IRequestStatus<IUser>;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);



export const upgradeRole = createAsyncThunk<
  IRequestStatus<IUser>,
  Partial<IUser>,   
  { rejectValue: { message: string } } 
>(
  "user/upgradeRole",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userService.upgradeRole(data);
      return response.data as IRequestStatus<IUser>;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const getUpgradeRequests = createAsyncThunk<IRequestStatus<IUpgradeRequest[]>>(
  "user/getUpgradeRequests",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userService.getUpgradeRequests();
      return response.data as IRequestStatus<IUpgradeRequest[]>;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);


export const reviewRoleUpgradeRequest = createAsyncThunk<
  IRequestStatus<IUser>,
  ReviewUpgradeRequest,   
  { rejectValue: { message: string } } 
>(
  "user/upgradeRole",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userService.reviewRoleUpgradeRequest(data);
      return response.data as IRequestStatus<IUser>;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);