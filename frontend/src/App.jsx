import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { DefaultLayout, GuestLayout } from './components'
import {Home, Login, Register} from './pages'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route path='/' element={<Home />} />
        </Route>
        <Route path='/' element={<GuestLayout />}>
          <Route path='/account/auth/login' element={<Login />} />
          <Route path='/account/auth/register' element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
