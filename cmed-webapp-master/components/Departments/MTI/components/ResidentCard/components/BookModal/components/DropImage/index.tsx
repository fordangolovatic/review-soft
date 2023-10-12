import { CloudUploadOutlined } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { ChangeEvent, DragEvent, FC, useRef } from 'react';
import { UploadInput } from '../../../../../../types';

const DropImage: FC<UploadInput> = ({ accept, limit, getFiles, state }) => {
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.target?.files?.length) {
      return;
    }

    if (state && getFiles) {
      const { files } = e.target;
      getFiles([
        ...state,
        {
          id: state?.length + 1,
          title: files[0].name,
          file: files[0],
        },
      ]);
    }
  };

  const inputRef = useRef<null | HTMLInputElement>(null);

  const dragStartHandler = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const dropHandler = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  return (
    <Stack gap={{ sm: '15px', xl: '20px' }} ml={'20px'}>
      <Stack justifyContent={'center'} height={'24px'}>
        <Typography variant={'body2'}>Add image</Typography>
      </Stack>

      <Stack spacing={'15px'} height={'100%'} justifyContent={'space-between'}>
        <Box
          onClick={() => inputRef?.current?.click()}
          onDragStart={dragStartHandler}
          onDragOver={dragStartHandler}
          onDragLeave={dragLeaveHandler}
          onDrop={dropHandler}
          sx={{
            background: '#EFEFEF',
            width: '144px',
            height: '141px',
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
            disabled={state?.length === limit}
            onChange={handleFileUpload}
          />

          <Typography textAlign={'center'}>
            <CloudUploadOutlined fontSize={'large'} sx={{ color: '#818181' }} />
          </Typography>

          <Typography color={'#818181'} textAlign={'center'} variant={'body1'}>
            Drag files or browse file on computer
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default DropImage;
