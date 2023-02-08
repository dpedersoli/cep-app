import { useState, useCallback } from "react";
import axios from "axios";

import { Footer } from './components/footer'

import { MapPinIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

type TCep = {
  cep: number |& string,
  logradouro: string,
  bairro: string,
  cidade: string,
  uf: string
}

function App() {
  const[cep, setCep] = useState('')
  const[allCeps, setAllCeps] = useState<TCep[]>([{
    cep: '31035480',
    logradouro: 'Rua Santo Agostinho',
    bairro: 'Sagrada Família',
    cidade: 'Belo Horizonte',
    uf: 'MG'
  },
  {
    cep: '31035480',
    logradouro: 'Rua Santo Agostinho',
    bairro: 'Sagrada Família',
    cidade: 'Belo Horizonte',
    uf: 'MG'
  },
  {
    cep: '31035480',
    logradouro: 'Rua Santo Agostinho',
    bairro: 'Sagrada Família',
    cidade: 'Belo Horizonte',
    uf: 'MG'
  },
  {
    cep: '31035480',
    logradouro: 'Rua Santo Agostinho',
    bairro: 'Sagrada Família',
    cidade: 'Belo Horizonte',
    uf: 'MG'
  }])

  const getCEP = useCallback((e: any, cep: any) => {
    e.preventDefault();

    axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    .then((response: any) => {
      // console.log(response.data.cep)
      // console.log(response.data.logradouro)
      // console.log(response.data.bairro)
      // console.log(response.data.cidade)
      // console.log(response.data.uf)
      })
      .catch((error: any) => {
        // setError(error.message);
      })
      .finally(() => {
        // setAllCeps()
      });
  },[cep]
);

  const handleCep = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentCep = e.target.value
    setCep(currentCep)
  }

  return (
    <div>
      <header className="bg-purple-600">
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
      </header>

      <main className="flex justify-center items-center content-center min-h-[81vh] h-fit">
        <div className="flex flex-col items-center justify-between bg-gray-200 min-w-[90vw] w-fit h-fit h-min-[50vh] p-4 rounded-xl">
          {allCeps.map((cep) => {
            return(
              <div className="flex justify-between my-1 bg-purple-400 rounded-xl p-4 w-full">
                <div>
                <p className="text-white text-3xl font-bold">{cep.cep}</p>
                <p className="text-white text-lg">{cep.logradouro} - {cep.bairro}, {cep.cidade} - {cep.uf}</p>
                </div>
                <button
                className="bg-red-500 text-white h-8 w-8 rounded-lg hover:bg-red-600 active:bg-red-700"
                // onClick={removeCep}
                >
                X  
                </button>
              </div>
            )
            })}
            <div>
              <button
              className="bg-white font-bold px-4 py-1 rounded-lg mt-3 hover:bg-gray-50 active:bg-purple-600 focus:ring-1"
              // onClick={removeAllCeps}
              >
                remove all CEPs
              </button>
            </div>
        </div>
      </main>

      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default App