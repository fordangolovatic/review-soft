import { NextPage } from 'next';
import { PageWrapper } from '../../components';
import { CustomContainer } from '../../components/MuiCustom';

const ForPatients: NextPage = () => {
  return (
    <PageWrapper>
      <CustomContainer sx={{ height: '500px' }}>For Patients</CustomContainer>
    </PageWrapper>
  );
};

export default ForPatients;
