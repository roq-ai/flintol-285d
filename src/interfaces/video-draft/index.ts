import { VideoInterface } from 'interfaces/video';
import { TeamMemberInterface } from 'interfaces/team-member';
import { GetQueryInterface } from 'interfaces';

export interface VideoDraftInterface {
  id?: string;
  video_id?: string;
  team_member_id?: string;
  created_at?: any;
  updated_at?: any;

  video?: VideoInterface;
  team_member?: TeamMemberInterface;
  _count?: {};
}

export interface VideoDraftGetQueryInterface extends GetQueryInterface {
  id?: string;
  video_id?: string;
  team_member_id?: string;
}
