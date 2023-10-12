import { Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useCallback } from 'react';
import { useGlobalState } from '../../utilities/global-state';
import { Icons } from '../../utilities/icons';
import { DisabledWrapper } from './DisabledWrapper';
import styles from './QuickActionsMenu.module.css';

export const QuickActionsMenu: FC = () => {
  const router = useRouter();

  const { isLoggedIn } = useGlobalState();

  const onScrollToTopHandler = useCallback((): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const translation = {
    up: 'Up',
    chat: 'Emergency',
    emergency: 'Chat',
    social: 'Social',
    portal: 'Portal',
  };

  return (
    <div className={styles.fixedSidebar}>
      <div onClick={onScrollToTopHandler} className={styles.fixedSidebar__block}>
        <Icons.ArrowUpIcon />
        <Typography color={'primary'}>{translation.up}</Typography>
      </div>
      {/*<div className={styles.fixedSidebar__block}>*/}
      {/*  <Icons.NotificationIcon />*/}
      {/*  <Typography*/}
      {/*    color={'secondary'}*/}
      {/*    sx={{*/}
      {/*      color: isLogged ? '#D83136' : '#D83136',*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    {translation.emergency}*/}
      {/*  </Typography>*/}
      {/*</div>*/}
      <DisabledWrapper isDisabled>
        <Link href={isLoggedIn ? '/emergency' : ''}>
          <div className={styles.fixedSidebar__block}>
            <Icons.NotificationIcon />
            <Typography color={'primary'}>{translation.chat}</Typography>
          </div>
        </Link>
      </DisabledWrapper>
      <DisabledWrapper isDisabled={!isLoggedIn}>
        <Link href={router.pathname.includes('/social') ? '/' : '/social'}>
          <div className={styles.fixedSidebar__block}>
            <Icons.CommentRatioIcon
              colors={{
                main: '#D83136',
                secondary: '#D83136',
              }}
            />
            <Typography color={'primary'}>
              {router.pathname.includes('/social')
                ? translation.portal
                : translation.social}
            </Typography>
          </div>
        </Link>
      </DisabledWrapper>
    </div>
  );
};
