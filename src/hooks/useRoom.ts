import { useEffect, useState } from "react"
import { database } from "../services/firebase";

type QuestionProps = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;

}>

export function useRoom(roomId: string){
  const [questions, setQustions] = useState<QuestionProps[]>([])
  const [title, setTitle] = useState()


  useEffect(()=>{
    const roomRef = database.ref(`rooms/${roomId}`)
   
    roomRef.on('value',room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key,value]) =>{
        return{
          id: key,
          content: value.content,
          author: value.author,
          isHighLighted: value.isHighLighted,
          isAnswered: value.isAnswered,
        }
      })
      setTitle(databaseRoom.title)
      setQustions(parsedQuestions)
    })
  },[roomId])
  return{
    questions, title
  }
}