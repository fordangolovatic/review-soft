import { Stack } from '@mui/material';

export const MobileRecommendation = () => {
  return (
    <Stack width={'100%'} sx={{ overflowX: 'scroll' }}>
      <Stack
        width={'max-content'}
        padding={'5px'}
        direction={'row'}
        gap={'20px'}
        sx={{ overflowX: 'hidden' }}
      >
        {/*{recomendations.map((recommendation) => (*/}
        {/*  <Card*/}
        {/*    variant={'outlined'}*/}
        {/*    key={recommendation.id}*/}
        {/*    sx={{ padding: '1rem', height: 'min-content' }}*/}
        {/*  >*/}
        {/*    <RecommendationElement*/}
        {/*      key={recommendation.id}*/}
        {/*      props={recommendation as RecommendationProps<unknown>}*/}
        {/*    />*/}
        {/*  </Card>*/}
        {/*))}*/}
      </Stack>
    </Stack>
  );
};
