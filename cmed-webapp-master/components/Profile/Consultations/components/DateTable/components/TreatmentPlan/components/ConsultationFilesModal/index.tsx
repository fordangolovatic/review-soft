import {
  AddOutlined,
  CloseOutlined,
  DeleteOutline,
  DownloadOutlined,
} from '@mui/icons-material';
import { Box, Button, Modal, Skeleton, Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, useMemo, useRef, useState } from 'react';
import { useUpdateConsultationMutation } from '../../../../../../../../../api/hooks/consultations';
import { useMetadataQuery } from '../../../../../../../../../api/hooks/metadata';
import { uploadToS3 } from '../../../../../../../../../api/s3';
import { Consultation } from '../../../../../../../../../api/types/consultations/consultations';
import { useToast } from '../../../../../../../../../utilities/hooks/useToast';

interface ConsultationFilesModalProps {
  open: boolean;
  close?: () => void;
  consultation: Consultation;
}

const ConsultationFilesModal: FC<ConsultationFilesModalProps> = ({
  open,
  close,
  consultation,
}) => {
  const { t } = useTranslation('profile');
  const queryClient = useQueryClient();
  const router = useRouter();
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const { notifySuccess } = useToast();

  const { data: metadata } = useMetadataQuery();
  const canEdit = useMemo(() => metadata?.accountType === 'patient', [metadata]);

  const { mutate: updateConsultationUpload } = useUpdateConsultationMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['consultation']);
      notifySuccess('Updated consultation details');
    },
  });

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files?.length) {
      return;
    }

    const { files } = e.target;

    if (!files[0]) return;

    const uploadedImage = await uploadToS3([files[0]], 'consultations');
    const uploadedURL = uploadedImage[0].Location;

    if (!uploadedURL) return;

    updateConsultationUpload({ ...consultation, image: uploadedURL });
  };

  const handleFileDelete = () => {
    updateConsultationUpload({ ...consultation, image: null });
  };

  return (
    <Modal open={open} onClose={close}>
      <Box
        sx={{
          position: 'absolute',
          minWidth: '24rem',
          top: '50%',
          left: '50%',
          transform: 'translateX(-50%) translateY(-50%)',
        }}
      >
        <Stack width={'100%'} alignItems={'center'} justifyContent={'center'}>
          <Box
            width={'100%'}
            borderRadius={'30px'}
            bgcolor={'background.paper'}
            padding={{ sm: '40px' }}
          >
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant={'h4'}>{t('c-documentsTitle')}</Typography>

              <CloseOutlined onClick={close} sx={{ cursor: 'pointer' }} />
            </Stack>

            <Stack
              gap={1}
              justifyContent={'center'}
              sx={{
                height: '100%',
                overflow: 'scroll',
                marginTop: '2rem',
              }}
            >
              <Stack direction={'row'} color={'black'}>
                {canEdit && (
                  <Button
                    disabled={!!consultation.image}
                    focusRipple
                    aria-label={t('c-documentsUpload') || 'Add document'}
                    color={'inherit'}
                    size={'small'}
                    onClick={() => inputRef.current?.click()}
                  >
                    <Stack justifyContent={'center'} alignItems={'center'}>
                      <AddOutlined />

                      <Typography>{t('c-documentsUpload')}</Typography>
                    </Stack>

                    <input
                      ref={inputRef}
                      style={{ display: 'none' }}
                      type={'file'}
                      disabled={!!consultation.image}
                      onChange={handleFileUpload}
                    />
                  </Button>
                )}

                {canEdit && (
                  <Button
                    disabled={!consultation.image}
                    focusRipple
                    aria-label={t('c-documentsRemove') || 'Delete document'}
                    color={'inherit'}
                    size={'small'}
                    onClick={handleFileDelete}
                  >
                    <Stack justifyContent={'center'} alignItems={'center'}>
                      <DeleteOutline />

                      <Typography>{t('c-documentsRemove')}</Typography>
                    </Stack>
                  </Button>
                )}

                {consultation.image && (
                  <Button
                    onClick={() =>
                      consultation.image && router.push(consultation.image)
                    }
                    disabled={!consultation.image}
                    focusRipple
                    aria-label={t('c-documentsDownload') || 'Download document'}
                    color={'inherit'}
                    size={'small'}
                  >
                    <Stack justifyContent={'center'} alignItems={'center'}>
                      <DownloadOutlined />

                      <Typography>{t('c-documentsDownload')}</Typography>
                    </Stack>
                  </Button>
                )}
              </Stack>

              {!consultation.image && (
                <Typography
                  mt={2}
                  variant={'body1'}
                  color={'#818181'}
                  textAlign={'center'}
                >
                  {t('c-documentsEmpty')}
                </Typography>
              )}

              {consultation.image && !imageLoaded && (
                <Skeleton
                  variant={'rectangular'}
                  animation={'wave'}
                  width={'20rem'}
                  height={'20rem'}
                />
              )}

              {consultation.image && (
                <img
                  src={consultation.image}
                  alt="consultation-paper"
                  style={{
                    borderRadius: '8px',
                    width: '20rem',
                    objectFit: 'cover',
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                  onLoad={() => setImageLoaded(true)}
                />
              )}
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ConsultationFilesModal;
