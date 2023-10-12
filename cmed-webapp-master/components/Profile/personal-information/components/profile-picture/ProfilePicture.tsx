import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { Box, Skeleton, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { BaseSyntheticEvent, FC, useCallback, useRef, useState } from 'react';
import { useAccountQuery } from '../../../../../api/hooks/account';
import { deleteFromS3, uploadToS3 } from '../../../../../api/s3';
import { FormikProps } from '../full-name/FullName';

type ProfilePictureProps = FormikProps;

export const ProfilePicture: FC<ProfilePictureProps> = ({
  setFieldValue,
  values,
  submitForm,
}) => {
  const { t } = useTranslation('profile');
  const translations = {
    changePhoto: t('pI-avatar'),
    removePhoto: t('pI-removeAvatar'),
  };
  const { isLoading: isLoadingAccount } = useAccountQuery();

  const [isUploading, setIsUploading] = useState(false);

  const inputFile = useRef<HTMLInputElement>(null);

  const allowedSelectInput = '.jpeg, .jpg, .png';

  const onClick = (): void => {
    if (typeof window !== 'undefined') {
      inputFile?.current?.click();
    }
  };

  const onUploadImageHandler = useCallback(
    async (event: BaseSyntheticEvent) => {
      setIsUploading(true);
      if (!event.target.value) {
        setIsUploading(false);
        return;
      }
      // eslint-disable-next-line no-console
      if (event.target.value) {
        // if (!isImageSizeValid(event.target.files[0]?.size)) {
        //   notifyError(
        //     `File is too big. Please upload file smaller than ${IMAGE_MAX_SIZE_MB}`,
        //   );
        //   return;
        // }
        // setLoading(true);
        let image;
        try {
          // We need to change CORS settings for S3
          // values.profileImage && (await deleteFromS3([values.profileImage]));

          image = await uploadToS3([event.target.files[0]], 'images');
          setFieldValue?.('profileImage', image[0].Location);
        } catch (err) {
          // notifyError(feedbackMessage('', FEEDBACK_TYPE.GENERAL_ERROR));
          return;
        } finally {
          setIsUploading(false);
        }

        // eslint-disable-next-line no-console
        // console.log('loc', image);
      }
    },
    [setFieldValue],
  );

  const onImageRemoveHandler = useCallback(async () => {
    if (!values?.profileImage) return;

    try {
      await deleteFromS3([values.profileImage]);
      setFieldValue?.('profileImage', '');
    } catch (error) {
      return;
    }
  }, [setFieldValue, values?.profileImage]);

  const hasImage = values?.profileImage && values?.profileImage !== 'Undefined';

  const isLoading = isLoadingAccount || isUploading;

  return (
    <Box>
      <Box>
        <Box>
          {isLoading ? (
            <Skeleton variant="rectangular" width={124} height={148} />
          ) : hasImage ? (
            <Image
              height={148}
              width={124}
              src={`${values?.profileImage}`}
              alt={'avatar'}
              style={{ objectFit: 'cover' }}
              loading={'eager'}
            />
          ) : (
            <Box
              height={148}
              width={124}
              border="1px solid grey"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius={2}
            >
              <ImageNotSupportedIcon fontSize="large" />
            </Box>
          )}
        </Box>

        <input
          type="file"
          id="avatar-file"
          accept={allowedSelectInput}
          ref={inputFile}
          style={{ display: 'none' }}
          onChange={onUploadImageHandler}
        />

        <Stack py={2} gap={1}>
          <Typography
            id={'change-avatar'}
            variant={'body2'}
            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            color={'secondary'}
            textAlign={'center'}
            onClick={onClick}
          >
            {translations.changePhoto}
          </Typography>

          {values?.profileImage && (
            <Typography
              id={'delete-avatar'}
              variant={'body2'}
              sx={{ textDecoration: 'underline', cursor: 'pointer' }}
              color={'red'}
              textAlign={'center'}
              onClick={onImageRemoveHandler}
            >
              {translations.removePhoto}
            </Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
};
