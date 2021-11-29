import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import { Route, BrowserRouter } from 'react-router-dom'

import { AuthContextProvider } from './contexts/AuthContext'

export function App () {
 
  return (
    <BrowserRouter>
      <AuthContextProvider>
          <Route path="/" exact component={Home}/>
          <Route path="/rooms/new" component={NewRoom}/>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

