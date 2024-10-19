import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { BACKEND_URL } from '@/lib/constant'
import { getServerSession } from 'next-auth';
import React from 'react'

const page = async ({params}: {params: {id: string}}) => {
    const session = await getServerSession(authOptions);
    
    const res = await fetch(`${BACKEND_URL}/user/${params.id}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${session?.backendTokens.accessToken}`,
            'Content-Type': 'application/json',
        },
    })
    console.log(res)
    const user = await res.json()
    

  return (
    <div>{user.name}</div>
  )
}

export default page