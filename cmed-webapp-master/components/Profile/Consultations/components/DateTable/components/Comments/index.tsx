import { StarBorderRounded, StarRounded } from '@mui/icons-material';
import { Button, Rating, Stack, TextField, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { FC, useMemo, useState } from 'react';
import { useUpdateConsultationMutation } from '../../../../../../../api/hooks/consultations';
import { Metadata } from '../../../../../../../api/hooks/metadata/useMetadataQuery';
import {
  Consultation,
  ConsultationStatusEnum,
} from '../../../../../../../api/types/consultations/consultations';
import { useToast } from '../../../../../../../utilities/hooks/useToast';

interface CommentsProps {
  consultation: Consultation;
  metadata?: Metadata;
}

export const Comments: FC<CommentsProps> = ({ consultation, metadata }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation('profile');
  const { notifySuccess, notifyError } = useToast();

  const [value, setValue] = useState<string>(consultation.comments || '');
  const [read, setRead] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(consultation.rating || 0);
  const [ratingHover, setRatingHover] = useState<number>(consultation.rating || 0);
  const canReview = useMemo(
    () =>
      Boolean(consultation.rating) ||
      consultation.consultationStatus !== ConsultationStatusEnum.COMPLETED ||
      metadata?.accountType !== 'patient',
    [consultation],
  );

  const { mutate: updateCommentsConsultation } = useUpdateConsultationMutation({
    onSuccess: () => {
      notifySuccess('Updated consultation comments');
      queryClient.invalidateQueries(['consultation']);
    },
    onError: () => notifyError('Failed to update consultation details'),
  });

  const onHandleRating = (newRating: number) => {
    updateCommentsConsultation({ ...consultation, rating: newRating });

    setRating(newRating);
  };

  const onHandleRead = () => {
    if (read && value !== consultation.comments)
      updateCommentsConsultation({ ...consultation, comments: value });

    setRead((prevState) => !prevState);
  };

  return (
    <Stack
      px={'3px'}
      alignItems={'flex-start'}
      justifyContent={'space-between'}
      height={'170px'}
    >
      <Stack spacing={'10px'} alignItems={'flex-start'}>
        {read ? (
          <TextField
            size={'small'}
            multiline
            rows={5}
            sx={{
              fontSize: '11px',
            }}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        ) : (
          <Typography
            sx={{
              overflow: 'hidden',
              height: '105px',
            }}
            overflow={'hidden'}
            variant={'body2'}
          >
            {value}
          </Typography>
        )}

        <Stack direction={'row'} alignItems={'center'}>
          <Rating
            icon={<StarRounded fontSize={'small'} />}
            emptyIcon={<StarBorderRounded fontSize={'small'} />}
            sx={{ color: 'secondary.dark' }}
            readOnly={canReview}
            value={rating}
            onChange={(event, value) => value && onHandleRating(value)}
            onChangeActive={(event, hoverValue) =>
              hoverValue && setRatingHover(hoverValue)
            }
            precision={0.1}
          />

          <Typography minWidth={'5ch'} variant={'body2'} color={'#818181'}>
            ({ratingHover > 0 ? ratingHover : rating})
          </Typography>
        </Stack>
      </Stack>
      {metadata?.accountType === 'doctor' && (
        <Stack width={'100%'} alignItems={'flex-end'}>
          <Button
            onClick={onHandleRead}
            variant={'text'}
            color={read ? 'primary' : 'secondary'}
          >
            {read ? t('common:b-cancel') : t('common:b-edit')}
          </Button>
        </Stack>
      )}
    </Stack>
  );
};
