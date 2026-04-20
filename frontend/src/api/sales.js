import api from "./axios";

export const getSales = () => api.get("/sales");
