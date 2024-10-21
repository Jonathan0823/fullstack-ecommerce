import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import NavBar from '../components/NavBar'
import { Button } from '@/components/ui/button'

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isAdmin: boolean; // Added isAdmin property
}

const page = async() => {
  const session = await getServerSession(authOptions) as { user: User }


  return (
    <div>
      <NavBar />
      <div className='flex flex-col gap-3 px-10'>
      <div>DashBoard</div>
      <div>
      {session?.user.isAdmin && <Link href="/dashboard/admin"><Button className='w-24'>Admin Panel</Button></Link>}
      </div>
      <Link href={`/dashboard/user/${session?.user.id}`}><Button className='w-24'>User Profile</Button></Link>

      </div>
    </div>
  )
}

export default page