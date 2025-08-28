import React from 'react'
export default function OrderHistoryTab(){
  const orders = JSON.parse(localStorage.getItem('orders'))||[]
  return (
    <div>
      <h3 className='text-lg font-bold mb-3'>📦 Lịch sử đơn hàng</h3>
      {orders.length===0? <p>Chưa có đơn hàng</p> : orders.map(o=>(
        <div key={o.id} className='border p-3 rounded mb-2'>
          <p>Mã: {o.id} • {o.status}</p>
          <p>Tổng: {o.total.toLocaleString()}₫</p>
          <a className='text-blue-600' href={`#/orders?id=${o.id}`}>Xem chi tiết</a>
        </div>
      ))}
    </div>
  )
}
