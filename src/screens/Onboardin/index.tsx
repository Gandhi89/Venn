import { VennButton } from '@/src/components/Button';
import { VennTextInput } from '@/src/components/TextInput';
import { Formik } from 'formik';
import { Text, View, useWindowDimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
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

  const handleSubmit = (values: OnboardingFormValues) => {
    console.log('Form submitted:', values);
  };

  return (
    <KeyboardAwareScrollView bottomOffset={62} contentContainerStyle={styles.container}>
      <Text style={styles.stepText}>Step 1 of 5</Text>
      <Text style={styles.heading}>Onboarding Form</Text>
      
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={[styles.root, isLandscape && styles.rootLandscape]}>
            <Text style={styles.inputHeader}>First Name</Text>
            <VennTextInput
              value={values.firstName}
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
            />

            <Text style={styles.inputHeader}>Last Name</Text>
            <VennTextInput
              value={values.lastName}
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
            />

            <Text style={styles.inputHeader}>Phone Number</Text>
            <VennTextInput
              keyboardType="phone-pad"
              value={values.phoneNumber}
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
            />

            <Text style={styles.inputHeader}>Corporation Number</Text>
            <VennTextInput
              value={values.corporateNumber}
              onChangeText={handleChange('corporateNumber')}
              onBlur={handleBlur('corporateNumber')}
            />

            <VennButton
              title="Submit"
              onPress={() => handleSubmit()}
              style={styles.button}
            />
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};