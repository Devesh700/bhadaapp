import { UserModel } from '../modules/user/user.model';

export const generateReferralCode = async (): Promise<string> => {
  let code: string;
  let exists = true;
  do {
    code = Math.random().toString(36).substring(2, 8).toUpperCase();
    exists = await UserModel.exists({ referralCode: code }) ? true : false;
  } while (exists);
  return code;
};
