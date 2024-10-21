import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import NavBar from '../components/NavBar'

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
      <div>DashBoard</div>
      <div>
      {session?.user.isAdmin && <Link href="/dashboard/admin">Admin Dashboard</Link>}
      </div>
      <Link href={`/dashboard/user/${session?.user.id}`}>user Profile</Link>
    </div>
  )
}

export default page