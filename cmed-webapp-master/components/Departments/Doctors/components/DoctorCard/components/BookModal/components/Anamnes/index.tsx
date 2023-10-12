import { CloseOutlined } from '@mui/icons-material';
import { Box, Checkbox, Divider, Stack, TextField, Typography } from '@mui/material';
import { FC } from 'react';
import { FormikProps, IUploadFile } from '../../../../../../types';
import { DropImage } from '../index';

type AnamnesProps = FormikProps;

const Anamnes: FC<AnamnesProps> = ({ values, setFieldValue, handleChange }) => {
  const addFile = (newFiles: IUploadFile[]) => {
    setFieldValue?.('images', newFiles);
  };
  const removeFile = (id: number) => {
    setFieldValue?.(
      'images',
      values.images.filter((file: IUploadFile) => file.id !== id),
    );
  };
  const handleChangeMedicalRecord = () => {
    setFieldValue?.('allowMedicalRecords', !values.allowMedicalRecords);
  };

  return (
    <Stack>
      <Box mb={{ sm: '15px', xl: '20px' }}>
        <Typography variant={'subtitle1'}>Anamnes</Typography>

        <Typography variant={'body1'} color={'secondary'}>
          Describe your problem fill out an anamnesis so the doctor will be ready to
          consult with you
        </Typography>
      </Box>

      <Stack
        direction={'row'}
        alignItems={'flex-start'}
        justifyContent={'space-between'}
      >
        <Stack flex={1} gap={{ sm: '15px', xl: '20px' }}>
          <Stack
            spacing={'5px'}
            alignItems={'center'}
            direction={'row'}
            sx={{ cursor: 'pointer' }}
            onClick={handleChangeMedicalRecord}
          >
            <Checkbox
              sx={{ padding: '0', position: 'relative', left: '-2px' }}
              checked={values.allowMedicalRecords}
            />

            <Typography variant={'body2'}>
              I allow the doctor to view Medical records in my profile
            </Typography>
          </Stack>

          <Box>
            <TextField
              name={'anamnes'}
              fullWidth
              multiline
              rows={6}
              sx={{
                background: '#EFEFEF',
                width: '100%',
              }}
              onChange={handleChange}
            />
          </Box>
        </Stack>

        <DropImage
          state={values.images}
          getFiles={addFile}
          limit={1}
          disabled={!values.allowMedicalRecords}
        />
      </Stack>

      <Box>
        {values.images.map((file: IUploadFile) => (
          <Stack key={file.id} mt={'10px'} direction={'row'} alignItems={'center'}>
            <Typography>{file.title}</Typography>

            <Box onClick={() => removeFile(file.id)}>
              <CloseOutlined fontSize={'small'} sx={{ cursor: 'pointer' }} />
            </Box>
          </Stack>
        ))}

        <Divider sx={{ marginTop: '15px' }} />
      </Box>
    </Stack>
  );
};

export default Anamnes;
