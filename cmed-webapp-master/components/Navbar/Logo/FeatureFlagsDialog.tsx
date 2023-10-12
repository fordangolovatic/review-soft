import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { FC, useCallback, useEffect, useState } from 'react';

type FeatureFlagsDialogProps = {
  open?: boolean;
  handleClose: () => void;
};

const backendAPIOptions = ['dev', 'prod', 'local'];

export const defaultFeatureFlags = {
  platform: 'dev',
};

export const FeatureFlagsDialog: FC<FeatureFlagsDialogProps> = ({
  open = false,
  handleClose,
}) => {
  const [platform, setPlatform] = useState('dev');

  useEffect(() => {
    if (window) {
      setPlatform(window.sessionStorage.getItem('platform') ?? 'dev');
    }
  }, []);

  const handleUpdatePlatform = useCallback(() => {
    if (window) {
      window.sessionStorage.setItem('platform', platform);

      handleClose();

      window.location.reload();
    }
  }, [platform, handleClose]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      // className={`${dialogStyles.fullWidth} `}
    >
      <DialogTitle>
        <Typography
          style={{
            fontSize: 24,
            // color: BLUE,
            fontWeight: 600,
          }}
        >
          Feature Flags
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center">
          <Typography
            color="secondary"
            style={{
              fontSize: 21,
              fontWeight: 550,
              width: 250,
              fontStyle: 'italic',
            }}
          >
            API Platform:&nbsp;
          </Typography>
          <Box width={100}>
            <Select
              value={platform}
              onChange={(event) => {
                setPlatform(event.target.value);
              }}
            >
              {backendAPIOptions.map((apiOption) => {
                return (
                  <MenuItem value={apiOption} key={apiOption}>
                    <Typography variant={'body1'} color={apiOption}>
                      {apiOption}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleUpdatePlatform}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};
