import { CloudUploadOutlined } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { FormikValues } from 'formik';
import { FC, useMemo } from 'react';
import { useUploadImages } from './hooks';

export type FormikProps = {
  values: FormikValues;
  setFieldValue?: (field: string, value: string | number) => void;
  submitForm?: () => void;
};

export interface FileState {
  name: string;
  isUploading: boolean;
}

interface UploadImagesProps extends FormikProps {
  accept?: string;
  getFileState?: (fileName: string, isUploading: boolean) => void;
}

export const UploadImages: FC<UploadImagesProps> = ({
  accept,
  values,
  setFieldValue,
  getFileState,
}) => {
  const { inputRef, onUploadImageHandler, isUploading, fileName } = useUploadImages({
    name: 'image',
    values,
    setFieldValue,
  });

  useMemo(() => {
    return fileName && getFileState?.(fileName, isUploading);
  }, [fileName, isUploading]);

  return (
    <Stack gap={{ sm: '15px', xl: '20px' }}>
      <Stack spacing={'15px'} justifyContent={'space-between'}>
        <Box
          onClick={() => inputRef?.current?.click()}
          sx={{
            background: '#EFEFEF',
            width: '144px',

            padding: '4px 10px',
            borderRadius: '10px',
            border: '1px solid #818181',
            cursor: 'pointer',
          }}
        >
          <input
            accept={accept}
            ref={inputRef}
            style={{ display: 'none' }}
            type={'file'}
            onChange={onUploadImageHandler}
          />
          <Typography textAlign={'center'}>
            <CloudUploadOutlined fontSize={'large'} sx={{ color: '#818181' }} />
          </Typography>
          <Typography color={'#818181'} textAlign={'center'} variant={'body1'}>
            {isUploading
              ? 'Image is uploading, please wait...'
              : 'Drag files or browse file on computer'}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};
