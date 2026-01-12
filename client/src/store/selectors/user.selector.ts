import { RootState } from "../store";

export const selectUpgradeRequests = (state: RootState) => state.user?.roleUpgradeRequests;