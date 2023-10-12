import { Box, Pagination, Stack, Typography } from '@mui/material';
import { ChangeEvent, FC, useMemo, useState } from 'react';
import { useQuestionsQuery } from '../../api/hooks/questions';
import { SkeletonCollection } from '../SkeletonCollection';
import { AddQuestionModal, Question, Title } from './components';
import AskSkeleton from './components/AskSkeleton';

export const QuestionsList: FC = () => {
  const [bookModalOpen, setOpenBookModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const { data: questions, isLoading: isLoadingQuestions } = useQuestionsQuery();

  const handleChangePage = (event: ChangeEvent<unknown>, value: number): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(value);
  };

  const reverseQuestions = useMemo(() => {
    return questions?.reverse?.();
  }, [questions]);

  const startQuestionsPerPage = (page - 1) * 4;
  const endQuestionPerPage = startQuestionsPerPage + 4;

  const filteredQuestions = useMemo(
    () => reverseQuestions?.slice(startQuestionsPerPage, endQuestionPerPage) ?? [],
    [reverseQuestions, startQuestionsPerPage, endQuestionPerPage],
  );

  const hasQuestions = filteredQuestions.length > 0;

  return (
    <Stack spacing={'40px'} width={'100%'}>
      <Title openModal={() => setOpenBookModal(true)} />
      <Stack spacing={'40px'} height={740}>
        {!hasQuestions && !isLoadingQuestions ? (
          <Stack height={'300px'} alignItems={'center'} justifyContent={'center'}>
            <Typography variant={'body2'}>
              Sorry, there are no results that match your selected filters. Please
              try again with different filters.
            </Typography>
          </Stack>
        ) : (
          <SkeletonCollection
            isLoading={isLoadingQuestions}
            skeleton={<AskSkeleton />}
          >
            {filteredQuestions.map((question, index) => (
              <Box pt={2.5} key={index}>
                <Box p={2} border={'1px solid rgba(1,1,1,0.2)'} borderRadius="12px">
                  <Question key={question.questionId} {...question} />
                </Box>
              </Box>
            ))}
          </SkeletonCollection>
        )}
      </Stack>
      {bookModalOpen && (
        <AddQuestionModal
          open={bookModalOpen}
          close={() => setOpenBookModal(false)}
        />
      )}
      <Stack width={'100%'} mt={2} justifyContent={'center'} alignItems={'center'}>
        <Pagination
          count={questions && Math.ceil(questions.length / 4)}
          onChange={handleChangePage}
          page={page}
          color={'secondary'}
          hidePrevButton
          hideNextButton
        />
      </Stack>
    </Stack>
  );
};
