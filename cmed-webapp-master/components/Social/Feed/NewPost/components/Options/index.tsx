import {
  AddPhotoAlternateOutlined,
  ArticleOutlined,
  StarBorderOutlined,
  VideoCameraBackOutlined,
} from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import OptionElement from '../OptionElement';

const Options = () => {
  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-evenly'}>
      <Typography variant={'body2'} color={'#818181'}>
        Add+
      </Typography>
      <OptionElement Icon={AddPhotoAlternateOutlined} label={'Photo'} />
      <OptionElement Icon={VideoCameraBackOutlined} label={'Video'} />
      <OptionElement Icon={StarBorderOutlined} label={'Event'} />
      <OptionElement Icon={ArticleOutlined} label={'Article'} />
    </Stack>
  );
};

export default Options;
