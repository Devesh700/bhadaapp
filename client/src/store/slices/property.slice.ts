import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Property } from "@/store/types/property.type";
import {
  createProperty,
  getProperty,
  updateProperty,
  deleteProperty,
  searchProperties,
  incrementCounter,
  getMyProperties,
} from "@/store/thunks/property.thunk";
import { IRequestStatus, IStatus } from "../types";

interface PropertyState {
  properties: IRequestStatus<Property[]>;
  selectedProperty: Property | null;
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  properties: {data:[], status:IStatus.idle, error: null},
  selectedProperty: null,
  loading: false,
  error: null,
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    clearSelectedProperty(state) {
      state.selectedProperty = null;
    },
  },
  extraReducers: (builder) => {
    // Create
    builder.addCase(createProperty.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProperty.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.data) {
        state.properties.data.push(action.payload.data);
      }
    });
    builder.addCase(createProperty.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get
    builder.addCase(getProperty.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedProperty = action.payload.data || null;
    });

    // Update
    builder.addCase(updateProperty.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.data) {
        const idx = state.properties.data.findIndex((p) => p._id === action.payload.data?._id);
        if (idx !== -1) {
          state.properties[idx] = action.payload.data;
        }
        if (state.selectedProperty?._id === action.payload.data._id) {
          state.selectedProperty = action.payload.data;
        }
      }
    });

    // Delete
    builder.addCase(deleteProperty.fulfilled, (state, action) => {
      state.loading = false;
      // Optionally filter if needed
    });

    // Search
    builder.addCase(searchProperties.pending, (state) => {
      state.properties.status = IStatus.running;
    })
    .addCase(searchProperties.fulfilled, (state, action) => {
      state.properties.status = IStatus.success;
      state.properties.error = null;
      state.properties.data = action.payload.data || [];
    })
    .addCase(searchProperties.rejected, (state, action) => {
      state.properties.status = IStatus.error;
      state.properties.error = action.error.message  || "Failed to search properties";
    });

    builder.addCase(getMyProperties.fulfilled, (state, action) => {
      state.properties.status = IStatus.success;
      state.properties.data = action.payload.data || [];
    });

    // Increment counter
    builder.addCase(incrementCounter.fulfilled, (state, action) => {
      if (action.payload.data) {
        const idx = state.properties.data.findIndex((p) => p._id === action.payload.data?._id);
        if (idx !== -1) {
          state.properties[idx] = action.payload.data;
        }
        if (state.selectedProperty?._id === action.payload.data._id) {
          state.selectedProperty = action.payload.data;
        }
      }
    });
  },
});

export const { clearSelectedProperty } = propertySlice.actions;
export default propertySlice.reducer;
