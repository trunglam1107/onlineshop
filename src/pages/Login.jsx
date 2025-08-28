import React, { useState, useEffect } from 'react'

export default function Login(){
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [remember, setRemember] = useState(false)

  useEffect(()=>{ const user=JSON.parse(localStorage.getItem('user')); if(user && localStorage.getItem('isLoggedIn')) window.location.href='#/' },[])

  const doLogin = ()=>{
    const user = JSON.parse(localStorage.getItem('user')) || null
    if(!user || user.email!==email || user.password!==pass){ alert('Email hoặc mật khẩu sai'); return }
    if(remember) localStorage.setItem('isLoggedIn','1')
    else sessionStorage.setItem('isLoggedIn','1')
    alert('Đăng nhập thành công')
    window.location.href='#/'
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='bg-white p-6 rounded shadow w-full max-w-md'>
        <h2 className='text-xl font-bold mb-4'>Đăng nhập</h2>
        <input className='border p-2 w-full rounded mb-2' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)}/>
        <input type='password' className='border p-2 w-full rounded mb-2' placeholder='Mật khẩu' value={pass} onChange={e=>setPass(e.target.value)}/>
        <div className='flex items-center gap-2 mb-2'>
          <input type='checkbox' checked={remember} onChange={e=>setRemember(e.target.checked)}/> Ghi nhớ đăng nhập
        </div>
        <div className='flex gap-2'>
          <button onClick={doLogin} className='bg-blue-600 text-white px-4 py-2 rounded'>Đăng nhập</button>
          <a href='#/register' className='px-4 py-2'>Đăng ký</a>
        </div>
      </div>
    </div>
  )
}
