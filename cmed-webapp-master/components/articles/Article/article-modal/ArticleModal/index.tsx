import { Box, Modal, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useQueryClient } from '@tanstack/react-query';
import { Formik, FormikValues } from 'formik';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useArticleCreateMutation,
  useArticleUpdateMutation,
} from '../../../../../api/hooks/articles';
import { ARTICLES_QUERY_KEY } from '../../../../../api/hooks/articles/useArticlesQuery';
import { ArticleType } from '../../../../../api/service/article/fetchArticles';
import { Article } from '../../../../../api/types/articles';
import { useToast } from '../../../../../utilities/hooks/useToast';
import { ActionButtons } from '../ArticleModalActions';
import { Category } from '../Category';
import { Content } from '../Content';
import { Language } from '../Language';
import { Title } from '../Title';

interface ArticleModalProps {
  open: boolean;
  close: () => void;
  articleType: ArticleType;
  editValues?: Article;
}

export const ArticleModal: FC<ArticleModalProps> = ({
  open,
  close,
  articleType,
  editValues,
}) => {
  const { t } = useTranslation('articles');
  const queryClient = useQueryClient();
  const { notifySuccess } = useToast();

  const { mutate: addArticleMutation } = useArticleCreateMutation({
    onSuccess: () => {
      close?.();
      notifySuccess('Your question has been successfully created.');
      return queryClient.invalidateQueries(ARTICLES_QUERY_KEY);
    },
  });

  const { mutate: updateArticleMutation } = useArticleUpdateMutation({
    onSuccess: () => {
      close?.();
      notifySuccess('Updated article.');
      return queryClient.invalidateQueries(['doctor_articles']);
    },
  });

  const handleSubmit = useCallback(
    (values: FormikValues) => {
      const { content, type, image, speciality, language, title } = values;

      editValues
        ? updateArticleMutation({
            articleId: editValues.articleId,
            content,
            type,
            image,
            specialityId: speciality?.specialityId || null,
            languageId: language?.languageId || null,
            title,
          })
        : addArticleMutation({
            content,
            type,
            image,
            specialityId: speciality?.specialityId,
            languageId: language?.languageId,
            title,
          });
    },
    [addArticleMutation, updateArticleMutation],
  );

  const initialValues = {
    type: articleType,
  };

  return (
    <Modal open={open} onClose={close}>
      <Formik initialValues={editValues || initialValues} onSubmit={handleSubmit}>
        {({ dirty, ...formikProps }) => (
          <form
            id="article-addArticle-form"
            onSubmit={(e) => {
              e.preventDefault();
              formikProps.handleSubmit(e);
            }}
          >
            <Stack height={'100vh'} alignItems={'center'} justifyContent={'center'}>
              <Box
                maxWidth={'700px'}
                width={'100%'}
                bgcolor={'background.paper'}
                borderRadius={'10px'}
                padding={'30px 40px'}
              >
                <Stack>
                  <Typography
                    mb={{ sm: '30px', xl: '40px' }}
                    color={'primary'}
                    variant={'h4'}
                  >
                    {t('addArticle')}
                  </Typography>

                  <Stack spacing={'20px'}>
                    <Stack spacing={'10px'}>
                      <Typography sx={{ color: grey[600] }} variant={'subtitle1'}>
                        {t('filterDescription')}
                      </Typography>

                      <Stack direction={'row'} spacing={'20px'}>
                        <Category {...formikProps} />

                        <Language {...formikProps} />
                      </Stack>
                    </Stack>

                    <Title {...formikProps} />

                    <Content {...formikProps} />

                    <ActionButtons onClose={close} dirty={dirty} {...formikProps} />
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </form>
        )}
      </Formik>
    </Modal>
  );
};
