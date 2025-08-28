import React, { useState, useEffect } from 'react'
import Shop from './pages/Shop'
import MyAccount from './components/MyAccount'
import Login from './pages/Login'
import OrdersPage from './pages/OrdersPage'
import CheckoutPage from './pages/CheckoutPage'

// simple hash router
function Router() {
  const [route, setRoute] = useState(window.location.hash.replace('#','') || '/')

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace('#','') || '/')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (route === '/account') return <MyAccount />
  if (route === '/login') return <Login />
  if (route === '/orders') return <OrdersPage />
  if (route === '/checkout') return <CheckoutPage />
  return <Shop />
}

export default function App(){
  return <Router />
}
