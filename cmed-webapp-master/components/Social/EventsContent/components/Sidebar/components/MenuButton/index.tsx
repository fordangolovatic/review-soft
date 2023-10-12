import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { FC } from 'react';
import { EventsSelectedComponent } from '../../../../index';
import { MenuItemsProps } from '../../index';

interface MenuButtonProps extends MenuItemsProps {
  selectedMenu: EventsSelectedComponent;
  onChange: ({ id, Component }: EventsSelectedComponent) => void;
}
export const MenuButton: FC<MenuButtonProps> = ({
  selectedMenu,
  onChange,
  title,
  id,
  Icon,
  Component,
}) => {
  return (
    <ListItemButton
      disabled={id === 2}
      sx={{ gap: '10px' }}
      onClick={() =>
        onChange({
          id,
          Component,
        })
      }
    >
      <ListItemIcon
        sx={{
          minWidth: 'fit-content',
          color: selectedMenu.id === id ? '#00A04A' : grey[600],
        }}
      >
        <Icon />
      </ListItemIcon>
      <ListItemText
        sx={{ color: selectedMenu.id === id ? '#00A04A' : grey[600] }}
        primary={title}
      />
    </ListItemButton>
  );
};
