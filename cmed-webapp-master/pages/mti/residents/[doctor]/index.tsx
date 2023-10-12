import { Box, Stack } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useDoctorQuery } from '../../../../api/hooks/doctors';
import { PageWrapper } from '../../../../components';
import { Breadcrumb } from '../../../../components/Breadcrumb';
import {
  Articles,
  ExperienceOfWork,
  ShortCV,
} from '../../../../components/Departments/Doctor';
import { DoctorCard } from '../../../../components/Departments/Doctors/components';
import DoctorSkeleton from '../../../../components/Departments/Doctors/components/DoctorCard/components/DoctorSkeleton';
import LatestNews from '../../../../components/LatestNews';
import { CustomContainer } from '../../../../components/MuiCustom';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale || '',
        ['common', 'mti', 'doctors'],
        null,
        ['en'],
      )),
    },
  };
};

const Doctor: NextPage = () => {
  const router = useRouter();
  const { doctor: MTIQuery } = router.query;
  const MTIid = MTIQuery ? parseInt(MTIQuery.toString()) : 0;
  const { data: mti, isLoading: isMTILoading } = useDoctorQuery(MTIid, {
    enabled: MTIid !== 0,
  });
  const professionalExperiences = useMemo(
    () => mti?.professionalInfo.professionalExperiences || 0,
    [mti?.professionalInfo],
  );

  return (
    <PageWrapper>
      <CustomContainer>
        <Stack>
          <Box my={'35px'}>
            <Breadcrumb />
            <Stack spacing={{ sm: '30px', xl: '40px' }} mt={{ sm: '60px' }}>
              {isMTILoading ? (
                <DoctorSkeleton />
              ) : (
                mti && <DoctorCard doctor={mti} isProfile />
              )}
              <ShortCV />
              {professionalExperiences && (
                <ExperienceOfWork experience={professionalExperiences} />
              )}
              {mti?.articles && (
                <Articles
                  name={`${mti.firstName} ${mti.lastName}`}
                  articles={mti.articles}
                />
              )}
              {/* NOTE: This is temporary disabled  */}
              {/* <Reviews /> */}
            </Stack>
            <Box mt={'50px'}>
              <LatestNews />
            </Box>
          </Box>
        </Stack>
      </CustomContainer>
    </PageWrapper>
  );
};

export default Doctor;
