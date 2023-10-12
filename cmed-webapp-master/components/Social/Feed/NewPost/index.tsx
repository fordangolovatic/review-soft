import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, Card, Skeleton, Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Metadata } from '../../../../api/hooks/metadata/useMetadataQuery';
import { useSocialMediaPostCreateMutation } from '../../../../api/hooks/social-media/useSocialMediaPostCreateMutation';
import { getInitials } from '../../../../utilities/functions';
import { postSchema } from '../../../../utilities/schemas/post';
import { DisabledWrapper } from '../../../QuickActionsMenu/DisabledWrapper';
import { SkeletonCollection } from '../../../SkeletonCollection';
import { Input } from '../../styled';
import Options from './components/Options';

interface NewPostProps {
  profileData?: Metadata;
  isLoading?: boolean;
}

const NewPost: FC<NewPostProps> = ({ profileData, isLoading }) => {
  type FormData = yup.InferType<typeof postSchema>;
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(postSchema),
  });
  const queryClient = useQueryClient();
  const newPostMutation = useSocialMediaPostCreateMutation();

  const handleNewPost = async (data: FormData) => {
    await newPostMutation.mutateAsync(data, {
      onError: () => (errors.content!.message = 'Could not send the post'),
      onSuccess: async () => {
        resetField('content');
        queryClient.invalidateQueries({ queryKey: ['posts'] });
      },
    });
  };

  return (
    <Card variant={'outlined'}>
      <Stack width={'100%'} p={'0px 28px 20px'} gap={'16px'}>
        <Stack
          py={'20px'}
          direction={'row'}
          gap={'20px'}
          alignItems={'center'}
          borderBottom={'1px solid #EFEFEF'}
        >
          <SkeletonCollection
            isLoading={isLoading}
            skeleton={
              <Skeleton
                animation="wave"
                variant="circular"
                sx={{
                  width: { sm: '50px', xl: '70px' },
                  height: { sm: '50px', xl: '70px' },
                }}
              />
            }
          >
            {profileData?.profileImage ? (
              <Avatar
                srcSet={profileData.profileImage}
                sx={{
                  width: { sm: '50px', xl: '70px' },
                  height: { sm: '50px', xl: '70px' },
                }}
              />
            ) : (
              <Box
                bgcolor={'#EFEFEF'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{
                  width: { sm: '50px', xl: '70px' },
                  height: { sm: '50px', xl: '70px' },
                  borderRadius: '50%',
                }}
              >
                <Typography sx={{ userSelect: 'none' }}>
                  {getInitials(`${profileData?.firstName} ${profileData?.lastName}`)}
                </Typography>
              </Box>
            )}
          </SkeletonCollection>
          <form onSubmit={handleSubmit(handleNewPost)} style={{ width: '100%' }}>
            <Input
              helperText={errors.content && errors?.content.message}
              size={'small'}
              variant={'filled'}
              placeholder="That’s new?"
              {...register('content')}
              InputProps={{ disableUnderline: true }}
            />
          </form>
        </Stack>

        <DisabledWrapper isDisabled>
          <Options />
        </DisabledWrapper>
      </Stack>
    </Card>
  );
};

export default NewPost;
