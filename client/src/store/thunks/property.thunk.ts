import { createAsyncThunk } from "@reduxjs/toolkit";
import propertyService from "@/store/services/property.service";
import { Property, SearchQuery } from "@/store/types/property.type"
import { IRequestStatus } from "../types";

export const createProperty = createAsyncThunk<IRequestStatus<Property>, Partial<Property>>(
  "property/create",
  async (data, { rejectWithValue }) => {
    try {
      return await propertyService.createProperty(data);
    } catch (err: any) {
      return rejectWithValue(err.response?.data || { message: "Failed to create property" });
    }
  }
);

export const getProperty = createAsyncThunk<IRequestStatus<Property>, string>(
  "property/get",
  async (id, { rejectWithValue }) => {
    try {
      return await propertyService.getProperty(id);
    } catch (err: any) {
      return rejectWithValue(err.response?.data || { message: "Failed to fetch property" });
    }
  }
);

export const updateProperty = createAsyncThunk<IRequestStatus<Property>, { id: string; data: Partial<Property> }>(
  "property/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await propertyService.updateProperty(id, data);
    } catch (err: any) {
      return rejectWithValue(err.response?.data || { message: "Failed to update property" });
    }
  }
);

export const deleteProperty = createAsyncThunk<IRequestStatus<Property>, string>(
  "property/delete",
  async (id, { rejectWithValue }) => {
    try {
      return await propertyService.deleteProperty(id);
    } catch (err: any) {
      return rejectWithValue(err.response?.data || { message: "Failed to delete property" });
    }
  }
);

export const searchProperties = createAsyncThunk<IRequestStatus<Property[]>, SearchQuery>(
  "property/search",
  async (query, { rejectWithValue }) => {
    try {
      return await propertyService.searchProperties(query);
    } catch (err: any) {
      return rejectWithValue(err.response?.data || { message: "Failed to search properties" });
    }
  }
);

export const getMyProperties = createAsyncThunk<IRequestStatus<Property[]>, (SearchQuery | undefined)>(
  "property/me",
  async (query, { rejectWithValue }) => {
    try {
      return await propertyService.myProperties(query);
    } catch (err: any) {
      return rejectWithValue(err.response?.data || { message: "Failed to search properties" });
    }
  }
);

export const incrementCounter = createAsyncThunk<IRequestStatus<Property>, { id: string; type: "view" | "contact" | "whatsapp" }>(
  "property/incrementCounter",
  async ({ id, type }, { rejectWithValue }) => {
    try {
      return await propertyService.incrementCounter(id, type);
    } catch (err: any) {
      return rejectWithValue(err.response?.data || { message: "Failed to increment counter" });
    }
  }
);
