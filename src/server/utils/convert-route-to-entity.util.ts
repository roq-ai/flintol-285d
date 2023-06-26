const mapping: Record<string, string> = {
  organizations: 'organization',
  'team-members': 'team_member',
  users: 'user',
  videos: 'video',
  'video-drafts': 'video_draft',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
