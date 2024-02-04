import { AxiosResponse } from "axios";
import contentServiceInstance from "../axiosConfig"
import { ContentForm } from "./Content.interfaces";

export const createContent = (data: ContentForm): Promise<AxiosResponse<ContentForm>> => {
  return contentServiceInstance.post(`content`, data);
};
