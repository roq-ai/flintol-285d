import * as yup from 'yup';

export const videoDraftValidationSchema = yup.object().shape({
  video_id: yup.string().nullable(),
  team_member_id: yup.string().nullable(),
});
