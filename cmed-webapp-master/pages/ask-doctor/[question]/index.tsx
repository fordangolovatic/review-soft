import { Box, Stack } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuestionsQuery } from '../../../api/hooks/questions';
import { PageWrapper } from '../../../components';
import { QuestionPage } from '../../../components/AskDoctor/components';
import { QuestionSkeleton } from '../../../components/AskDoctor/components/QuestionCard/components/QuestionSkeleton';
import { Breadcrumb } from '../../../components/Breadcrumb';
import { CustomContainer } from '../../../components/MuiCustom';
import { SkeletonCollection } from '../../../components/SkeletonCollection';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale || '',
        ['common', 'homePage', 'departments'],
        null,
        ['en'],
      )),
    },
  };
};

const Question: NextPage = () => {
  const {
    query: { question: questionId },
  } = useRouter();

  const { data: questions, isLoading: isLoadingQuestion } = useQuestionsQuery();

  const question =
    questions?.filter(
      (question) => question?.questionId?.toString() === questionId,
    ) ?? [];

  return (
    <PageWrapper>
      <CustomContainer>
        <Stack>
          <Box my={'35px'}>
            <Breadcrumb />
          </Box>
          <SkeletonCollection
            isLoading={isLoadingQuestion}
            skeleton={<QuestionSkeleton />}
          >
            <QuestionPage {...question[0]} />
          </SkeletonCollection>
        </Stack>
      </CustomContainer>
    </PageWrapper>
  );
};

export default Question;
