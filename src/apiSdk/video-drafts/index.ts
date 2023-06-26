import axios from 'axios';
import queryString from 'query-string';
import { VideoDraftInterface, VideoDraftGetQueryInterface } from 'interfaces/video-draft';
import { GetQueryInterface } from '../../interfaces';

export const getVideoDrafts = async (query?: VideoDraftGetQueryInterface) => {
  const response = await axios.get(`/api/video-drafts${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createVideoDraft = async (videoDraft: VideoDraftInterface) => {
  const response = await axios.post('/api/video-drafts', videoDraft);
  return response.data;
};

export const updateVideoDraftById = async (id: string, videoDraft: VideoDraftInterface) => {
  const response = await axios.put(`/api/video-drafts/${id}`, videoDraft);
  return response.data;
};

export const getVideoDraftById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/video-drafts/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteVideoDraftById = async (id: string) => {
  const response = await axios.delete(`/api/video-drafts/${id}`);
  return response.data;
};
