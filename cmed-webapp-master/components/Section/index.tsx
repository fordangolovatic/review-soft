import React, { FC } from 'react';
import { Loading } from '../index';

type SectionProps = {
  isLoading?: boolean;
  children: any;
};

export const Section: FC<SectionProps> = ({ isLoading, children }) => {
  if (isLoading) {
    return <Loading suppressHydrationWarning={true} />;
  }

  return children;
};
