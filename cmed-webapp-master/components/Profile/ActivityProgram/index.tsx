import { Box, Button, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { FormikValues, useFormik } from 'formik';
import { isEqual } from 'lodash';
import { useEffect } from 'react';
import {
  useActivityProgramQuery,
  useCreateActivityProgramMutation,
  usePatchActivityProgramMutation,
} from '../../../api/hooks/activity-program';
import { ActivityProgramItem } from '../../../api/types/account/account';
import { Calendar } from '../../Calendar';
import TimeSelector from '../../Calendar/TimeSelcetor';

interface ProgramItem {
  price: number;
  slots: string[];
}

const ActivityProgram = () => {
  const { data: activityProgram, isLoading: isActivityLoading } =
    useActivityProgramQuery();
  const { mutate: createActivityProgramMutation } =
    useCreateActivityProgramMutation();
  const { mutate: patchActivityProgramMutation } = usePatchActivityProgramMutation();

  const handleSubmit = (values: FormikValues) => {
    const programItems: ActivityProgramItem[] = Object.entries(values)
      .filter((dValue, _) => dValue?.[1].slots && dValue[1].slots.length > 0)
      .map((items) => {
        const programDate = items[0];
        const programData: ProgramItem = items[1];

        const programItem: ActivityProgramItem = {
          date: new Date(programDate).toString() as any,
          price: programData.price,
          slots: programData.slots,
        };
        return programItem;
      });

    const deletePrograms = Object.entries(values)
      .filter((dPV, _) => dPV[1].slots && dPV[1].slots.length === 0)
      .map((dItems) => {
        const findActivity = activityProgram?.find((program) =>
          dayjs(dItems[0]).isSame(program.date, 'day'),
        );

        if (!findActivity || !findActivity.id) return;

        const programDate = dItems[0];
        const programData: ProgramItem = dItems[1];

        const programItem: ActivityProgramItem = {
          id: findActivity.id,
          date: new Date(programDate).toString() as any,
          price: programData.price,
          slots: programData.slots,
        };
        return programItem;
      })
      .filter((dP) => dP) as ActivityProgramItem[];

    let dirtyPrograms = activityProgram
      ?.map((activity) => {
        const findActivity = programItems.find((program) =>
          dayjs(activity.date).isSame(program.date, 'day'),
        );

        if (!findActivity) return;

        if (
          findActivity?.price !== activity.price ||
          !isEqual(findActivity?.slots, activity.slots)
        ) {
          return {
            id: activity.id,
            ...findActivity,
          };
        }
      })
      .filter((dP) => dP) as ActivityProgramItem[];

    dirtyPrograms = [...dirtyPrograms, ...deletePrograms];

    const newPrograms = programItems.filter(
      (program) =>
        !activityProgram?.find((dP) => dayjs(dP.date).isSame(program.date, 'day')),
    );

    newPrograms.length > 0 && createActivityProgramMutation(newPrograms);
    dirtyPrograms.length > 0 && patchActivityProgramMutation(dirtyPrograms);
  };

  const handleValidation = (values: FormikValues) => {
    const { slots } = values;
    const errors: FormikValues = {};

    // if (slots.length === 0) errors.slots = true;

    return errors;
  };

  const initialData = {
    currentDate: dayjs().format('YYYY-MM-DD'),
    deafultPrice: 15,
    [`${dayjs().format('YYYY-MM-DD')}`]: {
      price: 15,
      slots: [],
    },
  };

  const activityForm = useFormik({
    initialValues: initialData,
    validate: handleValidation,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (!activityProgram) return;

    activityProgram.map((activity) => {
      activityForm.setFieldValue(dayjs(activity.date).format('YYYY-MM-DD'), {
        price: activity.price,
        slots: [...activity.slots],
      });
    });
  }, [isActivityLoading]);

  return (
    <form
      id="activity-program-create-form"
      onSubmit={(e) => {
        e.preventDefault();
        activityForm.handleSubmit(e);
      }}
    >
      <Box>
        <Box sx={{ margin: '40px 0 40px 0' }}>
          <Typography
            color={'#000000'}
            sx={{ fontWeight: '400 !important' }}
            fontSize={'16px'}
          >
            Choose the date at which you are ready to consult
          </Typography>
        </Box>
        <Calendar {...activityForm} />
        <Box sx={{ margin: '40px 0 0 0', padding: '28px 10px' }} alignItems="center">
          <Typography color={'#00534C'} fontWeight={400} fontSize={'20px'}>
            {dayjs(activityForm.values.currentDate).format('DD MMMM')}
          </Typography>
        </Box>
        <TimeSelector {...activityForm} />

        <Stack mt={2} direction={'row'} justifyContent={'flex-end'}>
          <Button
            type={'submit'}
            variant="contained"
            color={'darkGreen'}
            disabled={!activityForm.isValid}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </form>
  );
};

export default ActivityProgram;
