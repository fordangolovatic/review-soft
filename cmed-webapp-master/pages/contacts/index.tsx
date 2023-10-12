import { NextPage } from 'next';
import { PageWrapper } from '../../components';
import { CustomContainer } from '../../components/MuiCustom';

const Contacts: NextPage = () => {
  return (
    <PageWrapper>
      <CustomContainer sx={{ height: '500px' }}>Contacts</CustomContainer>
    </PageWrapper>
  );
};

export default Contacts;
