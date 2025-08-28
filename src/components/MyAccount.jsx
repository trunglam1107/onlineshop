import React, { useState } from 'react'
import PersonalInfoTab from './PersonalInfoTab'
import SecurityTab from './SecurityTab'
import OrderHistoryTab from './OrderHistoryTab'

export default function MyAccount(){
  const [tab, setTab] = useState('personal')
  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-6xl mx-auto flex gap-6'>
        <aside className='w-64 bg-white p-4 rounded shadow space-y-3'>
          <h2 className='text-xl font-bold'>Tài khoản</h2>
          <button onClick={()=>setTab('personal')} className={`w-full text-left px-3 py-2 rounded ${tab==='personal'?'bg-blue-600 text-white':''}`}>👤 Thông tin cá nhân</button>
          <button onClick={()=>setTab('orders')} className={`w-full text-left px-3 py-2 rounded ${tab==='orders'?'bg-blue-600 text-white':''}`}>📦 Lịch sử đơn hàng</button>
          <button onClick={()=>setTab('security')} className={`w-full text-left px-3 py-2 rounded ${tab==='security'?'bg-blue-600 text-white':''}`}>🔒 Bảo mật</button>
        </aside>
        <main className='flex-1 bg-white p-6 rounded shadow'>
          {tab==='personal' && <PersonalInfoTab />}
          {tab==='orders' && <OrderHistoryTab />}
          {tab==='security' && <SecurityTab />}
        </main>
      </div>
    </div>
  )
}
