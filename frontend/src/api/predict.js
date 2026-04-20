import api from "./axios";

export const predictStatus = (data) => api.post("/predict", data);
