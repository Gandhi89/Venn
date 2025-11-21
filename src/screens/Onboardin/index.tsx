import { VennButton } from '@/src/components/Button';
import { VennTextInput } from '@/src/components/TextInput';
import { Formik } from 'formik';
import { Text, View, useWindowDimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import * as Yup from 'yup';
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

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required('First name is required'),
    lastName: Yup.string()
      .required('Last name is required'),
      phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\+1\d{10}$/, "Enter a valid Canadian phone number starting with country code +1"),
    corporateNumber: Yup.string().required('Corporate number is required'),
  });

  const handleSubmit = (values: OnboardingFormValues) => {
    console.log('Form submitted:', values);
  };

  return (
    <KeyboardAwareScrollView bottomOffset={62} contentContainerStyle={styles.container}>
      <Text style={styles.stepText}>Step 1 of 5</Text>
      <Text style={styles.heading}>Onboarding Form</Text>
      
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
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
              errorMessage={touched.corporateNumber ? errors.corporateNumber : undefined}
            />

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
            />
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};