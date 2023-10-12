import { ExpandMoreOutlined } from '@mui/icons-material';
import { Autocomplete, Avatar, Box, Stack, Typography } from '@mui/material';
import { FC, useMemo } from 'react';
import { useMetadataQuery } from '../../../../../../../api/hooks/metadata';
import { useUsersQuery } from '../../../../../../../api/hooks/user';
import { getInitials } from '../../../../../../../utilities/functions';
import { FormikProps } from '../../../../../../UploadImages';
import { STextFieldInput } from '../../../../../styled';

interface UserListProps extends FormikProps {
  filter?: string;
}

export const UserList: FC<UserListProps> = ({ filter, setFieldValue }) => {
  const { data: users, isLoading: isLoadingUsers } = useUsersQuery();

  const { data: metadata } = useMetadataQuery();

  const userOptions = useMemo(
    () =>
      (users ?? []).filter((user) =>
        Number(user.userId) !== metadata?.userId && filter
          ? user.accountType === filter
          : true,
      ),
    [users],
  );

  return (
    <Autocomplete
      id={'user-list'}
      sx={{
        width: '100%',
      }}
      popupIcon={<ExpandMoreOutlined />}
      options={userOptions}
      loading={isLoadingUsers}
      onChange={(e, value) => {
        setFieldValue?.('to', value?.userId || '');
      }}
      renderOption={(props, option) => (
        <Box component={'li'} {...props} sx={{ padding: '0' }}>
          <Stack direction={'row'} alignItems="center" columnGap={'12px'}>
            <Box
              width={40}
              display="flex"
              alignItems="center"
              justifyContent={'center'}
            >
              <Box
                bgcolor={'#EFEFEF'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{
                  width: { sm: '35px', xl: '40px' },
                  height: { sm: '35px', xl: '40px' },
                  borderRadius: '50%',
                }}
              >
                {!option.profileImage ? (
                  <Typography sx={{ userSelect: 'none' }}>
                    {getInitials(`${option?.firstName} ${option?.lastName}`)}
                  </Typography>
                ) : (
                  <Avatar src={option.profileImage} />
                )}
              </Box>
            </Box>
            {option?.firstName}, {option?.lastName}
          </Stack>
        </Box>
      )}
      getOptionLabel={(option) => `${option?.firstName} ${option?.lastName}`}
      renderInput={(params) => (
        <STextFieldInput
          {...params}
          sx={{
            padding: '5px 6px',
          }}
          name="to"
          fullWidth
          placeholder={isLoadingUsers ? 'Loading...' : 'Search people'}
          variant="outlined"
        />
      )}
    />
  );
};
