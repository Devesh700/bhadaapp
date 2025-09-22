import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import * as userService from "../services/user.service"
import { AxiosError } from "axios";
import { IRequestStatus } from "../types";
import { IUser } from "../types/user.type";

export const getUserProfile = createAsyncThunk<IRequestStatus<IUser>>(
    "user/getUserProfile",
    async(_, {rejectWithValue}) => {
        try {
            debugger
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