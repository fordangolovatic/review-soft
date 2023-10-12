import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import TextFieldInput from '../../../../../UI/Input/TextFieldInput';
import { FormikProps } from '../../../full-name/FullName';

type AddressProps = FormikProps;

export const Address: FC<AddressProps> = ({ handleChange, handleBlur, values }) => {
  const { t } = useTranslation('profile');
  const translations = {
    address: t('pI-address'),
  };

  return (
    <TextFieldInput
      placeholder={'Type Address'}
      label={translations.address}
      name="address"
      value={values?.address || ''}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};
