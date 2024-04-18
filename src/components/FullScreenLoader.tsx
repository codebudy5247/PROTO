import { Loader2 } from 'lucide-react'
import React from 'react'

const FullScreenLoader = () => {
  return (
    <div className='w-screen h-screen fixed'>
      <div className='absolute top-64 left-1/2 -translate-x-1/2'>
      <Loader2 className="size-24 animate-spin" />
      </div>
    </div>
  )
}

export default FullScreenLoader