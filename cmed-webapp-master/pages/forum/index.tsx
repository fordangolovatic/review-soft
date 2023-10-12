import { NextPage } from 'next';
import { PageWrapper } from '../../components';
import { CustomContainer } from '../../components/MuiCustom';

const Forum: NextPage = () => {
  return (
    <PageWrapper>
      <CustomContainer sx={{ height: '500px' }}>Forum</CustomContainer>
    </PageWrapper>
  );
};

export default Forum;
