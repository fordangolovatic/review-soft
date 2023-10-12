import { Icon, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { Article } from '../../api/types/articles';
import { CommentsIcon, LikeIcon, ShareIcon } from '../../utilities/icons/all';

interface InfoSidebarProps {
  article?: Article;
}

const InfoSidebar: FC<InfoSidebarProps> = () => {
  return (
    <Stack width={'150px'} spacing={'15px'}>
      <Stack direction={'row'} alignItems={'center'} spacing={'8px'}>
        <Icon>
          <LikeIcon />
        </Icon>
        {/*  TODO: Need add views */}
        <Typography>{0} Likes</Typography>
      </Stack>
      <Stack direction={'row'} alignItems={'center'} spacing={'8px'}>
        <Icon>
          <CommentsIcon />
        </Icon>
        {/*  TODO: Need add comments */}
        <Typography>{0} Comments</Typography>
      </Stack>
      <Stack direction={'row'} alignItems={'center'} spacing={'8px'}>
        <Icon>
          <ShareIcon />
        </Icon>
        <Typography>Share</Typography>
      </Stack>
    </Stack>
  );
};

export default InfoSidebar;
