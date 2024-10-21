import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const CategoryForm = () => {
  return (
    <div className='bg-white p-5 rounded-xl shadow-md w-full lg:w-[400px]'>
        <form>
            <p className='font-semibold mb-2'>Create Category</p>
            <p className='text-sm'>Image</p>
            <Input type='file' />
            <p className='text-sm'>Name</p>
            <Input placeholder='Category Name' />

            <Button className='mt-3'>Create</Button>


        </form>
    </div>
  )
}

export default CategoryForm