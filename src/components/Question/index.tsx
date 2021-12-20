import React, { ReactNode } from 'react';

import { Container } from './styles';
type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

const Question = ({
  content,
  author,
  children,
  isAnswered=false,
  isHighlighted=false
}: QuestionProps) => {
  return (
  <Container className={`question ${(isAnswered && isHighlighted) ? 'answered' : ''} ${isHighlighted ? 'highlighted' : ''}`}>
    <p>{content}</p>
    <footer>
      <div className="user-info">
        <img src={author.avatar} alt={author.name} />
        <span>{author.name}</span>
      </div>
      <div> {children} </div>
    </footer>
  </Container>  
  )
}

export default Question;