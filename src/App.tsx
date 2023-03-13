// 1 - validar se o CEP já existe
// 2 - remover 1 item específico

import { useState } from "react";
import {api} from './services/api'

import { Footer } from './components/footer'

import { MapPinIcon, MagnifyingGlassIcon, TrashIcon } from '@heroicons/react/24/outline'

type TCep = {
  cep: any,
  logradouro: string,
  bairro: string,
  localidade: string,
  uf: string
}

//still need to improve the useState + check for repeated data + delete functions

function App() {
  const [inputCep, setInputCep] = useState<TCep>({
    cep: "",
    logradouro: "",
    bairro: "",
    localidade: "",
    uf: ""
  } as TCep)
  const [cepList, setCepList] = useState<TCep[]>([])
  const [isValidCep, setIsValidCep] = useState(false)
  const [isCharacterValid, setIsCharacterValid] = useState(false)

  const isCharacterAccepted = /^[0-9]{8}$/;

  /////////////// Pegar o valor de "reponse.data.cep" -> fazer o loop dentro da array e fazer um loop dentro de cada object e verificar o "item.cep"

  let valueArr = cepList.map((item) => {
    return item.cep //aqui eu já tenho o retorno da array com os itens 'cep' dentro de 'cepList' -> daqui eu pego o valor de cada item dentro da array e comparo com o 'input.value'
  });

  for (let i = 0; i < valueArr.length; i++) {
    let cepTest = valueArr[i]
    
    if(inputCep.cep == cepTest){
      return console.log('repeated')
    }
  }


  /////////

  const getCEP = (e: any) => {
    e.preventDefault();

    api
    .get(inputCep.cep + '/json')
    .then(response => {
      
      
      if (response.data.cep == null) {
        setIsValidCep(true)
        setIsCharacterValid(false)
      } else {
        setCepList([...cepList, response.data]);
        setIsValidCep(false)
        setIsCharacterValid(false)
        console.log("cepList:", cepList)
      }

    })
    
    .catch(() =>{
      if(isCharacterAccepted.test(inputCep.cep) === false){
        setIsCharacterValid(false)
        setIsValidCep(false)
      }

    })
    .finally(() => {

    })
  }

  const removeCep = () => {
    console.log("not yet done")
  }

  const removeAllCeps = () => {
    setCepList([])
    setIsValidCep(false)
    setIsCharacterValid(false)
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
                className="-mr-1 flex rounded-md p-2 ml-4 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
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
        
      </header>

      <main className="flex justify-center items-center content-center min-h-[81vh] h-fit">
        {cepList.length > 0 &&
          <div className="flex flex-col items-center justify-between bg-gray-200 min-w-[90vw] w-fit h-fit h-min-[50vh] p-4 rounded-xl my-4">
            {cepList.map((cep, id) => {
              return(
                <div className="flex justify-between my-1 bg-purple-400 rounded-xl p-4 w-full" key={id}>
                  <div>
                  <p className="text-white text-3xl font-bold">{cep.cep}</p>
                  <p className="text-white text-lg">{cep.logradouro} - {cep.bairro}, {cep.localidade} - {cep.uf}</p>
                  </div>
                  <button
                  className="bg-red-500 text-white h-6 w-5 rounded-md hover:bg-red-600 active:bg-red-700"
                  onClick={removeCep}
                  >
                  <TrashIcon className="h-4 w-5 text-white" aria-hidden="true" />  
                  </button>
                </div>
              )
              })}
              <div>
                <button
                className="flex bg-white font-bold px-4 py-1 rounded-lg mt-3 hover:bg-gray-50 active:bg-purple-600 focus:ring-1"
                onClick={removeAllCeps}
                >
                  remove all CEPs
                  <TrashIcon className="ml-2 h-5 w-5 text-red-600" aria-hidden="true" /> 
                </button>
              </div>
          </div>
        }
      </main>

      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default App