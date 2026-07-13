import { getAPI, postAPI } from "../utils/apiHandler";

export const registerUser = ({ body }) => postAPI("/users/register", body);
export const loginUser = ({ body }) => postAPI("/users/login", body);

export const getCurrentUser = () => getAPI("/users/current-user");
export const getUserProfile = ({ username }) => getAPI(`/users/c/${username}`);
export const logoutUser = () => postAPI("users/logout");
