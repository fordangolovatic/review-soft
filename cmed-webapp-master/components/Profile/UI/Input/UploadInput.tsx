import { AttachFileOutlined } from '@mui/icons-material';
import { Box, InputAdornment, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React, { ChangeEvent, FC, useRef, useState } from 'react';
import { IUploadFile, IUploadInput } from '../../../Departments/Doctors/types';
import { SUploadInput } from '../../styled';

const UploadInput: FC<IUploadInput> = ({ label, placeholder, accept, limit }) => {
  const [uploads, setUploads] = useState<IUploadFile[]>([]);
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files?.length) {
      return;
    }

    const { files } = e.target;
    setUploads([
      ...uploads,
      {
        id: uploads?.length + 1,
        title: files[0].name,
        file: URL.createObjectURL(files[0]),
      },
    ]);
  };
  const onRemove = (id: number) => {
    setUploads(uploads.filter((item) => item.id !== id));
  };
  const inputRef = useRef<null | HTMLInputElement>(null);
  return (
    <Stack spacing={'15px'}>
      <Stack width={'100%'} spacing={'10px'}>
        <Typography variant={'body2'} color={'secondary.dark'}>
          {label}
        </Typography>
        <input
          accept={accept}
          ref={inputRef}
          style={{ display: 'none' }}
          type={'file'}
          disabled={uploads.length === limit}
          onChange={handleFileUpload}
        />
        <SUploadInput
          id={label?.replaceAll(' ', '-').toLowerCase()}
          sx={{ cursor: 'pointer' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AttachFileOutlined />
              </InputAdornment>
            ),
          }}
          onClick={() => inputRef?.current?.click()}
          placeholder={
            placeholder ||
            (limit ? `Uploaded ${uploads.length.toString()}/${limit}` : '')
          }
        />
      </Stack>
      {!!uploads.length && (
        <Stack
          height={!uploads.length ? '0px' : '178px'}
          sx={{ position: 'relative', overflow: 'scroll' }}
        >
          <Stack
            overflow={'scroll'}
            direction={'row'}
            spacing={'10px'}
            sx={{ position: 'absolute' }}
          >
            {uploads.map((upload) => (
              <Box key={upload.id}>
                <Stack width={'150px'} spacing={'10px'}>
                  <Box sx={{ position: 'relative' }} height={'150px'}>
                    <Image
                      fill
                      style={{ objectFit: 'contain' }}
                      sizes={'100%'}
                      src={upload.file}
                      alt={upload.title}
                    />
                  </Box>
                  <Typography
                    onClick={() => onRemove(upload.id)}
                    color={'red'}
                    variant={'body1'}
                    sx={{ cursor: 'pointer' }}
                  >
                    Delete
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default UploadInput;
