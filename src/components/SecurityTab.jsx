import React, { useState } from 'react'

export default function SecurityTab(){
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')

  const changePass = ()=>{
    const user = JSON.parse(localStorage.getItem('user'))||{}
    if(!user.password || user.password!==oldPass){ alert('Mật khẩu cũ không đúng'); return }
    if(!newPass){ alert('Nhập mật khẩu mới'); return }
    user.password = newPass
    localStorage.setItem('user', JSON.stringify(user))
    alert('Đổi mật khẩu thành công. Đăng nhập lại.')
    localStorage.removeItem('isLoggedIn')
    window.location.href='#/login'
  }

  const logoutAll = ()=>{
    if(confirm('Bạn có chắc muốn đăng xuất tất cả thiết bị?')){ localStorage.clear(); window.location.href='#/login' }
  }

  return (
    <div>
      <h3 className='text-lg font-bold mb-3'>🔐 Bảo mật</h3>
      <input type='password' className='border p-2 w-full rounded mb-2' placeholder='Mật khẩu cũ' value={oldPass} onChange={e=>setOldPass(e.target.value)}/>
      <input type='password' className='border p-2 w-full rounded mb-2' placeholder='Mật khẩu mới' value={newPass} onChange={e=>setNewPass(e.target.value)}/>
      <div className='flex gap-2'>
        <button onClick={changePass} className='bg-blue-600 text-white px-4 py-2 rounded'>Đổi mật khẩu</button>
        <button onClick={logoutAll} className='bg-red-600 text-white px-4 py-2 rounded'>Đăng xuất tất cả</button>
      </div>
    </div>
  )
}
