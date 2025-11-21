import { Stack } from "expo-router";
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { colors } from "../src/constants/colors";

export default function RootLayout() {
  return (
    <KeyboardProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.white },
        }}
      />
    </KeyboardProvider>
  );
}
