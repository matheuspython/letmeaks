import { ButtonHTMLAttributes } from 'react';
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

import { Container } from './styles';
export function Button(props:ButtonProps) {
  return (
  <Container className="button" {...props} />
  )
};

