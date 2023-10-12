import { KeyboardArrowDownOutlined } from '@mui/icons-material';
import { Button, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, MouseEvent, useState } from 'react';
import { useGlobalState } from '../../../../../utilities/global-state';
import { SortOptions } from '../../../../FiltersCollection/components/CollapseMenu';

const SortByOptions = [
  {
    label: 'favoriteArticles',
    value: SortOptions.FAVORITE,
  },
  {
    label: 'rating',
    value: SortOptions.RATING,
  },
  {
    label: 'experience',
    value: SortOptions.EXPERIENCE,
  },
  {
    label: 'price',
    value: SortOptions.PRICE,
  },
];

const SortBy: FC = () => {
  const { t } = useTranslation('common');
  const { sort, setSort } = useGlobalState();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [forSort, setForSort] = useState<string | null>(
    t(SortByOptions.find((sortOption) => sortOption.value === sort)?.label || ''),
  );
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: MouseEvent<HTMLElement>, value: SortOptions): void => {
    setAnchorEl(null);

    if (!event.currentTarget.outerText) return;
    setForSort(event.currentTarget.outerText);

    setSort(value);
  };

  return (
    <Stack alignItems={'center'} direction={'row'} spacing={'10px'}>
      <Typography color={'#818181'} variant={'body1'}>
        {t('sortBy')}
      </Typography>

      <Stack alignItems={'center'} direction={'row'} spacing={'5px'}>
        <Button onClick={handleClick}>
          <Typography color={'#000'} variant={'body1'}>
            {forSort}
          </Typography>

          <KeyboardArrowDownOutlined sx={{ color: '#000' }} fontSize={'small'} />
        </Button>
      </Stack>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {SortByOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={(event) => handleClose(event, option.value)}
          >
            {t(option.label)}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
};

export default SortBy;
