import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { FormikValues, useFormik } from 'formik';
import { FC, useEffect, useMemo } from 'react';
import { useCreateConsultationMutation } from '../../../../../../../api/hooks/consultations';
import { uploadToS3 } from '../../../../../../../api/s3';
import { useToast } from '../../../../../../../utilities/hooks/useToast';
import {
  BookingItem,
  BookingItemDetails,
  IBookModalProps,
  IUploadFile,
} from '../../../../types';
import { Anamnes, Calendar, ConsultationTimePicker, DoctorInfo } from './components';

const BookModal: FC<IBookModalProps> = ({ opened, onClose, doctor }) => {
  const { notifySuccess, notifyError } = useToast();
  const queryClient = useQueryClient();

  const { mutate: createConsultationMutation } = useCreateConsultationMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['doctors', 'doctor']);
      onClose();
    },
    onError: () => notifyError('Failed to book consultations'),
  });

  const initialValues = {
    currentDay: dayjs().format('YYYY-MM-DD'),
    allowMedicalRecords: false,
    anamnes: '',
    images: [],
    [`${dayjs().format('YYYY-MM-DD')}`]: {
      id: null,
      price: 0,
      slots: [],
    },
  };

  const handleValidation = async (values: FormikValues) => {
    const error: Partial<FormikValues> = {};

    if (
      Object.entries(values).filter((bS) => bS[1]?.selectedSlots?.length > 0)
        .length === 0
    )
      error.slots = true;

    return error;
  };

  const handleSubmit = async (values: FormikValues) => {
    const bookingItems: BookingItem[] = Object.entries(values)
      .filter(
        (dValue, _) =>
          dValue?.[1].selectedSlots && dValue[1].selectedSlots.length > 0,
      )
      .map((items) => {
        const programDate = items[0];
        const programData: BookingItemDetails = items[1];

        const programItem: BookingItem = {
          activityProgramId: programData.id,
          date: new Date(programDate), //.toString(),
          price: programData.price,
          slots: programData.selectedSlots,
          medicalRecordAgreement: values.allowMedicalRecords,
        };

        return programItem;
      });

    let bookingImage: string | null = null;

    if (values.images[0]) {
      const selectedImage = values.images[0] as IUploadFile;

      const imageURLData = await axios.get(selectedImage.file, {
        responseType: 'blob',
      });
      const imageFile = new File([imageURLData.data], selectedImage.title, {
        type: imageURLData.data.type,
      });

      const uploadedImage = await uploadToS3([imageFile], 'consultations');

      bookingImage = uploadedImage[0].Location;
    }

    // NOTE: This is supported for multiple images
    // const uploadedImages = await Promise.all(
    //   values.images.map(async (image: IUploadFile) => {
    //     const imageURLData = await axios.get(image.file, { responseType: 'blob' });
    //     const imageFile = new File([imageURLData.data], image.title, {
    //       type: imageURLData.data.type,
    //     });

    //     const uploadedImage = await uploadToS3([imageFile], 'consultations');

    //     return uploadedImage[0].Location;
    //   }),
    // );

    try {
      await Promise.all(
        bookingItems.map((booking) => {
          booking.slots.map((bookingSlot) => {
            const bookingData = {
              doctorId: Number(doctor.userId),
              consultationPrice: booking.price,
              startTime: bookingSlot,
              activityId: Number(booking.activityProgramId),
              medicalRecordAgreement: booking.medicalRecordAgreement,
              image: bookingImage,
            };

            createConsultationMutation(bookingData);
          });
        }),
      );

      notifySuccess('Successfully booked consultations');
    } catch {
      notifyError('Could not create consultation booking due to error');
    }

    // createConsultationMutation({
    //   bookingItems,
    //   allowMedicalRecords: values.allowMedicalRecords,
    //   anamnes: values.anamnes,
    //   images: uploadedImages,
    // });
  };

  const bookForm = useFormik<FormikValues>({
    initialValues,
    onSubmit: handleSubmit,
    validate: handleValidation,
  });

  useEffect(() => {
    doctor.activityProgram.map((activity) => {
      bookForm.setFieldValue(dayjs(activity.date).format('YYYY-MM-DD'), {
        id: activity.id,
        price: parseInt(activity.price.toString()),
        availableSlots: activity.slots,
        selectedSlots: [],
      });
    });
  }, [doctor]);

  const bookingDetails = useMemo(() => {
    let price = 0;

    const bookingItems = Object.entries(bookForm.values)
      .filter((bV) => bV[1].selectedSlots && bV[1].selectedSlots.length > 0)
      .map((item) => {
        const itemPrice = item[1]?.price;
        const itemSlots = item[1]?.selectedSlots;

        price += itemSlots.length * itemPrice;
        return itemSlots;
      });

    return { price, items: bookingItems };
  }, [bookForm.values]);

  return (
    <Modal sx={{ zIndex: '9999' }} open={opened} onClose={onClose}>
      <form
        id="doctor-book-modal-form"
        onSubmit={(e) => {
          e.preventDefault();
          bookForm.handleSubmit(e);
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
            height: '100%',
          }}
        >
          <Stack height={'100%'} alignItems={'center'} justifyContent={'center'}>
            <Box
              height={'90%'}
              borderRadius={'30px'}
              bgcolor={'background.paper'}
              padding={{ sm: '40px' }}
              overflow={'scroll'}
            >
              <Stack
                sx={{
                  height: '100%',
                  overflow: 'scroll',
                }}
              >
                <Stack>
                  <Box mb={{ sm: '30px', xl: '40px' }}>
                    <Typography variant={'subtitle1'} color={'secondary.dark'}>
                      Booking Consultation
                    </Typography>
                  </Box>
                </Stack>

                <Stack
                  id="doctor-info-container"
                  spacing={{ sm: '20px', xl: '30px' }}
                  direction={'row'}
                >
                  <Box>
                    <DoctorInfo doctor={doctor} />
                  </Box>

                  <Box>
                    <Calendar
                      value={bookForm.values.currentDay}
                      events={bookForm.values}
                      {...bookForm}
                    />
                  </Box>

                  <ConsultationTimePicker {...bookForm} />
                </Stack>

                <Box id="anamneses-container" my={{ sm: '40px', xl: '60px' }}>
                  <Anamnes {...bookForm} />
                </Box>

                {bookingDetails.price > 0 && (
                  <Stack mb={'20px'} alignItems={'flex-end'}>
                    <Stack spacing={'10px'} direction={'row'}>
                      <Typography variant={'body1'}>Session:</Typography>

                      <Typography color={'secondary'} variant={'body1'}>{`x${
                        bookingDetails.items.length
                      } ${bookingDetails.items.join(', ')}`}</Typography>
                    </Stack>

                    <Stack spacing={'10px'} direction={'row'}>
                      <Typography variant={'body1'}>Amount to be paid:</Typography>

                      <Typography
                        variant={'body1'}
                        color={'secondary'}
                      >{`${bookingDetails.price}$`}</Typography>
                    </Stack>
                  </Stack>
                )}

                <Typography color={'#818181'} variant={'body1'} textAlign={'end'}>
                  All data that is filled in is confidential and protected by law.
                </Typography>

                <Stack
                  mt={'10px'}
                  justifyContent={'space-between'}
                  direction={'row'}
                >
                  <Button
                    sx={{ width: { sm: '150px' }, padding: '10px 0' }}
                    variant={'outlined'}
                    color={'primary'}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>

                  <Button
                    type={'submit'}
                    sx={{ width: { sm: '150px' }, padding: '10px 0' }}
                    variant={'contained'}
                    color={'secondary'}
                    disabled={
                      !bookForm.dirty || bookForm.isSubmitting || !bookForm.isValid
                    }
                  >
                    Book
                  </Button>
                </Stack>
                {/* <Typography
                sx={{ marginTop: '10px' }}
                color={'primary'}
                textAlign={'center'}
              >
                Warning! There are not enough funds in your wallet to pay for the
                consultation. Top up your wallet to continue booking.
                <Typography component={'span'} color={'secondary'}>
                  WALLET
                </Typography>
              </Typography> */}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </form>
    </Modal>
  );
};

export default BookModal;
