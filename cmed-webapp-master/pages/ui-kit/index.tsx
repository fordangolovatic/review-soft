import { Box, Button, Typography } from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';

const UiKit: NextPage = () => {
  return (
    <>
      <Head>
        <title>UI-Overview</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Typography variant="h4" mb="30px">
        UI-Kit Overview
      </Typography>

      <Box p="20px" bgcolor="aquamarine" width="fit-content">
        <Typography variant="body1" mb="20px">
          Buttons
        </Typography>
        <Button variant="contained">123</Button>
        <Button variant="text">123</Button>
        <Button variant="outlined">123</Button>
        <Typography variant="subtitle1">Small</Typography>
        <Button size="small" variant="contained">
          123
        </Button>
        <Button size="small" variant="text">
          123
        </Button>
        <Button color="secondary" size="small" variant="outlined">
          123
        </Button>
        <Typography variant="subtitle1">Medium</Typography>
        <Button size="medium" variant="contained">
          123
        </Button>

        <Button size="medium" variant="text">
          123
        </Button>
        <Button size="medium" variant="outlined">
          123
        </Button>
        <Typography variant="subtitle1">Large</Typography>
        <Button size="large" variant="contained">
          123
        </Button>

        <Button size="large" variant="text">
          123
        </Button>
        <Button size="large" variant="outlined">
          123
        </Button>
      </Box>
    </>
  );
};

export default UiKit;
