import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../shared/Header'
import Footer from '../shared/Footer'

const PRODUCTS = [
  { id:1, name:'Áo thun', price:150000, category:'Áo', image:'https://via.placeholder.com/600x400?text=Aothun', desc:'Áo thun cotton' },
  { id:2, name:'Quần jeans', price:350000, category:'Quần', image:'', desc:'Quần jeans' },
  { id:3, name:'Giày sneaker', price:650000, category:'Giày', image:'https://img2.dilyno.com/pta55kQnoPvo09cFz--T4ckdxzcf23AxJyj5iU4cdrQ/rs:fill:1200:1200:0/aHR0cHM6Ly9zMy1kaWx5LXdlYi5kaWx5bm8uY29tL3dlYmVjb20vMjAyNC8xMi9mMTk2ZDRiZTZiNjc5NjU0MGYxNjZkZTg2ZDg1N2U0Ni5wbmc.jpg', desc:'Giày sneaker' },
]

export default function Shop(){
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [slide, setSlide] = useState(0)
  const banners = [
    'https://img2.dilyno.com/pta55kQnoPvo09cFz--T4ckdxzcf23AxJyj5iU4cdrQ/rs:fill:1200:1200:0/aHR0cHM6Ly9zMy1kaWx5LXdlYi5kaWx5bm8uY29tL3dlYmVjb20vMjAyNC8xMi9mMTk2ZDRiZTZiNjc5NjU0MGYxNjZkZTg2ZDg1N2U0Ni5wbmc.jpg',
  ]

  useEffect(()=>{ const s = localStorage.getItem('cart'); if(s) setCart(JSON.parse(s)) },[])
  useEffect(()=> localStorage.setItem('cart', JSON.stringify(cart)),[cart])

  useEffect(()=>{
    const iv = setInterval(()=> setSlide(s => (s+1) % banners.length), 4000)
    return () => clearInterval(iv)
  },[])

  function addToCart(product){
    setCart(prev=>{
      const found = prev.find(p=>p.id===product.id)
      if(found) return prev.map(p=>p.id===product.id?{...p, qty:p.qty+1}:p)
      return [...prev, {...product, qty:1}]
    })
    setIsCartOpen(true)
  }

  const filtered = PRODUCTS.filter(p=>(category==='All'||p.category===category) && p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className='min-h-screen flex flex-col'>
      <Header cartCount={cart.reduce((s,i)=>s+i.qty,0)} onOpenCart={()=>setIsCartOpen(true)} onSearch={setSearch} />
      {/* Banner */}
      <div className='relative w-full h-64 md:h-80 overflow-hidden'>
        <AnimatePresence>
          <motion.img key={banners[slide]} src={banners[slide]} className='w-full h-full object-cover' initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} />
        </AnimatePresence>
        <div className='absolute inset-0 flex items-center justify-between px-4'>
          <button onClick={()=>setSlide(s=> (s-1+banners.length)%banners.length)} className='bg-black/40 text-white px-2 py-1 rounded'>◀</button>
          <button onClick={()=>setSlide(s=> (s+1)%banners.length)} className='bg-black/40 text-white px-2 py-1 rounded'>▶</button>
        </div>
      </div>

      {/* Filters */}
      <div className='max-w-6xl mx-auto p-4'>
        <div className='flex gap-2 mb-4 flex-wrap'>
          {['All','Áo','Quần','Giày'].map(c=>(
            <button key={c} onClick={()=>setCategory(c)} className={`px-3 py-1 rounded ${category===c?'bg-black text-white':'bg-gray-100'}`}>{c}</button>
          ))}
        </div>

        {/* Product Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {filtered.map(p=>(
            <div key={p.id} className='border rounded shadow p-3'>
              <img src={p.image} alt={p.name} className='h-44 w-full object-cover rounded cursor-pointer' onClick={()=>setSelectedProduct(p)} />
              <h3 className='font-semibold mt-2'>{p.name}</h3>
              <p className='text-red-600'>{p.price.toLocaleString()}₫</p>
              <div className='mt-2 flex gap-2'>
                <button className='bg-yellow-500 px-3 py-1 rounded' onClick={()=>addToCart(p)}>Thêm vào giỏ</button>
                <button className='border px-3 py-1 rounded' onClick={()=>setSelectedProduct(p)}>Chi tiết</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50' initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <motion.div className='bg-white p-4 rounded max-w-md w-full' initial={{scale:0.9}} animate={{scale:1}} exit={{scale:0.9}}>
              <img src={selectedProduct.image} className='w-full h-48 object-cover rounded' />
              <h2 className='text-xl font-bold mt-2'>{selectedProduct.name}</h2>
              <p className='text-gray-600'>{selectedProduct.desc}</p>
              <p className='text-red-600 font-semibold mt-2'>{selectedProduct.price.toLocaleString()}₫</p>
              <div className='flex gap-2 mt-3'>
                <button className='bg-green-600 text-white px-3 py-1 rounded' onClick={()=>{addToCart(selectedProduct); setSelectedProduct(null)}}>Thêm vào giỏ</button>
                <button className='border px-3 py-1 rounded' onClick={()=>setSelectedProduct(null)}>Đóng</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div className='fixed inset-0 flex justify-end z-40' initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <div className='absolute inset-0 bg-black/40' onClick={()=>setIsCartOpen(false)} />
            <motion.div className='relative bg-white w-80 h-full p-4' initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring',stiffness:300,damping:30}}>
              <h3 className='text-lg font-bold mb-3'>Giỏ hàng</h3>
              <div className='flex-1 overflow-y-auto'>
                {cart.length===0 ? <p>Giỏ hàng trống</p> : cart.map(item=>(
                  <div key={item.id} className='flex justify-between items-center border-b py-2'>
                    <div>
                      <p className='font-medium'>{item.name}</p>
                      <p className='text-sm'>{item.qty} x {item.price.toLocaleString()}₫</p>
                    </div>
                    <div>
                      <p>{(item.price*item.qty).toLocaleString()}₫</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className='mt-4'>
                <p className='font-bold'>Tổng: {cart.reduce((s,i)=>s+i.price*i.qty,0).toLocaleString()}₫</p>
                <div className='flex gap-2 mt-2'>
                  <a href="#/checkout" className='flex-1 text-center bg-black text-white py-2 rounded'>Thanh toán</a>
                  <button className='flex-1 bg-gray-200 py-2 rounded' onClick={()=>{localStorage.removeItem('cart'); setCart([])}}>Xóa giỏ</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
