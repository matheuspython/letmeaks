import React from 'react'
import { Container } from './styles';
import copyImg from '../../assets/images/copy.svg'
type RoomCodeProps = {
  code: string
}
export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }
  return (
    <Container className="room-code">
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>sala 324er32wedsadrw343</span>
    </Container>
  )
}
