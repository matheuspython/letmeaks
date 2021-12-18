import { useHistory, useParams } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import React, { FormEvent, useEffect, useState } from 'react'

import { Container } from '../styles/RoomStyles'
import { Button } from '../components/Botton'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuths'
import Question from '../components/Question'
import { useRoom } from '../hooks/useRoom'
import deleteImg from '../assets/images/delete.svg'
import { database } from '../services/firebase'



type RoomParams = {
  id: string;
}
export function AdminRoom() {
  const params = useParams<RoomParams>()
  const roomId = params.id;
  const { user } = useAuth()
  const {questions, title} = useRoom(roomId)
  const history = useHistory()

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    })
    history.push('/')
  }

  async function handleDeleteQuestion(questionId: string) {
    if(window.confirm("tem certeza que deseja excluir essa pergunta?"))
    await database.ref(`/rooms/${roomId}/questions/${questionId}`).remove()
  }

  return (
    <Container id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="logo" />
          <div>
            <RoomCode code={roomId}/>
            <Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>sala {title}</h1>
          { questions.length > 0 && <span>{questions.length } pergunta(s)</span> }
        </div>
     
        <div className="question-list">
          {questions.map(question =>{
            return(
              <Question 
                key={question.id}
                content={question.content}
                author={question.author}    
              >
                <button
                  type='button'
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="deletar pergunta" />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </Container>
  )
}
