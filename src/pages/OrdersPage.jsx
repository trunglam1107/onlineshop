import React, { useEffect, useState } from 'react'

export default function OrdersPage(){
  const [orders, setOrders] = useState([])
  useEffect(()=> setOrders(JSON.parse(localStorage.getItem('orders'))||[]),[])
  const q = new URLSearchParams(window.location.hash.split('?')[1])
  const id = q.get('id')
  if(id){
    const ord = orders.find(o=>o.id===id)
    if(!ord) return <div className='p-6'>Đơn hàng không tồn tại</div>
    return (
      <div className='p-6'>
        <h2 className='text-xl font-bold'>Chi tiết đơn {ord.id}</h2>
        <p>Trạng thái: {ord.status}</p>
        <p>Phương thức: {ord.paymentMethod}</p>
        <h3 className='mt-4 font-semibold'>Sản phẩm</h3>
        {ord.items.map(it=> <div key={it.id} className='flex justify-between py-1'>{it.name} x {it.qty} <span>{(it.price*it.qty).toLocaleString()}₫</span></div>)}
        <p className='mt-3 font-bold'>Tổng: {ord.total.toLocaleString()}₫</p>
        <div className='mt-3'>
          {ord.status==='Đang xử lý' && <button onClick={()=>{ if(confirm('Hủy đơn?')){ ord.status='Đã hủy'; localStorage.setItem('orders', JSON.stringify(orders)); alert('Đã hủy'); window.location.href='#/orders' }}} className='bg-red-600 text-white px-3 py-2 rounded'>Hủy đơn</button>}
          {(ord.status==='Đã hủy' || ord.status==='Hoàn thành') && <button onClick={()=>{ const cart = JSON.parse(localStorage.getItem('cart')||'[]'); ord.items.forEach(it=>{ const found = cart.find(c=>c.id===it.id); if(found) found.qty += it.qty; else cart.push({...it}); }); localStorage.setItem('cart', JSON.stringify(cart)); alert('Đã thêm vào giỏ'); window.location.href='#/'; }} className='bg-green-600 text-white px-3 py-2 rounded ml-2'>Mua lại</button>}
        </div>
      </div>
    )
  }

  return (
    <div className='p-6'>
      <h2 className='text-xl font-bold mb-4'>Lịch sử đơn hàng</h2>
      {orders.length===0? <p>Chưa có đơn</p> : orders.map(o=>(
        <div key={o.id} className='border p-3 rounded mb-2'>
          <p>Mã: {o.id}</p>
          <p>Ngày: {new Date(o.created).toLocaleString()}</p>
          <p>Tổng: {o.total.toLocaleString()}₫</p>
          <a href={`#/orders?id=${o.id}`} className='text-blue-600'>Xem chi tiết</a>
        </div>
      ))}
    </div>
  )
}
