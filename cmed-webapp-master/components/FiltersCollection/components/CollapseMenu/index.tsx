import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Checkbox,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  SvgIconTypeMap,
} from '@mui/material';
import { OverridableComponent } from '@mui/types';
import { useTranslation } from 'next-i18next';
import { FC, useCallback, useEffect, useState } from 'react';
import { useGlobalState } from '../../../../utilities/global-state';
import { checkBox, collapseButton } from '../../styled';

export type FilterOption = {
  id: number;
  label: string;
  value: string;
  translateKey?: string;
};

export type SetFilterOption = { [k: string]: FilterOption[] };

export enum SortOptions {
  FAVORITE = 'FAVORITE',
  RATING = 'RATING',
  EXPERIENCE = 'EXPERIENCE',
  PRICE = 'PRICE',
}

interface CollapsedMenuProps {
  id?: number;
  title: string;
  isLoading?: boolean;
  items?: FilterOption[];
  Icon: OverridableComponent<SvgIconTypeMap>;
  initialValues?: FilterOption[];
  onSelect?: (filters: FilterOption[]) => void;
}

export const CollapsedMenu: FC<CollapsedMenuProps> = ({
  title,
  items,
  initialValues,
  Icon,
  onSelect,
}) => {
  const { t } = useTranslation('common');
  const { filters } = useGlobalState();
  const [selectedItems, setSelectedItems] = useState<FilterOption[]>(
    initialValues ?? [],
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (initialValues?.length) {
      setOpen(true);
    }
  }, [initialValues]);

  useEffect(() => {
    const activeFilters = Object.values(filters)
      .filter((activeFilter) => !!activeFilter?.length)
      .flatMap((selectedFilter) => selectedFilter.map((filter) => filter.value));

    setSelectedItems(
      selectedItems.filter((filter) => activeFilters.includes(filter.value)),
    );
  }, [filters]);

  const handleClick = useCallback((): void => {
    setOpen(!open);
  }, [open]);

  const isFilterSelected = useCallback(
    (item: FilterOption): boolean => {
      return Boolean(
        selectedItems.some((selectedItem) => selectedItem.id === item.id),
      );
    },
    [selectedItems],
  );

  const handleSelect = useCallback(
    (item: FilterOption): void => {
      if (isFilterSelected(item)) {
        const updatedItems: FilterOption[] = selectedItems.filter(
          (selectedItem) => selectedItem.id !== item.id,
        );
        setSelectedItems(updatedItems);
        onSelect?.(updatedItems);
        return;
      }

      setSelectedItems([...selectedItems, item]);
      onSelect?.([...selectedItems, item]);
    },
    [isFilterSelected, onSelect, selectedItems],
  );

  const memoizedTranslate = useCallback(
    (translateKey?: string, label?: string) => {
      return t(`${translateKey}${label?.toLowerCase().replaceAll(' ', '')}`);
    },
    [t],
  );

  return (
    <>
      <ListItemButton
        id={`collapse-menu-${title.toLowerCase()}`}
        divider
        sx={collapseButton}
        disableGutters
        onClick={handleClick}
      >
        <Icon color={'darkGreen'} />
        <ListItemText sx={{ marginLeft: '8px' }} primary={t(title.toLowerCase())} />
        {open ? (
          <ExpandLess color={'darkGreen'} />
        ) : (
          <ExpandMore color={'darkGreen'} />
        )}
      </ListItemButton>
      <Collapse
        sx={{ height: '100%', maxHeight: '200px', overflow: 'scroll' }}
        timeout="auto"
        unmountOnExit
        in={open}
      >
        <List id={'collapse-menu-list'} component="div" disablePadding>
          {items?.map((item) => (
            <ListItemButton
              id={`collapse-menu-option-${item.id}`}
              onClick={() => handleSelect(item)}
              key={item.id}
              sx={{ marginLeft: '30px', padding: '0' }}
              disableGutters
            >
              <Checkbox
                color={'darkGreen'}
                sx={checkBox}
                checked={isFilterSelected(item)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <ListItemText
                primary={memoizedTranslate(item.translateKey, item.label)}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};
