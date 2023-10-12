import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { useSpecialitiesQuery } from '../../../api/hooks/specialities/useSpecialitiesQuery';
import departments from '../../../utilities/data/Departments';
import { normalizeString } from '../../../utilities/functions';
import { Breadcrumb } from '../../Breadcrumb';
import { findButton } from '../Doctors/components/DoctorsInformation/styled/find';

export const DepartmentsCards: FC = () => {
  const { asPath } = useRouter();
  const { data: specialities } = useSpecialitiesQuery();
  const [limit, setLimit] = useState(12);
  const { t } = useTranslation('common');
  const translation = {
    title: t('ds-title'),
    _title: t('ds-_title'),
  };

  const combinedIconsAndDepartments = specialities?.map((speciality) => {
    const icon = departments.items?.find((department) => {
      return department.id === speciality.specialityId;
    })?.icon;

    return {
      ...speciality,
      icon,
    };
  });
  const onMore = (): void => {
    if ((specialities ?? [])?.length > limit) {
      setLimit((prevState) => prevState + 12);
    }
  };

  return (
    <>
      <Box padding={'30px 0 40px 0'}>
        <Breadcrumb />
      </Box>
      <Stack pb={'40px'}>
        <Typography variant={'h4'} color={'secondary.dark'}>
          <Box fontWeight="fontWeightMedium">{translation._title}</Box>
        </Typography>
        <Stack alignItems={'center'}>
          <Grid
            mt={{ sm: '40px', xl: '60px' }}
            id={'departments-list'}
            spacing={'26px'}
            container
            direction={'row'}
          >
            {combinedIconsAndDepartments?.slice(0, limit).map((department) => (
              <Grid
                key={department.specialityId}
                id={`department-option-${department.specialityId}`}
                item
                xs={3}
              >
                <Link
                  href={`${asPath}/${normalizeString(
                    department.specialityName || '',
                    'lower',
                  )}`}
                >
                  <Stack
                    height={{ sm: '140px', xl: '197px' }}
                    sx={{
                      border: '2px solid #00534C',
                      borderRadius: '20px',
                      '&:hover': {
                        backgroundColor: '#00534C',
                        '&>*, & path': {
                          color: 'white',
                          stroke: 'white',
                        },
                      },
                    }}
                    alignItems={'center'}
                    justifyContent={'center'}
                  >
                    {!department.icon ? (
                      <Typography>X</Typography>
                    ) : (
                      <department.icon />
                    )}
                    <Typography
                      textAlign={'center'}
                      variant={'subtitle2'}
                      color={'secondary.dark'}
                    >
                      {normalizeString(department.specialityName || '')}
                    </Typography>
                  </Stack>
                </Link>
              </Grid>
            ))}
          </Grid>
          <Box mt={'26px'}>
            <Button
              onClick={onMore}
              sx={findButton}
              component={'span'}
              variant={'outlined'}
            >
              {t('b-showMore')}
            </Button>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};
