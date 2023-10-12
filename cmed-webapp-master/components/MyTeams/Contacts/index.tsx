import { SearchOutlined } from '@mui/icons-material';
import { Card, Divider, InputAdornment, Stack, Typography } from '@mui/material';
import Sort from '../../Social/Feed/Sort';
import { contacts } from './data';
import Element from './Element';
import { Input } from './styled';

const Contacts = () => {
  const handleSort = (newOption: string) => {
    // We will implement the logic after the back-end is done
    return newOption;
  };

  return (
    <Card variant={'outlined'}>
      <Stack padding={'20px'}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'flex-end'}
        >
          <Stack gap={'15px'}>
            <Typography variant={'h4'}>Contacts</Typography>
            <Sort options={['New']} onSelect={handleSort} />
          </Stack>

          <Input
            placeholder="Search"
            variant={'standard'}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment
                  position={'start'}
                  sx={{ paddingLeft: '10px', color: '#00534C' }}
                >
                  <SearchOutlined color={'inherit'} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack divider={<Divider orientation={'horizontal'} />}>
          {contacts.map((contact) => (
            <Element
              key={contact.id}
              name={contact.name}
              role={contact.role}
              avatar={contact.avatar}
            />
          ))}
        </Stack>
      </Stack>
    </Card>
  );
};

export default Contacts;
