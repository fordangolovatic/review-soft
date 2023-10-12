import { JSXElement } from '@babel/types';
import { Stack, Typography } from '@mui/material';
import React, { FC, ReactElement, useMemo } from 'react';
import { STextFieldInput } from '../../styled';

interface TextFieldInput {
  placeholder?: string;
  label?: string;
  select?: boolean;
  children?: ReactElement<JSXElement>[] | ReactElement;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, field?: string) => void;
  onBlur?: any;
  disabled?: boolean;
  name?: string;
  multiline?: boolean;
}

const TextFieldInput: FC<TextFieldInput> = ({
  value: initialValue = '',
  label,
  placeholder,
  select,
  children,
  disabled = false,
  onBlur,
  onChange,
  name,
  multiline = false,
}) => {
  const value: string = useMemo(() => {
    return initialValue;
  }, [initialValue]);

  return (
    <Stack width={'100%'} spacing={'10px'}>
      {label && (
        <Typography variant={'body2'} color={'secondary.dark'}>
          {label}
        </Typography>
      )}
      <STextFieldInput
        id={label?.toLowerCase().replace(/\s/g, '')}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        fullWidth
        multiline={multiline}
        select={select}
        disabled={disabled}
        sx={{
          '& .Mui-disabled[disabled]': {
            color: 'black',
          },
        }}
      >
        {children}
      </STextFieldInput>
    </Stack>
  );
};

export default TextFieldInput;
