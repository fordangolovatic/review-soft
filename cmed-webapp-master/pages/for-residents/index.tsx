import { NextPage } from 'next';
import { PageWrapper } from '../../components';
import { CustomContainer } from '../../components/MuiCustom';

const ForResidents: NextPage = () => {
  return (
    <PageWrapper>
      <CustomContainer sx={{ height: '500px' }}>For Residents</CustomContainer>
    </PageWrapper>
  );
};

export default ForResidents;
