// src/services/propertyService.ts
import apiService from "@/services/api";
import { Property, SearchQuery, ApiResponse } from "@/store/types/property.type"
import { IRequestStatus } from "../types";

export type PropertyMutationPayload = {
  data: Partial<Property>;
  imageFiles?: File[];
};

const buildPropertyFormData = (payload: PropertyMutationPayload) => {
  const formData = new FormData();
  formData.append("payload", JSON.stringify(payload.data));

  const imageFiles = payload.imageFiles || [];
  for (const file of imageFiles) {
    formData.append("images", file);
  }

  return formData;
};

class PropertyService {
  async createProperty(payload: PropertyMutationPayload): Promise<IRequestStatus<Property>> {
    const hasFiles = (payload.imageFiles || []).length > 0;
    const requestBody = hasFiles ? buildPropertyFormData(payload) : payload.data;
    const response = await apiService.post<IRequestStatus<Property>>("/properties", requestBody);
    return response.data;
  }

  async getProperty(id: string): Promise<IRequestStatus<Property>> {
    const response = await apiService.get<IRequestStatus<Property>>(`/properties/${id}`);
    return response.data;
  }

  async updateProperty(id: string, payload: PropertyMutationPayload): Promise<IRequestStatus<Property>> {
    const hasFiles = (payload.imageFiles || []).length > 0;
    const requestBody = hasFiles ? buildPropertyFormData(payload) : payload.data;
    const response = await apiService.put<IRequestStatus<Property>>(`/properties/${id}`, requestBody);
    return response.data;
  }

  async deleteProperty(id: string): Promise<IRequestStatus<Property>> {
    const response = await apiService.delete<IRequestStatus<Property>>(`/properties/${id}`);
    return response.data;
  }

  async searchProperties(query?: SearchQuery): Promise<IRequestStatus<Property[]>> {
    const response = await apiService.post<IRequestStatus<Property[]>>("/properties/search", query);
    return response.data;
  }

  async myProperties(query?: SearchQuery): Promise<IRequestStatus<Property[]>> {
    const response = await apiService.post<IRequestStatus<Property[]>>("/properties/me", query);
    return response.data;
  }

  async incrementCounter(id: string, type: "view" | "contact" | "whatsapp"): Promise<IRequestStatus<Property>> {
    const response = await apiService.post<IRequestStatus<Property>>(`/properties/${id}/increment/${type}`);
    return response.data;
  }

  async unlockContact(id: string): Promise<ApiResponse> {
    const response = await apiService.post<ApiResponse>(`/properties/${id}/unlock`);
    return response.data;
  }
}

export default new PropertyService();
