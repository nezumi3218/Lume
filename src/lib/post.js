import { getAPI, postAPI } from "../utils/apiHandler.js";

export const getFeedPosts = () => getAPI("/posts/feed-posts");
export const getSinglePostById = (id) => getAPI(`/posts/${id}`);

export const uploadPost = (body) => postAPI("/posts/post", body);
