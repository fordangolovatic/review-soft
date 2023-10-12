import { Typography } from '@mui/material';
import { FC } from 'react';

interface PriceProps {
  consultationPrice: number;
}

export const Price: FC<PriceProps> = ({ consultationPrice }) => {
  return <Typography whiteSpace={'nowrap'}>{consultationPrice} $</Typography>;
};
