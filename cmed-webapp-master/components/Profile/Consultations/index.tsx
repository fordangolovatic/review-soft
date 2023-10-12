import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, ReactNode, SyntheticEvent, useState } from 'react';
import { AllConsultation } from './components';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
};

const tabProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export const Consultations: FC = () => {
  const { t } = useTranslation('profile');
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const translation = {
    all: t('c-allConsultation'),
    waiting: t('c-waiting'),
    canceled: t('c-canceled'),
    confirmed: t('c-confirmed'),
    completed: t('c-completed'),
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            textColor={'secondary'}
            indicatorColor={'secondary'}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label={translation.all} {...tabProps(0)} />
            <Tab label={translation.waiting} {...tabProps(1)} />
            <Tab label={translation.confirmed} {...tabProps(2)} />
            <Tab label={translation.canceled} {...tabProps(3)} />
            <Tab label={translation.completed} {...tabProps(4)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <AllConsultation />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AllConsultation filter={'pending'} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AllConsultation filter={'confirmed'} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <AllConsultation filter={'canceled'} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <AllConsultation filter={'completed'} />
        </TabPanel>
      </Box>
    </>
  );
};

export default Consultations;
