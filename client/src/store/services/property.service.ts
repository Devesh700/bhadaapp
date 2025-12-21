// src/services/propertyService.ts
import apiService from "@/services/api";
import { Property, SearchQuery, ApiResponse } from "@/store/types/property.type"
import { IRequestStatus } from "../types";


class PropertyService {
  async createProperty(data: Partial<Property>): Promise<IRequestStatus<Property>> {
    const response = await apiService.post<IRequestStatus<Property>>("/properties", data);
    return response.data;
  }

  async getProperty(id: string): Promise<IRequestStatus<Property>> {
    const response = await apiService.get<IRequestStatus<Property>>(`/properties/${id}`);
    return response.data;
  }

  async updateProperty(id: string, data: Partial<Property>): Promise<IRequestStatus<Property>> {
    const response = await apiService.put<IRequestStatus<Property>>(`/properties/${id}`, data);
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
}

export default new PropertyService();
