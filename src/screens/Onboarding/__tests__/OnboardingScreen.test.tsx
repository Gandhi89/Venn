import { validateCorporationNumber } from '@/src/api/corporations';
import { submitProfileDetails } from '@/src/api/profile';
import { OnboardingScreen } from '@/src/screens/Onboarding';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import Toast from 'react-native-toast-message';

jest.mock('react-native-keyboard-controller', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    KeyboardAwareScrollView: ({ children, ...rest }: any) => (
      <View {...rest}>{children}</View>
    ),
  };
});

jest.mock('@/src/api/profile', () => ({
  submitProfileDetails: jest.fn(),
}));

jest.mock('@/src/api/corporations', () => ({
  validateCorporationNumber: jest.fn(),
}));

jest.mock('react-native-toast-message', () => {
  const show = jest.fn();
  return {
    __esModule: true,
    default: { show },
  };
});

const mockSubmitProfileDetails = submitProfileDetails as jest.MockedFunction<
  typeof submitProfileDetails
>;
const mockValidateCorporationNumber = validateCorporationNumber as jest.MockedFunction<
  typeof validateCorporationNumber
>;
const mockToastShow = Toast.show as jest.Mock;

const fillForm = (getByTestId: (testID: string) => ReturnType<typeof render>['getByTestId']) => {
  fireEvent.changeText(getByTestId('firstNameInput'), 'John');
  fireEvent.changeText(getByTestId('lastNameInput'), 'Doe');
  fireEvent.changeText(getByTestId('phoneNumberInput'), '+11234567890');
  fireEvent.changeText(getByTestId('corporateNumberInput'), '123456789');
};

describe('OnboardingScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockValidateCorporationNumber.mockResolvedValue({ valid: true });
  });

  it('shows validation messages when submitting empty form', async () => {
    const { getByTestId, findByText } = render(<OnboardingScreen />);

    fireEvent.press(getByTestId('submitButton'));

    expect(await findByText('First name is required')).toBeTruthy();
    expect(await findByText('Last name is required')).toBeTruthy();
    expect(await findByText('Phone number is required')).toBeTruthy();
    expect(await findByText('Corporate number is required')).toBeTruthy();
  });

  it('submits successfully and resets form on success', async () => {
    mockSubmitProfileDetails.mockResolvedValueOnce();
    const { getByTestId } = render(<OnboardingScreen />);

    fillForm(getByTestId);

    fireEvent.press(getByTestId('submitButton'));

    await waitFor(() =>
      expect(mockSubmitProfileDetails).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        corporationNumber: '123456789',
        phone: '+11234567890',
      })
    );

    await waitFor(() =>
      expect(mockToastShow).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
          text1: 'Success ✅',
        })
      )
    );
  });

  it('shows corporation validation message from the API', async () => {
    mockValidateCorporationNumber.mockImplementation(async () => ({
      valid: false,
      message: 'Invalid corporation number',
    }));
    const { getByTestId, findByText } = render(<OnboardingScreen />);

    fillForm(getByTestId);
    fireEvent.press(getByTestId('submitButton'));

    await waitFor(() => expect(mockValidateCorporationNumber).toHaveBeenCalled());
    expect(
      await findByText('Invalid corporation number', undefined, { timeout: 3000 })
    ).toBeTruthy();
    expect(mockSubmitProfileDetails).not.toHaveBeenCalled();
  });
});

