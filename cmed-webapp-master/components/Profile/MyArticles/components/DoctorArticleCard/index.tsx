import { Button, Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { FC, useState } from 'react';
import { useArticleDeleteMutation } from '../../../../../api/hooks/articles';
import { ArticleType } from '../../../../../api/service/article/fetchArticles';
import { Article } from '../../../../../api/types/articles';
import { useToast } from '../../../../../utilities/hooks/useToast';
import { ArticleModal } from '../../../../articles/Article/article-modal/ArticleModal';

interface DoctorArticleCardProps {
  article: Article;
}

const DoctorArticleCard: FC<DoctorArticleCardProps> = ({ article }) => {
  const { t } = useTranslation('profile');
  const queryClient = useQueryClient();
  const { notifySuccess } = useToast();
  const [editModal, setEditModal] = useState<boolean>(false);

  const { mutate: deleteArticleMutation } = useArticleDeleteMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['doctor_articles']);
      notifySuccess('Deleted article.');
    },
  });

  return (
    <Stack
      className="doctor_article"
      width={'100%'}
      direction={'row'}
      justifyContent={'space-between'}
    >
      <Stack className="doctor_article__content" gap={'8px'} direction={'row'}>
        {article.image && (
          <img
            className="doctor_article__content__image"
            src={article.image}
            style={{
              width: '8rem',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        )}

        <Stack
          className="doctor_article__content__container"
          gap={'8px'}
          justifyContent={'space-between'}
        >
          <Stack gap={'4px'}>
            <Typography variant={'h4'}>{article.title}</Typography>

            <Typography variant={'body1'}>{article.content}</Typography>
          </Stack>

          <Typography variant={'body2'} color={'#818181'}>
            {dayjs(article.createdAt).format('DD/MM/YYYY')}
          </Typography>
        </Stack>
      </Stack>

      <Stack className="doctor_article__content__controls" gap={'8px'}>
        <Link href={`/articles/${article.articleId}`} target={'_blank'}>
          <Button
            variant={'contained'}
            color={'secondary'}
            aria-label={t('ma-read') || 'Read'}
            fullWidth
          >
            {t('ma-read')}
          </Button>
        </Link>

        <Button
          variant={'contained'}
          color={'secondary'}
          aria-label={t('ma-edit') || 'Edit'}
          onClick={() => setEditModal(true)}
        >
          {t('ma-edit')}
        </Button>

        <Button
          variant={'contained'}
          aria-label={t('ma-delete') || 'Delete'}
          onClick={() => deleteArticleMutation(article.articleId)}
        >
          {t('ma-delete')}
        </Button>
      </Stack>

      <ArticleModal
        articleType={article.type as ArticleType}
        open={editModal}
        close={() => setEditModal(false)}
        editValues={article}
      />
    </Stack>
  );
};

export default DoctorArticleCard;
