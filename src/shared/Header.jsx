import React from 'react'

export default function Header({ cartCount=0, onOpenCart=()=>{}, onSearch=()=>{} }){
  return (
    <header className='bg-white shadow p-4 sticky top-0 z-20'>
      <div className='max-w-6xl mx-auto flex items-center justify-between'>
        <h1 className='text-xl font-bold'><a href='#/'>My Shop</a></h1>
        <div className='flex items-center gap-3'>
          <input onChange={(e)=>onSearch(e.target.value)} placeholder='Tìm kiếm...' className='border px-2 py-1 rounded' />
          <button onClick={onOpenCart} className='relative'>
            🛒
            {cartCount>0 && <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2'>{cartCount}</span>}
          </button>
          <a href='#/login' className='text-sm'>Đăng nhập</a>
        </div>
      </div>
    </header>
  )
}
