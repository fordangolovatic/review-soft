import { Box, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { FC, ReactNode, useRef, useState } from 'react';
import useOutsideClick from '../../utilities/hooks/useOutsideClick';

interface Option {
  label: string;
  onClick?: () => void;
  path?: string;
}

interface DropdownProps {
  options: Option[];
  children: ReactNode;
}

const Dropdown: FC<DropdownProps> = ({ options, children }: DropdownProps) => {
  const [show, setShow] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, () => {
    setShow(false);
  });

  return (
    <Stack position={'static'} ref={containerRef}>
      <Stack>
        <Box
          position={'relative'}
          onClick={() => setShow(!show)}
          color={'#00A04A'}
          sx={{ cursor: 'pointer' }}
        >
          {children}
        </Box>

        {show && (
          <Stack>
            <Box
              position={'absolute'}
              width={'20px'}
              height={'20px'}
              zIndex={'99'}
              sx={{ background: '#FFF', transform: 'rotate(45deg)' }}
            />
            <Stack
              mt={'5px'}
              padding={'20px'}
              gap={'8px'}
              position={'absolute'}
              bgcolor={'#FFF'}
              borderRadius={'10px'}
              zIndex={'98'}
              boxShadow={'0px 10px 50px rgba(0, 0, 0, 0.2)'}
              sx={{ transform: 'translateX(-50%)' }}
            >
              {options
                .filter((o) => o.label)
                .map((option) =>
                  option.path ? (
                    <Link key={option.label} href={option.path}>
                      <Typography
                        key={option.label}
                        variant={'body1'}
                        sx={{ cursor: 'pointer' }}
                      >
                        {option.label}
                      </Typography>
                    </Link>
                  ) : (
                    <Typography
                      key={option.label}
                      variant={'body1'}
                      color={option.onClick ? '#000' : '#818181'}
                      sx={{ cursor: option.onClick ? 'pointer' : 'not-allowed' }}
                      onClick={option.onClick}
                    >
                      {option.label}
                    </Typography>
                  ),
                )}
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Dropdown;
