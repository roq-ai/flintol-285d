import * as yup from 'yup';

export const videoValidationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  status: yup.string().required(),
  organization_id: yup.string().nullable(),
  creator_id: yup.string().nullable(),
});
