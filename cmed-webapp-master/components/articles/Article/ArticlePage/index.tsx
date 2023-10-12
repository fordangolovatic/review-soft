import { AspectRatio, VisibilityOutlined } from '@mui/icons-material';
import { Box, Divider, Icon, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import dayjs from 'dayjs';
import Image from 'next/image';
import React, { FC } from 'react';
import { Article } from '../../../../api/types/articles';
import {
  BookmarkIcon,
  CommentsIcon,
  LikeIcon,
  ShareIcon,
} from '../../../../utilities/icons/all';
import { Commentaries } from '../Commentaries';

export const ArticlePage: FC<Article> = ({ content, createdAt, image }) => {
  return (
    <Stack>
      <Stack spacing={'20px'}>
        <Typography variant={'h4'} color={'secondary'}>
          {/*  TODO: Need add title */}
          {'TD:Title'}
        </Typography>

        <Stack spacing={'20px'} direction={'row'} alignItems={'center'}>
          <Typography sx={{ color: grey[600] }} variant={'body1'}>
            {dayjs(createdAt).format('MM ddd - YYYY')}
          </Typography>

          <Stack spacing={'8px'} direction={'row'} alignItems={'center'}>
            <Icon sx={{ color: grey[600] }}>
              <VisibilityOutlined />
            </Icon>

            <Typography sx={{ color: grey[600] }} variant={'body1'}>
              {/*  TODO: Need add views */}
              {'TD:Views'}
            </Typography>
          </Stack>
        </Stack>

        <Stack spacing={'20px'} mt={'50px'}>
          {image && (
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '300px',
              }}
            >
              <Image
                src={image}
                alt={'bg'}
                fill
                style={{ objectFit: 'cover', borderRadius: '8px' }}
              />
            </Box>
          )}

          <Typography variant={'body1'}>{content}</Typography>
        </Stack>

        <Stack spacing={'12px'} alignItems={'center'} direction={'row'} mt={'30px'}>
          <Stack alignItems={'flex-end'} spacing={'8px'} direction={'row'}>
            <Icon sx={{ color: grey[600] }}>
              <LikeIcon />
            </Icon>

            <Typography sx={{ color: grey[600] }} variant={'body1'}>
              58 Likes
            </Typography>
          </Stack>

          <Stack alignItems={'flex-end'} spacing={'8px'} direction={'row'}>
            <Icon sx={{ color: grey[600] }}>
              <CommentsIcon />
            </Icon>

            <Typography sx={{ color: grey[600] }} variant={'body1'}>
              {/* TODO: Need add comments */}
              {'0 Comments'}
            </Typography>
          </Stack>

          <Stack alignItems={'flex-end'} spacing={'8px'} direction={'row'}>
            <Icon sx={{ color: grey[600] }}>
              <ShareIcon />
            </Icon>

            <Typography sx={{ color: grey[600] }} variant={'body1'}>
              Share
            </Typography>
          </Stack>

          <Stack alignItems={'flex-end'} spacing={'8px'} direction={'row'}>
            <Icon fontSize={'medium'} sx={{ color: grey[600] }}>
              <BookmarkIcon />
            </Icon>

            <Typography sx={{ color: grey[600] }} variant={'body1'}>
              Bookmark
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ margin: '35px 0' }} />

        <Commentaries commentsCount={0} />
      </Stack>
    </Stack>
  );
};
