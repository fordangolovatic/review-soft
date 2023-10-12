import { ContactsOutlined, StarBorderOutlined } from '@mui/icons-material';
import { Box, List, Stack, SvgIconTypeMap, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/types';
import React, { FC } from 'react';
import { EventsSelectedComponent } from '../../index';
import { Calendar } from '../Calendar';
import { MyEvents } from '../MyEvents';
import { MenuButton } from './components';

interface SidebarProps {
  selectedMenu: EventsSelectedComponent;
  onChangeMenu: ({ id, Component }: EventsSelectedComponent) => void;
}
export interface MenuItemsProps {
  id: number;
  title: string;
  Icon: OverridableComponent<SvgIconTypeMap>;
  Component: FC;
}
const menuItems: MenuItemsProps[] = [
  { id: 1, title: 'My Events', Icon: ContactsOutlined, Component: MyEvents },
  { id: 2, title: 'Calendar', Icon: StarBorderOutlined, Component: Calendar },
];
export const Sidebar: FC<SidebarProps> = ({ onChangeMenu, selectedMenu }) => {
  return (
    <Box
      sx={{
        border: '1px solid #EFEFEF',
        backgroundColor: 'white',
        borderRadius: '10px',
      }}
    >
      <Stack pb={'15px'} spacing={'10px'}>
        <Box p={'20px 0 0 20px'}>
          <Typography variant={'subtitle1'}>Events</Typography>
        </Box>
        <List>
          {menuItems.map((button) => (
            <MenuButton
              key={button.id}
              selectedMenu={selectedMenu}
              onChange={onChangeMenu}
              {...button}
            />
          ))}
        </List>
      </Stack>
    </Box>
  );
};
