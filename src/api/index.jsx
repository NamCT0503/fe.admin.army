import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 500 && error.response?.data?.message === "jwt expired" && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = localStorage.getItem("accessToken");
        const { data } = await axios.post(
          `${API_URL}/refresh-token`,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
        localStorage.setItem("accessToken", data.metadata);

        api.defaults.headers["Authorization"] = `Bearer ${data.metadata.accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${data.metadata.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export const get = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    if(error.response.data?.message?.includes('expired')){
      if(localStorage.getItem('accessToken')){
        localStorage.removeItem('accessToken');
      }
      return window.location.href = "/dang-nhap";
    }
    console.error("GET request error: ", error);
    throw error;
  }
};

export const post = async (endpoint, data, config) => {
  try {
    const response = await api.post(endpoint, data, config);
    return response.data;
  } catch (error) {
    if(error.response.data?.message?.includes('expired')){
      if(localStorage.getItem('accessToken')){
        localStorage.removeItem('accessToken');
      }
      return window.location.href = "/dang-nhap";
    }
    console.error("POST request error: ", error);
    throw error;
  }
};

export const update = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    if(error.response.data?.message?.includes('expired')){
      if(localStorage.getItem('accessToken')){
        localStorage.removeItem('accessToken');
      }
      return window.location.href = "/dang-nhap";
    }
    if(error.response.data){
      return error.response.data
    } else throw error;
  }
};

export const del = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    if(error.response.data?.message?.includes('expired')){
      if(localStorage.getItem('accessToken')){
        localStorage.removeItem('accessToken');
      }
      return window.location.href = "/dang-nhap";
    }
    console.error("DELETE request error: ", error);
    throw error;
  }
};
