import { Card, Link, Stack, Typography } from '@mui/material';

export const Recommendation = () => {
  return (
    <Card
      variant={'outlined'}
      sx={{ width: 'auto', height: 'max-content', padding: '20px' }}
    >
      <Stack gap={'20px'}>
        <Typography variant={'body1'}>Recommendation</Typography>

        {/*{recomendations.map((r) => (*/}
        {/*  <RecommendationElement*/}
        {/*    key={r.id}*/}
        {/*    props={r as RecommendationProps<unknown>}*/}
        {/*  />*/}
        {/*))}*/}

        <Link color={'#000'} sx={{ cursor: 'pointer' }}>
          See all recommendations
        </Link>
      </Stack>
    </Card>
  );
};
