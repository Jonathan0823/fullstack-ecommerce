import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'

const page = async() => {
  const session = await getServerSession(authOptions)

  return (
    <div>
      <div>DashBoard</div>
      <Link href={`/dashboard/user/${session?.user.id}`}>user Profile</Link>
    </div>
  )
}

export default page