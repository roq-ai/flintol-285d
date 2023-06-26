import { VideoDraftInterface } from 'interfaces/video-draft';
import { OrganizationInterface } from 'interfaces/organization';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface VideoInterface {
  id?: string;
  title: string;
  content: string;
  status: string;
  organization_id?: string;
  creator_id?: string;
  created_at?: any;
  updated_at?: any;
  video_draft?: VideoDraftInterface[];
  organization?: OrganizationInterface;
  user?: UserInterface;
  _count?: {
    video_draft?: number;
  };
}

export interface VideoGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  content?: string;
  status?: string;
  organization_id?: string;
  creator_id?: string;
}
