import { NextPage } from 'next';
import { CustomContainer } from '../../components/MuiCustom';
import { PageWrapper } from '../../components/PageWrapper';

const Analysis: NextPage = () => {
  return (
    <PageWrapper>
      <CustomContainer sx={{ height: '500px' }}>Analysis</CustomContainer>
    </PageWrapper>
  );
};

export default Analysis;
