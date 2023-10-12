import {
  Avatar,
  Box,
  Button,
  Divider,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { FC } from 'react';

interface RenderedEventProps {
  handleClose: () => void;
}
export const RenderedEvent: FC<RenderedEventProps> = ({ handleClose }) => {
  return (
    <MenuItem>
      <Stack alignItems={'flex-end'}>
        <Stack spacing={'10px'} direction={'row'}>
          <Avatar variant={'square'} src={'/images/events/one.png'} />
          <Stack>
            <Typography>Advances in Healthcare ...</Typography>
            <Typography color={'primary'}>Private Event</Typography>
          </Stack>
        </Stack>
        <Box>
          <Button onClick={handleClose} variant={'contained'}>
            Reject
          </Button>
        </Box>
      </Stack>
      <Divider />
    </MenuItem>
  );
};
