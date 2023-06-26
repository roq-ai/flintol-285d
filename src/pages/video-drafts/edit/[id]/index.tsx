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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getVideoDraftById, updateVideoDraftById } from 'apiSdk/video-drafts';
import { Error } from 'components/error';
import { videoDraftValidationSchema } from 'validationSchema/video-drafts';
import { VideoDraftInterface } from 'interfaces/video-draft';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { VideoInterface } from 'interfaces/video';
import { TeamMemberInterface } from 'interfaces/team-member';
import { getVideos } from 'apiSdk/videos';
import { getTeamMembers } from 'apiSdk/team-members';

function VideoDraftEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<VideoDraftInterface>(
    () => (id ? `/video-drafts/${id}` : null),
    () => getVideoDraftById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: VideoDraftInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateVideoDraftById(id, values);
      mutate(updated);
      resetForm();
      router.push('/video-drafts');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<VideoDraftInterface>({
    initialValues: data,
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
            Edit Video Draft
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'video_draft',
  operation: AccessOperationEnum.UPDATE,
})(VideoDraftEditPage);
