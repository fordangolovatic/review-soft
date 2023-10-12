import { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { EventContent } from '../../../../components/Social/EventsContent/components';

const article = {
  id: 1,
  title: 'New study shows benefits of acupuncture',
  isPrivate: false,
  date: 'MON, 25 JUN 2023, 17:00',
  body: 'A new study A new study has shown that acupuncture can be an effective treatA new study has shown that acupuncture can be an effective treatment for A new study has shown that acupuncture can be an effective treatment for chronic pain. The study followed patients over a period of sichronic pain. The study followed patients over a period of siment for chronic pain. The study followed patients over a period of sihas shown that acupuncture can be an effecA new study has shown that acupuncture can be an effective treatment for chronic pain. The study followed patients over a period of sitive treatment for chronic pain. The study followed patA new study has shown that acupuncture can be an effective treatment for chronic pain. The study followed patients over a period of siients over a period of six months and found that those who received regular acupuncture treatments reA new study has shown that acupuncture can be an effective treatment for chronic pain. The study followed patients over a period of siported a significant reduction in pain levels compared to those who did not receive acupuncture.',
};
const Event: NextPage = () => {
  return <EventContent article={article} />;
};

export default Event;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || '', ['common'], null, ['en'])),
    },
  };
};
