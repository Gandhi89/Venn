import { Button } from '@rneui/themed';
import { ComponentProps } from 'react';


export const VennButton = (props: ComponentProps<typeof Button>) => {
  return (
    <Button {...props} />    
  )
}