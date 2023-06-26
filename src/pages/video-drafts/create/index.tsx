import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createVideoDraft } from 'apiSdk/video-drafts';
import { Error } from 'components/error';
import { videoDraftValidationSchema } from 'validationSchema/video-drafts';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { VideoInterface } from 'interfaces/video';
import { TeamMemberInterface } from 'interfaces/team-member';
import { getVideos } from 'apiSdk/videos';
import { getTeamMembers } from 'apiSdk/team-members';
import { VideoDraftInterface } from 'interfaces/video-draft';

function VideoDraftCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: VideoDraftInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createVideoDraft(values);
      resetForm();
      router.push('/video-drafts');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<VideoDraftInterface>({
    initialValues: {
      video_id: (router.query.video_id as string) ?? null,
      team_member_id: (router.query.team_member_id as string) ?? null,
    },
    validationSchema: videoDraftValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Video Draft
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<VideoInterface>
            formik={formik}
            name={'video_id'}
            label={'Select Video'}
            placeholder={'Select Video'}
            fetcher={getVideos}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.title}
              </option>
            )}
          />
          <AsyncSelect<TeamMemberInterface>
            formik={formik}
            name={'team_member_id'}
            label={'Select Team Member'}
            placeholder={'Select Team Member'}
            fetcher={getTeamMembers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.id}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'video_draft',
  operation: AccessOperationEnum.CREATE,
})(VideoDraftCreatePage);
