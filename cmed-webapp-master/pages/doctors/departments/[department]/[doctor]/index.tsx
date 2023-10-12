import { Box, Stack } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useDoctorQuery } from '../../../../../api/hooks/doctors';
import { PageWrapper } from '../../../../../components';
import { Breadcrumb } from '../../../../../components/Breadcrumb';
import {
  Articles,
  ExperienceOfWork,
  ShortCV,
} from '../../../../../components/Departments/Doctor';
import ArticleSkeleton from '../../../../../components/Departments/Doctor/Articles/components/ArticleSkeleton';
import ExperienceSkeleton from '../../../../../components/Departments/Doctor/ExperienceOfWork/components/ExperienceSkeleton';
import { DoctorCard } from '../../../../../components/Departments/Doctors/components';
import DoctorSkeleton from '../../../../../components/Departments/Doctors/components/DoctorCard/components/DoctorSkeleton';
import LatestNews from '../../../../../components/LatestNews';
import { CustomContainer } from '../../../../../components/MuiCustom';
import { SkeletonCollection } from '../../../../../components/SkeletonCollection';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale || '',
        ['common', 'mti', 'doctors'],
        null,
        ['ru', 'es', 'de'],
      )),
    },
  };
};

const Doctor: NextPage = () => {
  const router = useRouter();

  const { doctor: doctorId } = router.query;

  const { data: doctor, isLoading: isDoctorLoading } = useDoctorQuery(
    Number(doctorId),
    { enabled: Boolean(doctorId) },
  );
  const professionalExperiences = useMemo(
    () => doctor?.professionalInfo.professionalExperiences ?? [],
    [doctor?.professionalInfo],
  );

  return (
    <PageWrapper>
      <CustomContainer>
        <Stack>
          <Box my={'35px'}>
            <Breadcrumb last={`${doctor?.firstName} ${doctor?.lastName}`} />

            <Stack spacing={{ sm: '30px', xl: '40px' }} mt={{ sm: '60px' }}>
              <SkeletonCollection
                isLoading={isDoctorLoading}
                skeleton={<DoctorSkeleton />}
              >
                {doctor && <DoctorCard doctor={doctor} isProfile />}
              </SkeletonCollection>

              <ShortCV content={doctor?.description} />

              <SkeletonCollection
                isLoading={isDoctorLoading}
                skeleton={
                  <>
                    <ExperienceSkeleton />
                    <ArticleSkeleton />
                  </>
                }
              >
                <ExperienceOfWork experience={professionalExperiences} />

                {doctor?.articles && (
                  <Box pt={2}>
                    <Articles
                      name={`${doctor.firstName} ${doctor.lastName}`}
                      articles={doctor.articles}
                    />
                  </Box>
                )}
              </SkeletonCollection>
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
