'use client'

import { useState } from 'react'

import {  MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Signinoutbutton from './Signinoutbutton'
import Image from 'next/image'
import Cart from './Cart'
import { Input } from '@/components/ui/input'


const navigation = {    
  pages: [
    { name: 'Home', href: '/' },
  ],
}



export default function NavBar() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    window.location.href = `/search/${searchQuery}`
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-white z-50 ">
      

      <header className="relative bg-blue-100">

        <nav aria-label="Top" className="max-w-full px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              
              

              {/* Logo */}
              <div className="mr-2 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <Image
                    alt=""
                    src="/images/logo.png"
                    className="lg:h-10 w-auto h-6"
                    width={64}
                    height={64}
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="ml-auto flex items-center">
                

                {/* Search */}
                <div className="relative flex lg:ml-6 items-center">
                  <Input
                    type="text"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search"
                    className="p-2 pl-10 bg-white border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Cart */}
                <div className="ml-0 flow-root lg:ml-2">
                  <a href="#" className="group -m-2 flex items-center p-2">
            
                    <Cart />
                    
                  </a>
                </div>
                <div className="flex flex-1 items-center justify-end space-x-6">
                    <Signinoutbutton />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}