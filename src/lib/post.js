import { getAPI, postAPI } from "../utils/apiHandler.js";

export const getFeedPosts = () => getAPI("/posts/feed-posts");
export const getSinglePostById = (id) => getAPI(`/posts/${id}`);

export const uploadPost = (body) => postAPI("/posts/post", body);
export const getUsersPost = () => getAPI("/posts/user-posts");

export const toggleLikePost = (id) => postAPI(`/likes/posts/${id}/like`);

export const getLikesCount = (id) => getAPI(`/likes/posts/${id}/like-count`);
