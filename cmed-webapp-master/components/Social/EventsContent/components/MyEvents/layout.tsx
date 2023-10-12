import { Box, Stack } from '@mui/material';
import { FC, ReactNode, useState } from 'react';
import { SocialLayout } from '../../../Layout';
import { Sidebar } from '../Sidebar';
import { MyEvents } from './index';

export interface EventsSelectedComponent {
  id: number;
  Component: FC;
}
interface EventsLayoutProps {
  children: ReactNode;
  onChangeMenu?: ({ id, Component }: EventsSelectedComponent) => void;
}
export const EventsLayout: FC<EventsLayoutProps> = ({ children, onChangeMenu }) => {
  const [selectedMenu, setSelectedMenu] = useState<EventsSelectedComponent>({
    id: 1,
    Component: MyEvents,
  });
  const onChangeSelectedMenu = ({ id, Component }: EventsSelectedComponent) => {
    setSelectedMenu({ id, Component });
    onChangeMenu && onChangeMenu({ id, Component });
  };

  return (
    <SocialLayout>
      <Stack
        spacing={{ sm: '20px', xl: '30px' }}
        direction={'row'}
        flex={1}
        py={{ sm: '35px', xl: '75px' }}
      >
        <Box maxWidth={{ sm: '230px', xl: '300px' }} width={'100%'}>
          <Sidebar selectedMenu={selectedMenu} onChangeMenu={onChangeSelectedMenu} />
        </Box>
        <Box
          sx={{
            border: '1px solid #EFEFEF',
            backgroundColor: 'white',
            borderRadius: '10px',
          }}
          flex={1}
          p={'40px 30px'}
        >
          {children}
        </Box>
      </Stack>
    </SocialLayout>
  );
};
