import { Stack, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useTranslation } from 'next-i18next';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useAccountQuery } from '../../../../../api/hooks/account';
import { SkeletonCollection } from '../../../../SkeletonCollection';
import { FormikProps } from '../full-name/FullName';
import { BirthdaySkeleton } from './BirthdaySkeleton';
import { Day, Month, Year } from './components';

dayjs.extend(utc);

type BirthdayProps = FormikProps;
interface DateOfBirth {
  day?: number;
  month?: number;
  year?: number;
}

export const Birthday: FC<BirthdayProps> = ({ values, setFieldValue }) => {
  const { t } = useTranslation('profile');
  const translations = {
    dateOfBirth: t('pI-dateOfBirth'),
    _dateOfBirth: t('pI-_dateOfBirth'),
  };
  const [date, setDate] = useState<DateOfBirth>({
    day: undefined,
    month: undefined,
    year: undefined,
  });
  const { data: account, isLoading: isLoadingAccount } = useAccountQuery();
  const birthday = useMemo(
    () => (account?.dateOfBirth ? dayjs(account?.dateOfBirth) : null),
    [account],
  );

  useEffect(() => {
    if (!account || !birthday) return;
    const accountDate = dayjs(account.dateOfBirth);

    setDate({
      day: accountDate.date(),
      month: accountDate.month() + 1,
      year: accountDate.year(),
    });
  }, [account, birthday, isLoadingAccount]);

  const updateFormData = useCallback(
    (newFormDate: DateOfBirth) => {
      const newData: DateOfBirth = {
        day: newFormDate.day || dayjs().date(),
        month: newFormDate.month ?? dayjs().month() + 1,
        year: newFormDate.year || dayjs().year(),
      };

      if (newData?.day && newData?.month && newData?.year) {
        const newDate = `${newData.month}.${newData.day}.${newData.year}`;
        const dateJs = dayjs(newDate);
        const utcDateJs = dateJs.utc(true);
        const utcIsoString = utcDateJs.toISOString();
        return setFieldValue?.('dateOfBirth', utcIsoString);
      }
    },
    [setFieldValue],
  );

  const onChangeDayHandler = useCallback(
    (day: number): void => {
      setDate({ ...date, day });
      updateFormData({ ...date, day });
    },
    [date, updateFormData],
  );

  const onChangeMonthHandler = useCallback(
    (month: number): void => {
      setDate({ ...date, month });
      updateFormData({ ...date, month });
    },
    [date, updateFormData],
  );

  const onChangeYearHandler = useCallback(
    (year: number): void => {
      setDate({ ...date, year });
      updateFormData({ ...date, year });
    },
    [date, updateFormData],
  );

  return (
    <SkeletonCollection isLoading={isLoadingAccount} skeleton={<BirthdaySkeleton />}>
      <Typography variant={'subtitle1'}>{translations.dateOfBirth}</Typography>

      <Typography
        mb={{ sm: '12px', xl: '20px' }}
        color={'#828282'}
        variant={'body1'}
      >
        {translations._dateOfBirth}
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction={'row'} spacing={{ sm: '15px', xl: '20px' }}>
          <Day
            value={dayjs(values?.dateOfBirth).date()}
            onChange={onChangeDayHandler}
          />

          <Month
            value={dayjs(values?.dateOfBirth).month() + 1}
            onChange={onChangeMonthHandler}
          />

          <Year
            value={dayjs(values?.dateOfBirth).year()}
            onChange={onChangeYearHandler}
          />
        </Stack>
      </LocalizationProvider>
    </SkeletonCollection>
  );
};
