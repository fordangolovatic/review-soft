import { BookmarkBorderOutlined } from '@mui/icons-material';
import { Box, Button, Icon, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { FC } from 'react';
import { Article } from '../../../../api/types/articles';

interface LatestNewsProps {
  article: Article;
  index?: number;
}
const LatestNewsCard: FC<LatestNewsProps> = ({ article, index }) => {
  const { t } = useTranslation('common');

  const { image, title, speciality, createdAt, createdBy, content, language } =
    article;

  return (
    <Stack
      id={`article-${index}`}
      sx={{
        borderRadius: '10px',
        filter: 'drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.07))',
      }}
      flex={1}
      bgcolor={'background.paper'}
      overflow={'hidden'}
    >
      <Box
        width={'100%'}
        height={{ sm: '182px', xl: '278px' }}
        position={'relative'}
      >
        {image ? (
          <Image src={image ?? ''} alt={'articleImage'} fill />
        ) : (
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
      <Stack padding={{ sm: '20px' }}>
        <Stack spacing={'8px'}>
          <Stack alignItems={'center'} spacing={'8px'} direction={'row'}>
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
          <Typography variant={'h5'}>{title}</Typography>
          <Typography color={'gray'} variant={'body2'}>
            {/* TODO - Radu, why does this come null from BE */}
            {`${createdBy?.firstName} ${createdBy?.lastName}`}
          </Typography>
        </Stack>
        <Stack
          mt={{ sm: '20px' }}
          alignItems={'center'}
          direction={'row'}
          justifyContent={'space-between'}
        >
          <Typography color={'gray'} variant={'body2'}>
            {dayjs(article.createdAt).format('D MMM, ddd')}
          </Typography>
          {/*<Link href={`articles/${article.articleId}`}>*/}
          <Button
            disabled
            variant={'contained'}
            sx={{ padding: { sm: '8px 19px' } }}
            color={'secondary'}
          >
            {t('b-readMore')}
          </Button>
          {/*</Link>*/}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LatestNewsCard;
