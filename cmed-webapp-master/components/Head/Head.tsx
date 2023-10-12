import Head from 'next/head';
import React, { FC } from 'react';

export const GlobalHead: FC = () => {
  return (
    <Head>
      <title>ClickMedicus</title>
      <meta name="description" content="" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
