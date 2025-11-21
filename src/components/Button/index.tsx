import { Button } from '@rneui/themed';
import { ComponentProps } from 'react';
import { styles } from './style';


export const VennButton = (props: ComponentProps<typeof Button>) => {
  return (
    <Button
      buttonStyle={styles.primaryButton}
      titleStyle={styles.titleStyle}
      {...props}
    />
  )
}