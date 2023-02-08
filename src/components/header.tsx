import { useState, useCallback } from "react";

import axios from "axios";

import { MapPinIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export const getCEP = (cep: number) => {
  axios.get(`https://viacep.com.br/ws/${cep}/json/`)
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.log('Digite um cep válido')
  })
}

getCEP(31035480)

export const Header = () => {
  const[cep, setCep] = useState('')

  const handleCep = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentCep = e.target.value
    setCep(currentCep)
  }

  return (
    <div className="bg-purple-600">
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
            <div>
              <a href="/" className="flex">
                <span className="flex rounded-lg bg-purple-800 p-2">
                  <MapPinIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                <p className="ml-3 truncate font-bold text-white text-3xl">
                  CEP app
                </p>
              </a>
            </div>

          <div className="flex flex-shrink-0 sm:order-3 sm:ml-3">
            <input
              type="text"
              className="-mr-1 text-center flex rounded-md p-2 hover:bg-purple-500 focus:outline-none focus:bg-purple-500 focus:ring-2 focus:ring-white focus:text-white sm:-mr-2 "
              placeholder="00000-000"
              onChange={handleCep}
            />

            <button
              type="button"
              className="-mr-1 flex rounded-md p-2 ml-4 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
              // onClick={getCEP}
            >
              <MagnifyingGlassIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}