import { BACKEND_URL } from '@/lib/constant'
import React from 'react'

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductListsProps {
  products: Product[];
}

const ProductLists: React.FC<ProductListsProps> = ({ products }) => {

  return (
    <div className='bg-white p-5 rounded-xl shadow-md flex-1'>
      <p className='font-semibold mb-2 border-b-2 pb-2'>Product List</p>
        {products.map((product: Product) => (
          <div key={product.id}>
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
        ))}
    </div>
  )
}

export default ProductLists