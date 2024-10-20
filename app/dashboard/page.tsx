import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import NavBar from '../components/NavBar'

const page = async() => {
  const session = await getServerSession(authOptions)

  return (
    <div>
      <NavBar />
      <div>DashBoard</div>
      <Link href={`/dashboard/user/${session?.user.id}`}>user Profile</Link>
    </div>
  )
}

export default page