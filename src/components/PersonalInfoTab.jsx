// Full PersonalInfoTab with cropper, zoom, rotate, reset and preview.
import React, { useState, useEffect, useCallback } from 'react'
import Cropper from 'react-easy-crop'

function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (err) => reject(err))
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
  })
}

function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180
}

// from react-easy-crop examples
async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const rotRad = getRadianAngle(rotation)

  const { width: bBoxWidth, height: bBoxHeight } = (function() {
    const c = document.createElement('canvas')
    const ctx = c.getContext('2d')
    ctx.save()
    ctx.translate(c.width/2, c.height/2)
    ctx.rotate(rotRad)
    ctx.restore()
    return { width: image.width, height: image.height }
  })()

  // set canvas large enough to contain rotated image
  const maxSize = Math.max(image.width, image.height) * 2
  canvas.width = maxSize
  canvas.height = maxSize

  ctx.translate(maxSize / 2, maxSize / 2)
  ctx.rotate(rotRad)
  ctx.drawImage(image, -image.width / 2, -image.height / 2)

  const data = ctx.getImageData(0, 0, maxSize, maxSize)

  const outputCanvas = document.createElement('canvas')
  outputCanvas.width = pixelCrop.width
  outputCanvas.height = pixelCrop.height
  const outCtx = outputCanvas.getContext('2d')

  outCtx.putImageData(
    data,
    Math.round(-pixelCrop.x),
    Math.round(-pixelCrop.y)
  )

  return outputCanvas.toDataURL('image/jpeg')
}

export default function PersonalInfoTab(){
  const [user, setUser] = useState({ name:'', email:'', avatar:'' })
  const [open, setOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState(null)
  const [crop, setCrop] = useState({ x:0, y:0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [preview, setPreview] = useState(null)

  useEffect(()=> {
    const s = JSON.parse(localStorage.getItem('user')) || {}
    setUser(s)
  },[])

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  },[])

  const handleFile = async (e) => {
    const f = e.target.files[0]
    if(!f) return
    const reader = new FileReader()
    reader.onload = () => {
      setImageSrc(reader.result)
      setOpen(true)
      setCrop({x:0,y:0}); setZoom(1); setRotation(0); setPreview(null)
    }
    reader.readAsDataURL(f)
  }

  const showPreview = async () => {
    if(!imageSrc || !croppedAreaPixels) return
    const p = await getCroppedImg(imageSrc, croppedAreaPixels, rotation)
    setPreview(p)
  }

  const saveCropped = async () => {
    if(preview){
      setUser(prev=>({...prev, avatar:preview}))
      setOpen(false)
      setPreview(null)
    }
  }

  const reset = ()=>{ setCrop({x:0,y:0}); setZoom(1); setRotation(0); setPreview(null) }

  const saveProfile = ()=> {
    localStorage.setItem('user', JSON.stringify(user))
    alert('Lưu thành công')
  }

  const removeAvatar = ()=> setUser(prev=>({...prev, avatar:''}))

  return (
    <div className='space-y-6'>
      <h3 className='text-lg font-bold'>👤 Thông tin cá nhân</h3>
      <div className='flex items-center gap-4'>
        <img src={user.avatar || 'https://via.placeholder.com/100'} className='w-20 h-20 rounded-full object-cover border' alt='avatar'/>
        <div className='space-y-2'>
          <label className='bg-gray-200 px-3 py-2 rounded cursor-pointer'>📷 Đổi ảnh<input type='file' accept='image/*' onChange={handleFile} className='hidden'/></label>
          {user.avatar && <button onClick={removeAvatar} className='bg-red-500 text-white px-3 py-2 rounded'>❌ Xóa avatar</button>}
        </div>
      </div>
      <input className='border p-2 w-full rounded' placeholder='Tên' value={user.name||''} onChange={e=>setUser({...user, name:e.target.value})} />
      <input className='border p-2 w-full rounded' placeholder='Email' value={user.email||''} onChange={e=>setUser({...user, email:e.target.value})} />
      <div className='flex gap-2'>
        <button onClick={saveProfile} className='bg-blue-600 text-white px-4 py-2 rounded'>Lưu</button>
      </div>

      {open && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'>
          <div className='bg-white p-4 rounded w-[520px] h-[640px]'>
            <div className='relative w-full h-72 bg-gray-200'>
              <Cropper image={imageSrc} crop={crop} zoom={zoom} rotation={rotation} aspect={1}
                onCropChange={setCrop} onZoomChange={setZoom} onRotationChange={setRotation} onCropComplete={onCropComplete} />
            </div>
            <div className='mt-3'>
              <label className='block'>🔍 Zoom</label>
              <input type='range' min={1} max={3} step={0.1} value={zoom} onChange={e=>setZoom(Number(e.target.value))} className='w-full'/>
              <label className='block mt-2'>↩️ Xoay</label>
              <input type='range' min={0} max={360} step={1} value={rotation} onChange={e=>setRotation(Number(e.target.value))} className='w-full'/>
            </div>

            {preview && <div className='mt-3'><h4 className='font-semibold'>Preview</h4><img src={preview} alt='preview' className='w-24 h-24 rounded-full mt-2'/></div>}

            <div className='flex justify-end gap-2 mt-4'>
              <button onClick={reset} className='px-3 py-2 bg-yellow-500 text-white rounded'>🔄 Reset</button>
              <button onClick={()=>{setOpen(false); setPreview(null)}} className='px-3 py-2 bg-gray-300 rounded'>Hủy</button>
              <button onClick={showPreview} className='px-3 py-2 bg-yellow-600 text-white rounded'>👀 Preview</button>
              <button onClick={saveCropped} className='px-3 py-2 bg-blue-600 text-white rounded'>Lưu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
