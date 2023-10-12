import { CloudUploadOutlined } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, DragEvent, FC, useRef } from 'react';
import { DisabledWrapper } from '../../../../../../../../QuickActionsMenu/DisabledWrapper';
import { IUploadInput } from '../../../../../../types';

const DropImage: FC<IUploadInput> = ({
  accept,
  limit,
  getFiles,
  state,
  disabled,
}) => {
  const { t } = useTranslation();

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
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
          file: URL.createObjectURL(files[0]),
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
        <Typography variant={'body2'}>{t('dndImageTitle')}</Typography>
      </Stack>

      <Stack spacing={'15px'} height={'100%'} justifyContent={'space-between'}>
        <DisabledWrapper isDisabled={disabled}>
          <Box
            onClick={() => inputRef?.current?.click()}
            onDragStart={dragStartHandler}
            onDragOver={dragStartHandler}
            onDragLeave={dragLeaveHandler}
            onDrop={dropHandler}
            sx={{
              background: '#EFEFEF',
              width: '144px',
              height: '100%',
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
              {t('dndImageDescription')}
            </Typography>
          </Box>
        </DisabledWrapper>

        {limit && limit > 1 && (
          <Typography
            textAlign={'center'}
            variant={'body1'}
            color={'secondary.dark'}
          >
            {`${state?.length}/${limit} images`}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default DropImage;
