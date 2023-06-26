import { VideoDraftInterface } from 'interfaces/video-draft';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface TeamMemberInterface {
  id?: string;
  user_id?: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  video_draft?: VideoDraftInterface[];
  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {
    video_draft?: number;
  };
}

export interface TeamMemberGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  organization_id?: string;
}
