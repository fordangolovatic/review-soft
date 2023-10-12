import { Button, Grid, Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { Article } from '../../../../../../../api/types/social-media';
import { EventCard } from '../EventCard';

const articles: Article[] = [
  {
    id: 1,
    title: 'New study shows benefits of acupuncture',
    isPrivate: false,
    date: 'MON, 25 JUN 2023, 17:00',
    body: 'A new study has shown that acupuncture can be an effective treatment for chronic pain. The study followed patients over a period of six months and found that those who received regular acupuncture treatments reported a significant reduction in pain levels compared to those who did not receive acupuncture.',
  },
  {
    id: 2,
    title: 'The pros and cons of medical marijuana',
    isPrivate: true,
    date: 'THU, 28 JUL 2023, 13:45',
    body: 'Medical marijuana has been a hotly debated topic in recent years. While some studies have shown that it can be an effective treatment for certain conditions, others have raised concerns about the potential risks and side effects. It is important for patients to carefully consider the pros and cons before deciding to use medical marijuana.',
  },
  {
    id: 3,
    title: "New drug shows promise for treating Alzheimer's",
    isPrivate: false,
    date: 'TUE, 16 AUG 2023, 10:30',
    body: "A new drug has shown promise in early clinical trials for treating Alzheimer's disease. The drug works by targeting beta-amyloid, a protein that is thought to play a role in the development of the disease. While more research is needed, the results are encouraging for those affected by Alzheimer's.",
  },
  {
    id: 4,
    title: 'The importance of sleep for mental health',
    isPrivate: true,
    date: 'FRI, 22 SEP 2023, 08:15',
    body: 'Sleep is essential for both physical and mental health. Research has shown that getting enough sleep can improve mood, cognitive function, and overall well-being. Conversely, chronic sleep deprivation can lead to a range of mental health issues, including depression and anxiety.',
  },
  {
    id: 5,
    title: 'The dangers of prescription drug abuse',
    isPrivate: false,
    date: 'MON, 30 OCT 2023, 16:00',
    body: "Prescription drug abuse is a growing problem in many countries. While prescription drugs can be effective for treating pain and other conditions, they can also be highly addictive and have serious side effects. It is important for patients to follow their doctor's instructions carefully and to be aware of the potential risks associated with prescription drugs.",
  },
  {
    id: 6,
    title: 'The role of diet in managing diabetes',
    isPrivate: true,
    date: 'WED, 15 NOV 2023, 11:45',
    body: 'Diet plays a crucial role in managing diabetes. People with diabetes need to be mindful of their carbohydrate intake and choose foods that are low in sugar and high in fiber. They should also avoid processed foods and focus on whole, nutrient-dense foods like fruits, vegetables, and lean protein sources.',
  },
];

export const RecomendationEvents: FC = () => {
  const [limit, setLimit] = useState<number>(4);
  const onMore = (): void => setLimit((prevState) => prevState + 4);
  return (
    <Stack spacing={'20px'}>
      <Typography variant={'h4'}>Recommendation Events</Typography>
      <Grid spacing={1} container>
        {articles.slice(0, limit).map((article) => (
          <Grid key={article.id} item xs={6}>
            <EventCard article={article} />
          </Grid>
        ))}
      </Grid>
      <Stack alignItems={'center'}>
        <Button
          onClick={onMore}
          color={'primary'}
          variant={'outlined'}
          sx={{ padding: '10px 15px' }}
        >
          Show more
        </Button>
      </Stack>
    </Stack>
  );
};
