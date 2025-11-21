import { submitProfileDetails } from '@/src/api/profile';
import { VennButton } from '@/src/components/Button';
import { VennTextInput } from '@/src/components/TextInput';
import { Formik, FormikHelpers } from 'formik';
import { Text, View, useWindowDimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';
import { onboardingValidationSchema } from './helper/validation';
import { styles } from './styles';

type OnboardingFormValues = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  corporateNumber: string;
};

export const OnboardingScreen = () => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const initialValues: OnboardingFormValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    corporateNumber: '',
  };

  const validationSchema = onboardingValidationSchema;

  const submitForm = async (
    values: OnboardingFormValues,
    helpers: FormikHelpers<OnboardingFormValues>
  ) => {
    const { setSubmitting, setStatus, resetForm } = helpers;
    setStatus(undefined);

    try {
      await submitProfileDetails({
        firstName: values.firstName,
        lastName: values.lastName,
        corporationNumber: values.corporateNumber,
        phone: values.phoneNumber,
      });

      Toast.show({
        type: 'success',
        text1: 'Success ✅',
        text2: 'Profile details saved.',
      });

      resetForm();
      
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to submit form. Please try again.';
      setStatus({ submitError: message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAwareScrollView bottomOffset={62} contentContainerStyle={styles.container}>
      <Text style={styles.stepText}>Step 1 of 5</Text>
      <Text style={styles.heading}>Onboarding Form</Text>
      
      <Formik
        initialValues={initialValues}
        onSubmit={submitForm}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
          status,
        }) => (
          <View style={[styles.root, isLandscape && styles.rootLandscape]}>
            <Text style={styles.inputHeader}>First Name</Text>
            <VennTextInput
              value={values.firstName}
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              autoCapitalize="words"
              maxLength={50}
              errorMessage={touched.firstName ? errors.firstName : undefined}
            />
            <Text style={styles.charCount}>{values.firstName.length}/50</Text>

            <Text style={styles.inputHeader}>Last Name</Text>
            <VennTextInput
              value={values.lastName}
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              autoCapitalize="words"
              maxLength={50}
              errorMessage={touched.lastName ? errors.lastName : undefined}
            />
            <Text style={styles.charCount}>{values.lastName.length}/50</Text>

            <Text style={styles.inputHeader}>Phone Number</Text>
            <VennTextInput
              keyboardType="phone-pad"
              value={values.phoneNumber}
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
              errorMessage={touched.phoneNumber ? errors.phoneNumber : undefined}
            />

            <Text style={styles.inputHeader}>Corporation Number</Text>
            <VennTextInput
              value={values.corporateNumber}
              onChangeText={handleChange('corporateNumber')}
              onBlur={handleBlur('corporateNumber')}
              autoCapitalize="characters"
              keyboardType="number-pad"
              maxLength={9}
              errorMessage={touched.corporateNumber ? errors.corporateNumber : undefined}
            />
            <Text style={styles.charCount}>{values.corporateNumber.length}/9</Text>

            {status?.submitError ? (
              <Text style={styles.submitError}>{status.submitError}</Text>
            ) : null}            

            <VennButton
              title="Submit"
              onPress={() => handleSubmit()}
              icon={{
                name: 'arrow-right',
                type: 'material-community',
                size: 16,
                color: 'white',
              }}
              iconRight
              iconContainerStyle={styles.iconContainer}
              style={styles.button}
              loading={isSubmitting}
              disabled={isSubmitting}
            />
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};