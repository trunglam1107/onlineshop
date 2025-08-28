import React, { useState, useEffect } from 'react'

export default function CheckoutPage(){
  const [cart, setCart] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [method, setMethod] = useState('COD')

  useEffect(()=>{ const c = JSON.parse(localStorage.getItem('cart'))||[]; setCart(c); const user = JSON.parse(localStorage.getItem('user'))||{}; if(user.name) setName(user.name); if(user.address) setAddress(user.address); if(user.phone) setPhone(user.phone)},[])

  const total = cart.reduce((s,i)=>s+i.price*i.qty,0)

  const place = ()=>{
    if(!name||!phone||!address){ alert('Nhập đầy đủ thông tin'); return }
    const orders = JSON.parse(localStorage.getItem('orders')||'[]')
    const id = 'ORD-'+Date.now()
    const order = { id, items:cart, total, status:'Đang xử lý', shipping:{name,phone,address}, paymentMethod:method, created: new Date().toISOString() }
    orders.unshift(order)
    localStorage.setItem('orders', JSON.stringify(orders))
    localStorage.removeItem('cart')
    alert('Đặt hàng thành công!')
    window.location.href = '#/orders'
  }

  return (
    <div className='min-h-screen p-6 bg-gray-50'>
      <div className='max-w-5xl mx-auto grid md:grid-cols-2 gap-6'>
        <div className='bg-white p-4 rounded shadow'>
          <h3 className='font-bold mb-2'>Tóm tắt giỏ hàng</h3>
          {cart.length===0? <p>Giỏ hàng trống</p> : cart.map(it=>(
            <div key={it.id} className='flex justify-between border-b py-2'><div>{it.name} x {it.qty}</div><div>{(it.price*it.qty).toLocaleString()}₫</div></div>
          ))}
          <p className='font-bold mt-3'>Tổng: {total.toLocaleString()}₫</p>
        </div>
        <div className='bg-white p-4 rounded shadow'>
          <h3 className='font-bold mb-2'>Thông tin giao hàng</h3>
          <input className='border p-2 w-full rounded mb-2' placeholder='Họ tên' value={name} onChange={e=>setName(e.target.value)} />
          <input className='border p-2 w-full rounded mb-2' placeholder='Số điện thoại' value={phone} onChange={e=>setPhone(e.target.value)} />
          <textarea className='border p-2 w-full rounded mb-2' placeholder='Địa chỉ' value={address} onChange={e=>setAddress(e.target.value)} />
          <h4 className='font-semibold'>Phương thức thanh toán</h4>
          <div className='space-y-2'>
            <label><input type='radio' name='p' checked={method==='COD'} onChange={()=>setMethod('COD')} /> COD</label>
            <label><input type='radio' name='p' checked={method==='Bank'} onChange={()=>setMethod('Bank')} /> Chuyển khoản</label>
            <label><input type='radio' name='p' checked={method==='E-Wallet'} onChange={()=>setMethod('E-Wallet')} /> Ví điện tử</label>
          </div>
          <button className='mt-3 bg-blue-600 text-white px-4 py-2 rounded' onClick={place}>Đặt hàng</button>
        </div>
      </div>
    </div>
  )
}
