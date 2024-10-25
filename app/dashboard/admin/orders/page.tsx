import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { TableOrders } from './components/Table'

const page = () => {
  return (
    <div>
    <div className="bg-white p-6 shadow-lg flex gap-5">
      <SidebarTrigger className="lg:hidden" />
      <h1 className="text-2xl font-bold ">Orders</h1>
    </div>
      <TableOrders />
  </div>
  )
}

export default page