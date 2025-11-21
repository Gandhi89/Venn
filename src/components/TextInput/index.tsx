import { Input } from '@rneui/themed';
import { ComponentProps, forwardRef } from 'react';
import { TextInput } from 'react-native';
import { styles } from './styles';

export const VennTextInput = forwardRef<TextInput, ComponentProps<typeof Input>>((props, ref) => {
  return (
    <Input
      ref={ref}
      inputStyle={styles.input}
      inputContainerStyle={styles.inputContainer}
      {...props}
    />
  );
});