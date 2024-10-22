import NavBar from '@/app/components/NavBar'
import { BACKEND_URL } from '@/lib/constant'
import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
    const res = await fetch(`${BACKEND_URL}/products/${params.id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const product = await res.json()
  return (
    <div>
        <NavBar />
        <div className="bg-white p-6 shadow-lg flex-col gap-5">
            <h1 className="text-2xl font-bold ">{product.name}</h1>
            <div className="mt-5">
            <div className="flex flex-col gap-5">
                <img src={product.image} alt={product.name} className="w-1/2" />
                <p>{product.description}</p>
                <p>{product.price}</p>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Page