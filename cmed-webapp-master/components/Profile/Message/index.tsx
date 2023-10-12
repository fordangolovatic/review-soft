import { Box, Button, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, ReactNode, SyntheticEvent, useEffect, useState } from 'react';
import { useMetadataQuery } from '../../../api/hooks/metadata';
import { Inbox, OpenedMessage, WriteMessageModal } from './components';
import { useReadMessagesMutation } from './hooks';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

export interface TabProps {
  onChangeMessage: (messageId: number) => void;
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

const Message: FC = () => {
  const { t } = useTranslation('common');
  const { data: metadata } = useMetadataQuery();
  const [value, setValue] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState<number | null>();
  const [writeMessage, setWriteMessage] = useState<boolean>(false);
  const { mutate: readMesssageMutation } = useReadMessagesMutation();

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!selectedMessage) return;

    readMesssageMutation(selectedMessage);
  }, [selectedMessage]);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            textColor={'secondary'}
            indicatorColor={'secondary'}
            value={value}
            onClick={() => setSelectedMessage(undefined)}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label={t('profile:msg-inbox')} {...tabProps(0)} />
            {metadata?.accountType === 'doctor' && (
              <Stack justifyContent={'center'} ml={'auto'}>
                <Button
                  name={'write-message-modal'}
                  onClick={() => setWriteMessage(true)}
                  color={'secondary'}
                  variant={'outlined'}
                >
                  {t('b-writeMessage')}
                </Button>
              </Stack>
            )}
          </Tabs>
        </Box>
        {!selectedMessage ? (
          <>
            <TabPanel value={value} index={0}>
              <Inbox onChangeMessage={setSelectedMessage} />
            </TabPanel>
          </>
        ) : (
          <OpenedMessage
            close={() => setSelectedMessage(undefined)}
            id={selectedMessage}
          />
        )}
      </Box>
      {writeMessage && metadata?.accountType === 'doctor' && (
        <WriteMessageModal
          open={writeMessage}
          onClose={() => setWriteMessage(false)}
        />
      )}
    </>
  );
};

export default Message;
