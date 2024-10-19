"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

const Signinoutbutton = () => {
    const {data: session} = useSession()

  return (
    <div>{session? <button>sign out</button>: <button>sign in</button>}</div>
  )
}

export default Signinoutbutton