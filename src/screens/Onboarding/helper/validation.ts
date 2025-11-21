import { validateCorporationNumber } from '@/src/api/corporations';
import * as Yup from 'yup';

export const onboardingValidationSchema = Yup.object({
  firstName: Yup.string().trim().required('First name is required'),
  lastName: Yup.string().trim().required('Last name is required'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^\+1\d{10}$/, 'Enter a valid Canadian phone number starting with country code +1'),
  corporateNumber: Yup.string()
    .required('Corporate number is required')
    .length(9, 'Corporate number must be 9 characters')
    .test('validate-corporation-number', 'Corporation number is invalid', async function (value) {
      if (!value || value.length !== 9) {
        return false;
      }

      try {
        const result = await validateCorporationNumber(value);
        if (result.valid === false && result?.message) {
          return this.createError({ message: result.message });
        }
        return true;
      } catch (error) {
        return this.createError({
          message: 'Unable to validate corporation number. Try again.',
        });
      }
    }),
});

