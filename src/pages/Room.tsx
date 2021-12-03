import logoImg from '../assets/images/logo.svg'
import React from 'react'
import { Container } from '../styles/RoomStyles'
import { Button } from '../components/Botton'
export function Room() {
  return (
    <Container id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="logo" />
          <div>codigo</div>


        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>sala React</h1>
          <span>4 perguntas</span>
        </div>
        <form action="">
          <textarea 
            placeholder="O que voce quer perguntar?"
          />
          <div className="form-footer">
            <span>para enviar uma pergunta <button>faça seu login</button></span>
            <Button type="submit">Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </Container>
  )
}