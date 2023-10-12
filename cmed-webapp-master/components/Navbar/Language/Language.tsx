import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import useCustomTheme from '../../../utilities/hooks/useTheme';

const Language: FC = () => {
  const setCookie = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000; path=/`;
  };
  const { theme } = useCustomTheme();
  const route = useRouter();
  const { typography } = theme;
  const languages = [
    { id: 1, value: 'en', label: 'EN', icon: 'us' },
    { id: 2, value: 'ru', label: 'RU', icon: 'ru' },
    // { id: 3, value: 'ro', label: 'RO', icon: 'ro' },
    { id: 4, value: 'de', label: 'DE', icon: 'de' },
    // { id: 5, value: 'zh', label: 'ZH', icon: 'cn' },
    { id: 6, value: 'es', label: 'ES', icon: 'es' },
    // { id: 7, value: 'ar', label: 'AR', icon: 'ar' },
  ];

  const [language, setLanguage] = useState<string>(
    route.locale?.toUpperCase().toString() || languages[0].value,
  );

  useEffect(() => {
    const locale = language.toLowerCase();
    setCookie(locale);
    route.push(route.asPath, undefined, { locale });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
  };

  return (
    <Stack direction="row" alignItems="center" spacing="5px">
      {' '}
      <Select
        id={'language-switch'}
        labelId={'language-switch'}
        sx={{
          border: 'none',
          textAlign: 'center',
          '& .MuiSelect-icon': {
            display: 'none',
          },
          '& .MuiSelect-select': {
            '&:hover': { color: '#00A04A' },
            padding: '0px !important',
            ...typography.body1,
            color: '#000',
          },
        }}
        value={language}
        onChange={handleChange}
        variant="standard"
        renderValue={(selected) => selected}
      >
        {languages.map(({ id, label, icon }) => (
          <MenuItem
            key={id}
            value={label}
            id={`language-option-${label.toLowerCase()}`}
          >
            <Stack spacing={'14px'} direction="row">
              <Typography variant="body1">{label}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default Language;
