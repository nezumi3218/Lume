import { postAPI } from "../utils/apiHandler";

export const verifyEmail = (body) => postAPI("/email/verify-mail", body);
export const sendOTP = (body) => postAPI("/email/send-otp", body);
