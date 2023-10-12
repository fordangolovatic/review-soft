import {
  BookmarkBorderOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from '@mui/icons-material';
import { Box, Button, Icon, Stack, Typography } from '@mui/material';
import { ButtonPropsColorOverrides } from '@mui/material/Button/Button';
import { grey } from '@mui/material/colors';
import { OverridableStringUnion } from '@mui/types';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import {
  useAddFavoriteArticleMutation,
  useRemoveFavoriteArticleMutation,
} from '../../../../api/hooks/favorite-articles';
import { Article } from '../../../../api/types/articles';
import { useGlobalState } from '../../../../utilities/global-state';
import { DisabledWrapper } from '../../../QuickActionsMenu/DisabledWrapper';

interface ArticleCardProps {
  article: Article;
  color?: OverridableStringUnion<
    'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    ButtonPropsColorOverrides
  >;
  favorite?: number;
}

export const ArticleCard: FC<ArticleCardProps> = ({ article, color, favorite }) => {
  const { isLoggedIn } = useGlobalState();
  const { asPath } = useRouter();
  const { image, articleId, content, speciality, createdAt, title, createdBy } =
    article;
  const { mutate: addFavoriteArticleMutation } = useAddFavoriteArticleMutation();
  const { mutate: removeFavoriteArticleMutation } =
    useRemoveFavoriteArticleMutation();

  const handleFavoriteArticle = () => {
    if (favorite) return removeFavoriteArticleMutation(favorite);

    addFavoriteArticleMutation(parseInt(article.articleId.toString()));
  };

  return (
    <Box
      boxShadow={'0px 0px 50px rgb(0 0 0 / 7%)'}
      borderRadius={'10px'}
      width={'100%'}
      bgcolor={'background.paper'}
    >
      <Stack>
        <Box
          position={'relative'}
          width={'100%'}
          height={{ sm: '200px', xl: '275px' }}
          borderRadius={'10px 10px 0px 0'}
          sx={{
            overflow: 'hidden',

            background: grey[300],
          }}
        >
          {image && (
            <Image
              src={image ?? ''}
              alt={'No Image'}
              fill
              loading={'eager'}
              style={{ objectFit: 'cover' }}
            />
          )}
          {!image && (
            <Typography
              position={'relative'}
              top={'50%'}
              textAlign={'center'}
              sx={{ color: grey[800], transform: 'translateY(-50%)' }}
              variant={'h4'}
            >
              {title}
            </Typography>
          )}
        </Box>

        <Stack
          spacing={{ sm: '10px', xl: '16px' }}
          padding={{ sm: '10px 15px', xl: '20px 25px' }}
        >
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Stack direction={'row'} alignItems={'center'}>
              {speciality && (
                <>
                  <Icon color={'secondary'}>
                    <BookmarkBorderOutlined />
                  </Icon>
                  <Typography key={speciality.specialityId} color={'secondary'}>
                    {speciality.specialityName}
                  </Typography>
                </>
              )}
            </Stack>

            <DisabledWrapper isDisabled={!isLoggedIn}>
              <Stack
                id={'favorite-article'}
                direction={'row'}
                alignItems={'center'}
                sx={{ cursor: 'pointer' }}
                onClick={handleFavoriteArticle}
              >
                <Icon color={'primary'}>
                  {favorite ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}
                </Icon>
                <Typography color={'primary'}>Add to favorite</Typography>
              </Stack>
            </DisabledWrapper>
          </Stack>

          <Stack spacing={{ sm: '4px', xl: '8px' }}>
            <Typography variant={'h5'}>{title}</Typography>
            <Typography sx={{ color: grey[600] }} variant={'body2'}>
              {`${createdBy?.firstName} ${createdBy?.lastName}`}
            </Typography>
          </Stack>

          <Box overflow={'hidden'} height={{ sm: '130px', xl: '175px' }}>
            <Typography
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '7',
                WebkitBoxOrient: 'vertical',
              }}
              variant={'body1'}
            >
              {content}
            </Typography>
          </Box>

          <Stack
            rowGap={'10px'}
            alignItems={'center'}
            direction={'row'}
            justifyContent={'space-between'}
            flexWrap={{ sm: 'wrap' }}
          >
            <Typography sx={{ color: grey[600] }} variant={'body2'}>
              {dayjs(createdAt).format('ddd MM - YYYY')}
            </Typography>

            <Stack spacing={'3px'} alignItems={'center'} direction={'row'}>
              {/*<Icon sx={{ color: grey[600] }}>*/}
              {/*  <SmsOutlined />*/}
              {/*</Icon>*/}
              {/*<Typography sx={{ color: grey[600] }} variant={'body2'}>*/}
              {/*  /!* TODO: Need to add comments *!/*/}
              {/*  {'TODO:Comments'}*/}
              {/*</Typography>*/}
            </Stack>

            <Stack spacing={'3px'} alignItems={'center'} direction={'row'}>
              {/*<Icon sx={{ color: grey[600] }}>*/}
              {/*  <VisibilityOutlined />*/}
              {/*</Icon>*/}
              {/*<Typography sx={{ color: grey[600] }} variant={'body2'}>*/}
              {/*  /!* TODO: Need to add views *!/*/}
              {/*  {'TODO:Views'}*/}
              {/*</Typography>*/}
            </Stack>

            <DisabledWrapper isDisabled={true}>
              <Box
                sx={{
                  flex: '1 0 100%',
                  marginTop: { sm: '10px', xl: '0' },
                }}
              >
                <Link href={`${asPath}/${articleId}`}>
                  <Button sx={{ width: '100%' }} variant={'contained'} color={color}>
                    <Typography variant={'body2'}>Read more</Typography>
                  </Button>
                </Link>
              </Box>
            </DisabledWrapper>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
