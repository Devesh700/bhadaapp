import { RootState } from "../store";

export const selectAuthModalState = (state: RootState) => state.partials.showAuthModal;