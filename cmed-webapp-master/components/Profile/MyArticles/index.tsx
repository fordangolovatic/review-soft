import { Divider, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useDoctorArticleQuery } from '../../../api/hooks/articles';
import { SkeletonCollection } from '../../SkeletonCollection';
import DoctorArticleCard from './components/DoctorArticleCard';
import SkeletonDoctorArticleCard from './components/SkeletonDoctorArticleCard';

const MyArticles = () => {
  const { t } = useTranslation();
  const { data: articles, isLoading: isArticlesLoading } = useDoctorArticleQuery();
  const hasArticles = articles && !!articles.length;

  return (
    <Stack minWidth={'100%'} minHeight={1040} height={'100%'}>
      <Stack>
        <SkeletonCollection
          isLoading={isArticlesLoading}
          skeleton={<SkeletonDoctorArticleCard />}
        >
          {!hasArticles && (
            <Typography mt={2} textAlign={'center'} variant={'h4'}>
              {t('b-noArticles')}
            </Typography>
          )}

          {hasArticles &&
            articles.map((article) => (
              <Stack
                className="doctor_article__item"
                width={'100%'}
                key={article.articleId}
                mt={{ sm: '20px' }}
              >
                <DoctorArticleCard article={article} />
                <Divider sx={{ marginTop: { sm: '20px' } }} flexItem />
              </Stack>
            ))}
        </SkeletonCollection>
      </Stack>
    </Stack>
  );
};

export default MyArticles;
