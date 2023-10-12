import { CloseOutlined } from '@mui/icons-material';
import { Box, Checkbox, Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';

import { UploadFile } from '../../../../../../types';
import { DropImage } from '../index';

const Anamnes: FC = () => {
  const [allowMedicalRecord, setAllowMedicalRecord] = useState(false);
  const [files, setFiles] = useState<UploadFile[]>([]);
  const removeFile = (id: number): void => {
    setFiles(files.filter((file) => file.id !== id));
  };
  const handleChangeMedicalRecord = (event: ChangeEvent<HTMLInputElement>): void => {
    setAllowMedicalRecord(event.target.checked);
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
          <Stack spacing={'5px'} alignItems={'center'} direction={'row'}>
            <Checkbox
              sx={{ padding: '0', position: 'relative', left: '-2px' }}
              checked={allowMedicalRecord}
              onChange={handleChangeMedicalRecord}
            />
            <Typography variant={'body2'}>
              I allow the doctor to view Medical records in my profile
            </Typography>
          </Stack>
          <Box>
            <TextField
              fullWidth
              multiline
              rows={6}
              sx={{
                background: '#EFEFEF',
                width: '100%',
              }}
            />
          </Box>
        </Stack>
        <DropImage state={files} getFiles={setFiles} />
      </Stack>
      <Box mt={'15px'}>
        {files.map((file) => (
          <Stack key={file.id} mt={'10px'} direction={'row'} alignItems={'center'}>
            <Typography>{file.title}</Typography>
            <Box onClick={() => removeFile(file.id)}>
              <CloseOutlined fontSize={'small'} />
            </Box>
          </Stack>
        ))}
      </Box>
    </Stack>
  );
};

export default Anamnes;
