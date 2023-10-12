import { Box, Button, Grid, Stack, styled, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React, { FC } from 'react';
import { useSpecialitiesQuery } from '../../../api/hooks/specialities/useSpecialitiesQuery';
import { useGlobalState } from '../../../utilities/global-state';
import { Icons } from '../../../utilities/icons';
import { CustomContainer } from '../../MuiCustom';
import { SkeletonCollection } from '../../SkeletonCollection';
import styles from './Department.module.css';
import { DepartmentsSkeleton } from './DepartmentsSkeleton';

const Card = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    height: '267px',
  },
  [theme.breakpoints.up('sm')]: {
    height: '251px',
  },
  [theme.breakpoints.up('md')]: {
    height: '251px',
  },
  [theme.breakpoints.up('xl')]: {
    height: '378px',
  },
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: '#000',
  borderRadius: '30px',
}));
export const Departments: FC = () => {
  const { data: specialities, isLoading: isLoadingSpecialities } =
    useSpecialitiesQuery();
  const { filters, setFilters } = useGlobalState();

  const { t } = useTranslation('homePage');

  return (
    <CustomContainer>
      <Box mt={{ xs: '475px', sm: '53px' }}>
        <Stack alignItems={'center'}>
          <Typography
            variant={'h4'}
            color={'secondary.dark'}
            maxWidth={{ xs: '357px', sm: '100%' }}
            textAlign={'center'}
          >
            <Box fontWeight="fontWeightMedium">{t('departmentSubTitle')}</Box>
          </Typography>
          <Box mt={{ xs: '20px', sm: '41px', xl: '66px' }} sx={{ width: '100%' }}>
            <SkeletonCollection
              skeleton={<DepartmentsSkeleton />}
              isLoading={isLoadingSpecialities}
            >
              <Grid container spacing={{ xs: '4px', sm: '2px', xl: '4px' }}>
                {specialities?.slice(0, 4).map((specialty) => (
                  <Grid key={specialty.specialityId} item xs={12} sm={6}>
                    <Link
                      onClick={() =>
                        setFilters({
                          ...filters,
                          specialities: [
                            {
                              id: specialty.specialityId,
                              label: specialty.specialityName,
                              value: specialty.specialityName,
                            },
                          ],
                        })
                      }
                      href={`/doctors/departments/${specialty.specialityName
                        .toLowerCase()
                        .replaceAll(/[ /]/g, '-')}`}
                    >
                      <Card>
                        <img
                          className={styles.cardImage}
                          src={
                            'https://www.marshfieldclinic.org/imagecatalog/Division%20of%20Education/Dermatology-Residents.jpg'
                          }
                          alt={'bg'}
                        />
                        <Stack
                          alignItems={'center'}
                          direction={'row'}
                          justifyContent={'space-between'}
                          sx={{
                            position: 'absolute',
                            left: '40px',
                            bottom: { xl: '40px', xs: '30px' },
                            right: { xl: '40px', xs: '35px' },
                          }}
                        >
                          <Typography color={'white'} variant="subtitle2">
                            {t(
                              `common:sp-${specialty.specialityName.toLowerCase()}`,
                            )}
                          </Typography>
                          <Box
                            width={{ xl: '40px', xs: '20px' }}
                            height={{ xl: '40px', xs: '20px' }}
                            sx={{ '& svg': { width: '100%', height: '100%' } }}
                          >
                            <Icons.ArrowDepartment />
                          </Box>
                        </Stack>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </SkeletonCollection>
          </Box>
          <Button
            sx={{
              padding: { xs: '20px 0', sm: '13px 43px', xl: '20px 67.5px' },
              mt: { xs: '20px', sm: '39px', xl: '59px' },
              width: { xs: '100%', sm: 'fit-content' },
            }}
            href={'/doctors/departments'}
            variant={'outlined'}
          >
            {t('common:showMore')}
          </Button>
        </Stack>
      </Box>
    </CustomContainer>
  );
};
