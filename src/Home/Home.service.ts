import { AxiosResponse } from 'axios';

import contentServiceInstance from '../axiosConfig';
import { ContentForm } from '../Content/Content.interfaces';

export const getAllContent = (): Promise<AxiosResponse<ContentForm[]>> => {
  return contentServiceInstance.get(`content`);
};

export const getContentById = (contentId: string): Promise<AxiosResponse<ContentForm>> => {
  return contentServiceInstance.get(`content/${contentId}`);
};
