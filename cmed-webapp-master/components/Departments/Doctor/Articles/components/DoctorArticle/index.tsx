import {
  BookmarkOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from '@mui/icons-material';
import { Divider, Icon, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FavoriteArticle } from '../../../../../../api/types/favorite-articles';
import { useGlobalState } from '../../../../../../utilities/global-state';
import { DisabledWrapper } from '../../../../../QuickActionsMenu/DisabledWrapper';
import { Articles } from '../../../../Doctors/types';

interface DoctorArticleProps {
  article: Articles;
  favoriteArticles?: FavoriteArticle[];
  favoriteHandler: (articleId: number) => void;
}

const DoctorArticle: FC<DoctorArticleProps> = ({
  article,
  favoriteArticles,
  favoriteHandler,
}) => {
  const { t } = useTranslation();
  const { isLoggedIn } = useGlobalState();

  return (
    <Stack spacing={'15px'} direction={'column'}>
      <Stack width={'100%'} spacing={'10px'}>
        <Stack direction={'row'} alignItems={'center'}>
          <Stack
            width={'100%'}
            alignItems={'center'}
            direction={'row'}
            justifyContent={'space-between'}
          >
            <Stack spacing={'5px'} direction={'row'} alignItems={'center'}>
              <Typography color={'secondary'}>
                <BookmarkOutlined />
              </Typography>
              <Typography color={'secondary'}>{article.type}</Typography>
            </Stack>
            <DisabledWrapper isDisabled={!isLoggedIn}>
              <Stack
                spacing={'5px'}
                alignItems={'center'}
                direction={'row'}
                sx={{ cursor: 'pointer' }}
                onClick={() => favoriteHandler(article.articleId)}
              >
                <Typography variant={'body2'} color={'primary'}>
                  {t('b-addToFavorite')}
                </Typography>
                <Icon color={'primary'}>
                  {favoriteArticles?.find(
                    (favoriteArticle) =>
                      favoriteArticle.article.articleId === article.articleId,
                  ) ? (
                    <FavoriteOutlined />
                  ) : (
                    <FavoriteBorderOutlined />
                  )}
                </Icon>
              </Stack>
            </DisabledWrapper>
          </Stack>
        </Stack>
        <Typography>{article.content}</Typography>
      </Stack>
      <Divider />
    </Stack>
  );
};

export default DoctorArticle;
