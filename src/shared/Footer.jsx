import React from 'react'

export default function Footer(){
  return (
    <footer className='bg-gray-900 text-white p-6 mt-8'>
      <div className='max-w-6xl mx-auto text-center'>
        <p>Địa chỉ: 123 Đường ABC, TP.HCM | Điện thoại: 0909 123 456 | Email: info@shop.com</p>
        <div className='flex justify-center gap-4 mt-3'>
          <a href='#' className='hover:text-blue-400'>Facebook</a>
          <a href='#' className='hover:text-pink-400'>Instagram</a>
          <a href='#' className='hover:text-red-400'>TikTok</a>
        </div>
      </div>
    </footer>
  )
}
