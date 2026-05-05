import { RootState } from "../store";

export const selectAuthModalState = (state: RootState) => state.partials.showAuthModal;
export const selectAuthRedirectPath = (state: RootState) => state.partials.authRedirectPath;
