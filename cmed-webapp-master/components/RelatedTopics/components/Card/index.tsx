import {
  BookmarkBorderOutlined,
  FavoriteBorderOutlined,
  SmsOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';
import { Box, Button, Icon, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Article } from '../../../../api/types/articles';

interface CardProps {
  article: Article;
}
const Card: FC<CardProps> = ({ article }) => {
  const { asPath } = useRouter();

  return (
    <Stack
      sx={{
        borderRadius: '10px',
        filter: 'drop-shadow(0px 0px 50px rgba(0, 0, 0, 0.07))',
      }}
      overflow={'hidden'}
      flex={1}
      bgcolor={'background.paper'}
    >
      <Box
        width={'100%'}
        height={{ sm: '182px', xl: '278px' }}
        position={'relative'}
      >
        {article?.speciality && (
          <Box
            bgcolor={'background.paper'}
            padding={'3px 7px'}
            borderRadius={'5px'}
            zIndex={1}
            position={'absolute'}
            left={'10px'}
            bottom={'10px'}
          >
            <Stack alignItems={'center'} spacing={'8px'} direction={'row'}>
              <Icon color={'secondary'}>
                <BookmarkBorderOutlined />
              </Icon>

              <Typography variant={'body1'} color={'secondary'}>
                {article?.speciality?.specialityName}
              </Typography>
            </Stack>
          </Box>
        )}

        <Box zIndex={1} position={'absolute'} right={'10px'} top={'10px'}>
          <Button
            sx={{
              borderRadius: '50px',
              padding: '5px',
              minWidth: '0',
            }}
            variant={'text'}
          >
            <Icon sx={{ color: grey[600] }}>
              <FavoriteBorderOutlined />
            </Icon>
          </Button>
        </Box>

        {!article?.image && (
          <Stack
            width={'100%'}
            height={'100%'}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{ background: grey[300], color: grey[800], userSelect: 'none' }}
          >
            <Typography variant={'h4'}>{article.title.toUpperCase()}</Typography>
          </Stack>
        )}

        {article?.image && (
          <Image src={article.image} alt={''} fill style={{ objectFit: 'cover' }} />
        )}
      </Box>

      <Stack padding={{ sm: '15px', xl: '20px' }}>
        <Stack spacing={'8px'}>
          <Typography variant={'h5'}>{'title'}</Typography>

          <Typography color={'gray'} variant={'body2'}>
            {'author'}
          </Typography>
        </Stack>

        <Box paddingY={'10px'}>
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            variant={'body1'}
            maxHeight={'54px'}
          >
            {article.content}
          </Typography>
        </Box>

        <Stack
          alignItems={'center'}
          direction={'row'}
          justifyContent={'space-between'}
          flexWrap={{ sm: 'wrap', xl: 'nowrap' }}
        >
          <Typography sx={{ color: grey[600] }} variant={'body2'}>
            {article.createdAt}
          </Typography>

          <Stack spacing={'3px'} alignItems={'center'} direction={'row'}>
            <Icon sx={{ color: grey[600] }}>
              <SmsOutlined />
            </Icon>

            <Typography sx={{ color: grey[600] }} variant={'body2'}>
              {'comments'}
            </Typography>
          </Stack>

          <Stack spacing={'3px'} alignItems={'center'} direction={'row'}>
            <Icon sx={{ color: grey[600] }}>
              <VisibilityOutlined />
            </Icon>

            <Typography sx={{ color: grey[600] }} variant={'body2'}>
              {'views'}
            </Typography>
          </Stack>

          <Box
            sx={{
              flexBasis: { sm: '100%', xl: 'auto' },
              marginTop: { sm: '10px', xl: '0' },
            }}
          >
            <Link href={`${asPath}/${''.replaceAll(' ', '-').toLowerCase()}`}>
              <Button
                sx={{ width: '100%' }}
                variant={'contained'}
                color={'secondary'}
              >
                <Typography variant={'body2'}>Read more</Typography>
              </Button>
            </Link>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Card;
