'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Signinoutbutton from './Signinoutbutton'
import Image from 'next/image'
import Cart from './Cart'


const navigation = {    
  pages: [
    { name: 'Home', href: '/' },
  ],
}



export default function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white z-50 ">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0 z-50"
        />

        <div className="fixed inset-0 z-50 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-blue-100 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5 z-50">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                    {page.name}
                  </a>
                </div>
              ))}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-blue-100">

        <nav aria-label="Top" className="max-w-full px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>
              

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
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
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-700">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6" />
                  </a>
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