import API from "../lib/axios";

export const getAPI = async (url, params = {}) => {
  try {
    const response = await API.get(url, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "GET request failed" };
  }
};

export const postAPI = async (url, body = {}) => {
  try {
    const isFormData = body instanceof FormData;

    const response = await API.post(url, body, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : {},
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "POST request failed" };
  }
};
