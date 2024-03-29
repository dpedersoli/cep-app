import { useEffect, useState } from "react";
import { api } from './services/api'

import { Footer } from './components/Footer'

import { MapPinIcon, MagnifyingGlassIcon, TrashIcon } from '@heroicons/react/24/outline'

import './app.css'

type TCep = {
  cep: any,
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string
}

export function App() {
  const [inputCep, setInputCep] = useState<TCep>({
    cep: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    localidade: "",
    uf: ""
  } as TCep)
  const [cepList, setCepList] = useState<TCep[]>([])
  const [isValidCep, setIsValidCep] = useState(false)
  const [isCharacterValid, setIsCharacterValid] = useState(false)
  const [isCepDuplicated, setIsCepDuplicated] = useState(false)

  const isCharacterAccepted = /^[0-9]{8}$/;

  const localStorageCepList = JSON.stringify(cepList)
  const storageCepList = localStorage.getItem('@cep-app:cep-list-1.0.0')

  useEffect(() => {
    if(cepList.length >= 0){
      localStorage.setItem('@cep-app:cep-list-1.0.0', localStorageCepList)
    } 
  },[cepList])
  
  useEffect(() => {
    if(storageCepList){
      setCepList(JSON.parse(storageCepList))
    }
  },[])

  const getCEP = async (e: any) => {
    e.preventDefault();

    try {

      if (!checkIfCEPExists(inputCep.cep)) {
        const response = await api
          .get(inputCep.cep + '/json')

        if (response.data.cep == null) {
          setIsValidCep(true)
          setIsCharacterValid(false)
          setIsCepDuplicated(false)
        } else {
          setCepList([...cepList, response.data]);
          setIsValidCep(false)
          setIsCharacterValid(false)
          setIsCepDuplicated(false)
        }
      } else {
        setIsCepDuplicated(true)
        setIsValidCep(false)
        setIsCharacterValid(false)
      }

    } catch (e) {
      if (isCharacterAccepted.test(inputCep.cep) === false) {
        setIsCharacterValid(true)
        setIsValidCep(false)
        setIsCepDuplicated(false)
      }
    }

  }

  const valueArr = cepList.map((item) => {
    return item.cep.replace('-', '')
  });

  const checkIfCEPExists = (curentCepInput: string) => {
    for (let i = 0; i < valueArr.length; i++) {

      if (curentCepInput == valueArr[i]) {
        return true;
      }

    }

  }

  const removeCep = (cepId: any) => {
    const cepListCopy = cepList
    const result = cepListCopy.filter((cep) => cep.cep != cepId.cep)
    setCepList(result)
  }

  const removeAllCeps = () => {
    setCepList([])
    setIsValidCep(false)
    setIsCharacterValid(false)
    setIsCepDuplicated(false)
  }

  return (
    <div className="body">
      <header className="header bg-purple-600">
        <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
          <div className="header-query flex flex-wrap items-center justify-between">
            <div className="logo">
              <a href="/" className="flex">
                <span className="flex rounded-lg bg-purple-800 p-2">
                  <MapPinIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                <p className="ml-3 truncate font-bold text-white text-3xl">
                  CEP app
                </p>
              </a>
            </div>

            <form onSubmit={getCEP} className="flex flex-shrink-0 sm:order-3 sm:ml-3">
              <input
                type="text"
                className="-mr-1 text-center flex rounded-md p-2 hover:bg-purple-500 focus:outline-none focus:bg-purple-500 focus:ring-2 focus:ring-white focus:text-white sm:-mr-2 "
                placeholder="00000-000"
                onChange={(e) => setInputCep({ ...inputCep, cep: e.target.value })}
                value={inputCep.cep}
                required
                maxLength={8}
              />

              <button
                type="submit"
                className="-mr-1 flex rounded-md p-2 ml-4 hover:bg-purple-500 focus:outline-none ring-2 ring-white sm:-mr-2"
              >
                <MagnifyingGlassIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>

        {isValidCep &&
          <p className="text-white text-center bg-red-500">Digite um CEP existente</p>
        }
        {isCharacterValid &&
          <p className="text-white text-center bg-red-500">Digite somente números (8 números)</p>
        }
        {isCepDuplicated &&
          <p className="text-white text-center bg-red-500">Esse CEP já está na lista. Digite um CEP diferente</p>
        }

      </header>

      <main className="main flex justify-center items-center content-center min-h-[86vh] h-fit">
        {cepList.length > 0 &&
          <div className="flex flex-col items-center justify-between bg-gray-200 min-w-[90vw] w-fit h-fit h-min-[50vh] p-4 rounded-xl my-4">
            {cepList.map((cep, id) => {
              return (
                <div className="flex justify-between my-1 bg-purple-400 rounded-xl p-4 w-full" key={id}>
                  <div>
                    <p className="text-white text-3xl font-bold">{cep.cep}</p>
                    <p className="text-white text-lg">{cep.logradouro}, {cep.complemento} - {cep.bairro}, {cep.localidade} - {cep.uf}</p>
                  </div>
                  <button
                    className="bg-red-500 text-white h-6 w-5 rounded-md hover:bg-red-600 active:bg-red-700"
                    onClick={() => { removeCep(cep) }}
                  >
                    <TrashIcon className="h-4 w-5 text-white" aria-hidden="true" />
                  </button>
                </div>
              )
            })
            }
            <div>
              <button
                className="flex bg-white font-bold px-4 py-1 rounded-lg mt-3 hover:bg-gray-50 active:bg-purple-600 focus:ring-1"
                onClick={removeAllCeps}
              >
                exclua todos os CEPs
                <TrashIcon className="ml-2 h-5 w-5 text-red-600" aria-hidden="true" />
              </button>
            </div>
          </div>
        }
      </main>

      <footer>
        <Footer />
      </footer>
    </div>

  )
}