import { FileDownloadDoneOutlined } from '@mui/icons-material';
import { Box, Button, Icon, Stack, Typography } from '@mui/material';
import { green, grey, yellow } from '@mui/material/colors';
import React, { FC, useState } from 'react';
import { UploadImages } from '../../../../index';
import { FormikProps } from '../../../../Profile/personal-information/components/full-name/FullName';
import { STextFieldInput } from '../../../../Profile/styled';
import { FileState } from '../../../../UploadImages';

type ContentProps = FormikProps;

export const Content: FC<ContentProps> = ({
  handleChange,
  setFieldValue,
  submitForm,
  values,
}) => {
  const [fileState, setFileState] = useState<FileState | null>(
    values.image && {
      isUploading: false,
      name: values.image?.match(/\/([^/]+)$/)?.[1],
    },
  );

  const onSetFileName = (fileName: string, isUploading: boolean) => {
    setFileState({
      name: fileName,
      isUploading,
    });
  };

  const onRemoveImage = () => {
    setFileState?.(null);
    setFieldValue?.('image', '');
  };

  return (
    <Stack>
      <Stack direction={'row'} spacing={'20px'}>
        <Stack spacing={'8px'} width={'100%'}>
          <Typography variant={'subtitle1'} sx={{ color: grey[600] }}>
            Content
          </Typography>
          <STextFieldInput
            name={'content'}
            value={values.content}
            onChange={handleChange}
            multiline
            rows={4}
            placeholder={'Write the article content'}
          />
        </Stack>
        <Stack spacing={'8px'}>
          <Typography variant={'subtitle1'} sx={{ color: grey[600] }}>
            Add image
          </Typography>
          <UploadImages
            values={values}
            submitForm={submitForm}
            setFieldValue={setFieldValue}
            getFileState={onSetFileName}
          />
        </Stack>
      </Stack>
      <Box mt={'10px'}>
        <Stack>
          {fileState && (
            <Stack spacing={'10px'} direction={'row'} alignItems={'center'}>
              <Box
                sx={{
                  position: 'relative',
                  cursor: 'pointer',
                  width: 'fit-content',
                  padding: '4px 7px',
                  border: `2px solid ${
                    fileState.isUploading ? yellow[400] : green[400]
                  }`,
                  borderRadius: '5px',
                  color: grey[700],
                }}
              >
                {fileState?.name}
                <Button
                  onClick={onRemoveImage}
                  variant={'contained'}
                  color={'primary'}
                  sx={{
                    padding: '0',
                    minWidth: '0px',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50px',
                    position: 'absolute',
                    top: '-7px',
                    right: '-7px',
                  }}
                >
                  <Typography sx={{ transform: 'rotate(45deg) translateX(1px)' }}>
                    +
                  </Typography>
                </Button>
              </Box>
              {!fileState?.isUploading && (
                <Icon color={'secondary'}>
                  <FileDownloadDoneOutlined />
                </Icon>
              )}
            </Stack>
          )}
        </Stack>
      </Box>
    </Stack>
  );
};
