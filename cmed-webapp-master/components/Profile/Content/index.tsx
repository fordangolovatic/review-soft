import { Skeleton, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useSearchParams } from 'next/navigation';
import { FC, useMemo } from 'react';
import { menuItems } from '../Sidebar/Sidebar';
import { ContentWrapper } from '../styled';

const Content: FC = () => {
  const { t } = useTranslation('profile');
  const searchParams = useSearchParams();

  const selectedTabConfig = useMemo(() => {
    const tab = searchParams.get('tab');

    const tabConfig = [
      ...menuItems[0].items,
      ...menuItems[1].items,
      ...menuItems[2].items,
    ].find((item) => item.value === tab);

    return tabConfig;
  }, [searchParams]);

  return (
    <ContentWrapper>
      <Typography mb={{ sm: '14px', xl: '20px' }} color={'primary'} variant={'h4'}>
        {!selectedTabConfig?.translationKey ? (
          <Skeleton variant="rectangular" animation="wave" width="30%" height={28} />
        ) : (
          t(`s-${selectedTabConfig?.translationKey}`)
        )}
      </Typography>
      {selectedTabConfig?.component}
    </ContentWrapper>
  );
};

export default Content;
