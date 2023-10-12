import { NextPage } from 'next';
import { PageWrapper } from '../../components';
import { CustomContainer } from '../../components/MuiCustom';

const Privacy: NextPage = () => {
  return (
    <PageWrapper>
      <CustomContainer sx={{ height: '500px' }}>Privacy</CustomContainer>
    </PageWrapper>
  );
};

export default Privacy;
