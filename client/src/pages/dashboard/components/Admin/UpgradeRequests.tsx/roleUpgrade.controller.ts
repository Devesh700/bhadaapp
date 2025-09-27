// src/controllers/roleUpgrade.controller.ts
import axios from "axios";

export interface RoleUpgradeRequest {
  _id: string;
  userId: string;
  requestedRole: "vendor" | "owner";
  status: "pending" | "approved" | "rejected";
  requestedAt: string;
  notes?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  user: {
    name: string;
    email: string;
  };
}

const API_BASE = "/api/admin/role-upgrade-requests";

export const fetchRoleUpgradeRequests = async (): Promise<RoleUpgradeRequest[]> => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const reviewRoleUpgradeRequest = async (
  requestId: string,
  action: "approve" | "reject",
  reason?: string
): Promise<RoleUpgradeRequest> => {
  const res = await axios.post(`${API_BASE}/${requestId}/${action}`, { reason });
  return res.data;
};
