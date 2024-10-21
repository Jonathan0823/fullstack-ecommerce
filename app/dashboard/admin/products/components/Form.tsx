"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'



interface ProductFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ handleSubmit }) => {

  
  return (
    <div className='bg-white p-5 rounded-xl shadow-md w-full lg:w-[400px]'>
        <form onSubmit={handleSubmit}>
            <p className='font-semibold mb-2'>Create Product</p>
            <p className='text-sm'>Image</p>
            <Input type='file' />
            <p className='text-sm'>Name</p>
            <Input placeholder='Category Name' />

            <Button className='mt-3' type='submit'>Create</Button>


        </form>
    </div>
  )
}

export default ProductForm