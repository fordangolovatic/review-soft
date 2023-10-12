import { Box, Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React, { FC, useMemo } from 'react';

import { formatDepartment } from '../../../utilities/functions';
import { useGlobalState } from '../../../utilities/global-state';
import useCustomTheme from '../../../utilities/hooks/useTheme';

import { FilterOption } from '../../FiltersCollection/components/CollapseMenu';
import { SelectCountries, SelectLanguages, SelectSpecialities } from './components';

import styles from './SearchForm.module.css';

export interface FilterOptions {
  specialities: FilterOption[];
  languages: FilterOption[];
  countries: FilterOption[];
}

const SearchForm: FC = () => {
  const { filters } = useGlobalState();
  const { t } = useTranslation('homePage');
  const { theme } = useCustomTheme();
  const { breakpoints } = theme;

  const hrefToDepartments = useMemo(() => {
    return filters.specialities?.[0]?.value;
  }, [filters]);

  return (
    <Box
      bgcolor={'secondary.dark'}
      sx={{
        [breakpoints.down('sm')]: {
          position: 'absolute',
          padding: '20px 15px',
          borderRadius: '20px',
          top: '700px',
          left: '0',
          right: '0',
        },
        [breakpoints.up('sm')]: {
          p: '31px 35px 34px 35px',
          position: 'absolute',
          left: '-10px',
          right: '-10px',
          borderRadius: '40px',
          minWidth: '100%',
          bottom: '-93px',
        },
        [breakpoints.up('xs')]: {},
        [breakpoints.up('md')]: {},
        [breakpoints.up('xl')]: {
          left: '-27px',
          right: '-27px',
          p: '40px 50px 50px 50px',
          bottom: '-146px',
        },
      }}
    >
      <Typography
        mb={{ xs: '26px', sm: '10px', xl: '28px' }}
        color="white"
        variant="h3"
        textAlign={{ xs: 'center', sm: 'inherit' }}
      >
        {t('searchTitle')}
      </Typography>
      <Stack
        className={styles.searchFormInput}
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="flex-end"
        gap={{ xs: '14px', sm: '1px' }}
      >
        <SelectSpecialities />
        <SelectLanguages />
        <SelectCountries />
        <Link
          href={`/doctors/departments/${
            hrefToDepartments ? formatDepartment(hrefToDepartments) : ''
          }`}
        >
          <Button
            sx={{
              height: 'fit-content',
              padding: { xs: '18.5px 0', sm: '12.5px 31.5px', xl: '20px 50px' },
              ml: '17px',
              flex: '1 0 auto',
              width: { xs: '100%', sm: 'fit-content' },
              mt: { xs: '16px', sm: '0px' },
              whiteSpace: 'nowrap',
            }}
            variant="contained"
          >
            {t('common:b-findSpecialist')}
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};
export default SearchForm;
