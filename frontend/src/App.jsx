import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { DefaultLayout, GuestLayout } from './components'
import {Home, Login, Register} from './pages'
import { EwalletPaymentForm, OvoPushForm, QRISPayment, RetailPayment, TopUp, TransactionStatus } from './test';

function App() {

  return (
    <Router>
      <Routes>
      <Route path='/testVA' element={<TopUp />} />
      <Route path='/testing' element={<TransactionStatus />} />
      <Route path='/testRetail' element={<RetailPayment />} />
      <Route path='/testQris' element={<QRISPayment />} />
      <Route path='/testOvo' element={<OvoPushForm />} />
      <Route path='/testPayment' element={<EwalletPaymentForm />} />
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
