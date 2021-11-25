import React from 'react'
import { Button } from './components/Botton'
import {auth} from './services/firebase'

export const App:React.FC = () => {
  console.log(auth)
  return (
    <div className="App">
      <h1>Hello Word</h1> 
      <Button/>
      <Button/>

    </div>
  )
}


