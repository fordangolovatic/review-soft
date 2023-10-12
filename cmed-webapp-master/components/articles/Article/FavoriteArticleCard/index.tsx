import {
  BookmarkBorderOutlined,
  CommentOutlined,
  FavoriteOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonPropsColorOverrides,
  Icon,
  Stack,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { OverridableStringUnion } from '@mui/types';
import dayjs from 'dayjs';
import { capitalize } from 'lodash';
import Image from 'next/image';
import { FC } from 'react';
import { useRemoveFavoriteArticleMutation } from '../../../../api/hooks/favorite-articles';
import { Article } from '../../../../api/types/articles';

interface FavoriteArticleCardProps {
  article: Article;
  color?: OverridableStringUnion<
    'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    ButtonPropsColorOverrides
  >;
  favorite: number;
}

const FavoriteArticleCard: FC<FavoriteArticleCardProps> = ({
  article,
  favorite,
}) => {
  const { type, image, content, createdAt, title, createdBy } = article;
  const { mutate: removeFavoriteArticleMutation } =
    useRemoveFavoriteArticleMutation();

  const removeFavoriteHandler = () => {
    removeFavoriteArticleMutation(favorite);
  };

  return (
    <Stack width={'100%'} direction={'row'} gap={'20px'}>
      <Stack>
        <Box
          sx={{
            width: { sm: '200px', xl: '265px' },
            height: { sm: '200px', xl: '265px' },
            overflow: 'hidden',
            borderRadius: '10px',

            background: grey[300],
          }}
          position={'relative'}
        >
          {image ? (
            <Image
              src={image ?? ''}
              alt={'No Image'}
              fill
              loading={'eager'}
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <Typography
              position={'relative'}
              top={'50%'}
              textAlign={'center'}
              sx={{ color: grey[800], transform: 'translateY(-50%)' }}
              variant={'body1'}
            >
              {title}
            </Typography>
          )}
        </Box>
      </Stack>

      <Stack width={'100%'} gap={'16px'}>
        <Stack
          width={'100%'}
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Stack direction={'row'} alignItems={'center'} gap={'8px'}>
            <BookmarkBorderOutlined fontSize={'small'} color={'secondary'} />
            <Typography color={'#00A04A'}>{capitalize(type)}</Typography>
          </Stack>

          <Stack
            direction={'row'}
            alignItems={'center'}
            gap={'8px'}
            sx={{ cursor: 'pointer' }}
            onClick={removeFavoriteHandler}
          >
            <Typography color={'primary'} variant={'body2'}>
              Remove from favourites
            </Typography>
            <Icon>
              <FavoriteOutlined color={'primary'} />
            </Icon>
          </Stack>
        </Stack>
        <Stack gap={'8px'}>
          <Typography variant={'h5'}>{title}</Typography>
          <Typography sx={{ color: grey[600] }} variant={'body2'}>
            {createdBy?.firstName} {createdBy?.lastName}
          </Typography>
        </Stack>
        <Box overflow={'hidden'}>
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
          width={'100%'}
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Stack
            gap={'30px'}
            direction={'row'}
            color={'#828282'}
            alignItems={'center'}
          >
            <Typography variant={'body2'}>
              {dayjs(createdAt).format('DD.MM.YYYY')}
            </Typography>
            <Stack direction={'row'} alignItems={'center'} gap={'5px'}>
              <CommentOutlined fontSize={'small'} />
              <Typography variant={'body2'}>2</Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} gap={'5px'}>
              <VisibilityOutlined fontSize={'small'} />
              <Typography variant={'body2'}>2</Typography>
            </Stack>
          </Stack>

          <Button variant={'contained'} color={'secondary'} disabled>
            Read more
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default FavoriteArticleCard;
