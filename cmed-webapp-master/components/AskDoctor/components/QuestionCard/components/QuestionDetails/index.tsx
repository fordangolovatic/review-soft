import { BookmarkBorderOutlined, FavoriteBorderOutlined } from '@mui/icons-material';
import { Box, Icon, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, useCallback } from 'react';
import { DisabledWrapper } from '../../../../../QuickActionsMenu/DisabledWrapper';
import { Language, Speciality } from '../../../../types';

interface QuestionDetailsProps {
  speciality?: Speciality;
  language?: Language;
}

export const QuestionDetails: FC<QuestionDetailsProps> = ({
  speciality,
  language,
}) => {
  const { t } = useTranslation('');
  const memoizedTranslate = useCallback(
    (translateKey?: string, label?: string) => {
      return t(`${translateKey}${label?.toLowerCase().replaceAll(' ', '')}`);
    },
    [t],
  );
  return (
    <Stack direction={'row'} justifyContent={'space-between'}>
      <Stack alignItems={'center'} spacing={'8px'} direction={'row'}>
        {!!speciality?.specialityId && (
          <>
            <Icon color={'secondary'}>
              <BookmarkBorderOutlined />
            </Icon>
            <Typography variant={'body1'} color={'secondary'}>
              {memoizedTranslate('sp-', speciality.specialityName)}
            </Typography>
          </>
        )}

        {!!language?.languageId && (
          <Stack height={'100%'} direction={'row'} alignItems={'center'} gap={'8px'}>
            {!!speciality?.specialityId && (
              <Box
                width={'4px'}
                height={'4px'}
                bgcolor={'#00A04A'}
                borderRadius={'100%'}
              />
            )}

            <Typography color={'secondary'}>{language.languageName}</Typography>
          </Stack>
        )}
      </Stack>

      <DisabledWrapper isDisabled>
        <Stack direction={'row'} alignItems={'center'} spacing={'8px'}>
          <Typography color={'primary'}>{t('b-addToFavorite')}</Typography>

          <Icon color={'primary'}>
            <FavoriteBorderOutlined />
          </Icon>
        </Stack>
      </DisabledWrapper>
    </Stack>
  );
};
