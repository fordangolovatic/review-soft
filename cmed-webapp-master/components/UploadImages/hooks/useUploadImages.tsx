import { BaseSyntheticEvent, useCallback, useRef, useState } from 'react';
import { uploadToS3 } from '../../../api/s3';
import { FormikProps } from '../index';

interface UseUploadImages extends FormikProps {
  name?: string;
}
export const useUploadImages = ({
  name,
  values,
  setFieldValue,
  submitForm,
}: UseUploadImages) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>();

  const inputRef = useRef<null | HTMLInputElement>(null);

  const onRemoveImage = () => {
    name && setFieldValue?.(name, '');
  };

  const onUploadImageHandler = useCallback(
    async (event: BaseSyntheticEvent) => {
      setIsUploading(true);
      if (event.target.value) {
        const file = event.target.files[0];
        // if (!isImageSizeValid(event.target.files[0]?.size)) {
        //   notifyError(
        //     `File is too big. Please upload file smaller than ${IMAGE_MAX_SIZE_MB}`,
        //   );
        //   return;
        // }
        // setLoading(true);
        let image;
        try {
          setFileName(file.name);
          image = await uploadToS3([event.target.files[0]], 'images');
        } catch (err) {
          // notifyError(feedbackMessage('', FEEDBACK_TYPE.GENERAL_ERROR));
          return;
        } finally {
          setIsUploading(false);
        }
        submitForm?.();

        // eslint-disable-next-line no-console
        // console.log('loc', image);

        name && setFieldValue?.(name, image[0].Location);
      }
    },
    [setFieldValue, submitForm],
  );

  const hasImage = values?.profileImage && values?.profileImage !== 'Undefined';

  return {
    inputRef,
    onUploadImageHandler,
    hasImage,
    isUploading,
    fileName,
    onRemoveImage,
  };
};
