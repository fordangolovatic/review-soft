import { Button, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { DisabledWrapper } from '../../../../../QuickActionsMenu/DisabledWrapper';

interface FooterProps {
  questionId?: number;
  publishDate?: Date;
}

export const Footer: FC<FooterProps> = ({ questionId, publishDate }) => {
  const { t } = useTranslation('common');
  const { asPath } = useRouter();
  return (
    <Stack justifyContent={'space-between'} alignItems={'center'} direction={'row'}>
      <Stack spacing={'30px'} alignItems={'center'} direction={'row'}>
        <Typography sx={{ color: grey[600] }}>
          {dayjs(publishDate).format('D MMM, ddd')}
        </Typography>
        {/* TODO: Need to add views*/}
        {/*<Stack spacing={'8px'} alignItems={'center'} direction={'row'}>*/}
        {/*  <Icon sx={{ color: grey[600] }}>*/}
        {/*    <RemoveRedEyeOutlined />*/}
        {/*  </Icon>*/}
        {/*  <Typography sx={{ color: grey[600] }}>{'TODO: Views'}</Typography>*/}
        {/*</Stack>*/}
      </Stack>
      <DisabledWrapper isDisabled>
        <Link href={`${asPath}/${questionId}`}>
          <Button variant={'contained'} color={'secondary'}>
            {t('b-readMore')}
          </Button>
        </Link>
      </DisabledWrapper>
    </Stack>
  );
};
