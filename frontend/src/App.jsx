import { useState } from 'react'
import { Footer, Header, MainPlayer } from './components'
import HomeScreen from './screens/HomeScreen'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BeatScreen from './screens/BeatScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <MainPlayer />

      <main className='min-h-[82vh]' id='beats'>
        <div className=' flex font-Staatliches justify-center flex-col items-center text-9xl mt-[20px] mb-[30px]'>
          <Routes>
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/' element={<HomeScreen />} />
            <Route path='/beat/:id' element={<BeatScreen />} />
            <Route path='/cart/:id?' element={<CartScreen />} />
            <Route path='/admin/userlist' element={<UserListScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
