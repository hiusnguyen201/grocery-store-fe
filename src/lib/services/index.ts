import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api/v1",
  // withCredentials: true,
});

// apiInstance.interceptors.request.use((req) => {
//   const accessToken = localStorage.getItem("accessToken");
//   if (accessToken) {
//     req.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   return req;
// });

export const apiInstance = API;
