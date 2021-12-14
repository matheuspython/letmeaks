import React from 'react';

import { Container } from './styles';
type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
}

const Question = ({
  content,
  author
}: QuestionProps) => {
  return (
  <Container className="question">
    <p>{content}</p>
    <footer>
      <div className="user-info">
        <img src={author.avatar} alt={author.name} />
        <span>{author.name}</span>
      </div>
      <div></div>
    </footer>
  </Container>  
  )
}

export default Question;