import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { Question as QuestionProps } from '../../types';
import { Footer, Title } from './components';
import { QuestionDetails } from './components/QuestionDetails';

export const Question: FC<QuestionProps> = ({
  content,
  speciality,
  language,
  title,
  questionId,
  createdBy,
  createdAt,
}) => {
  return (
    <Stack spacing={'15px'}>
      <QuestionDetails speciality={speciality} language={language} />

      <Title title={title} author={createdBy} />

      <Typography
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: '2',
          WebkitBoxOrient: 'vertical',
        }}
        variant={'body1'}
      >
        {content}
      </Typography>

      <Footer questionId={questionId} publishDate={createdAt} />
    </Stack>
  );
};
