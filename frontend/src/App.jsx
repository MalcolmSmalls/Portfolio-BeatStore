import { useState, useEffect } from 'react'
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
import BeatListScreen from './screens/BeatListScreen'
import BeatEditScreen from './screens/BeatEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import { useSelector } from 'react-redux'

function App() {
  const beatList = useSelector((state) => state.beatList)

  const { loading, error, beats, page, pages } = beatList

  const [playingFile, setPlayingFile] = useState('')

  useEffect(() => {
    if (beats[0]) {
      setPlayingFile(beats[0].file)
    }
  }, [beats])

  const handleClick = (beat) => {
    setPlayingFile(beat.file)
  }

  return (
    <BrowserRouter>
      <Header />
      <MainPlayer playingFile={loading ? null : playingFile} />

      <main>
        <div className=' flex font-Staatliches justify-center flex-col items-center lg:text-9xl text-5xl mt-[20px] mb-[30px]'>
          <Routes>
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route
              path='/'
              element={<HomeScreen handleClick={handleClick} />}
            />
            <Route path='/beat/:id' element={<BeatScreen />} />
            <Route path='/admin/beatlist' element={<BeatListScreen />} />
            <Route
              path='/admin/beatlist/:pageNumber'
              element={<BeatListScreen />}
            />
            <Route path='/admin/beat/:id/edit' element={<BeatEditScreen />} />
            <Route path='/cart/:id?' element={<CartScreen />} />
            <Route path='/admin/userlist' element={<UserListScreen />} />
            <Route path='/admin/orderlist' element={<OrderListScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
            <Route path='/search/:keyword' element={<HomeScreen />} />
            <Route path='/page/:pageNumber' element={<HomeScreen />} />
            <Route
              path='/search/:keyword/page/:pageNumber'
              element={<HomeScreen />}
            />
          </Routes>
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
