import NavBar from '@/app/components/NavBar';
import { authOptions } from '@/lib/auth';
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
    const user = await res.json()
    let address: { state?: string } = {};
    if (user.address) {
      try {
        address = JSON.parse(user.address);
      } catch (error) {
        console.error("Error parsing address:", error);
      }
    }
    

  return (
    <div>
      <NavBar />
      <p>{user.name}</p>
      <p>{address.state || ""}</p>
    </div>
  )
}

export default page