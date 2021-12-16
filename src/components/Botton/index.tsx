import { ButtonHTMLAttributes } from 'react';
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
}

import { Container } from './styles';
export function Button({isOutlined=false, ...props}:ButtonProps) {
  return (
  <Container className={`button ${isOutlined ? 'outlined' : ''}`} 
    {...props} />
  )
};

