import { useState, useCallback, useEffect } from "react";
import {api} from './services/api'

import { Footer } from './components/footer'

import { MapPinIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

type TCep = {
  cep: any,
  logradouro: string,
  bairro: string,
  cidade: string,
  uf: string
}

function App() {
  const [cepList, setCepList] = useState([])
  const [allCeps, setAllCeps] = useState<TCep>({ //passar esse object para dentro de uma ARRAY e a partir dessa array eu dou o '.map'
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: ""
  } as TCep)

  const getCEP = (e: any) => {
    e.preventDefault();

    api
    .get(allCeps.cep + '/json')
    .then(response =>{
      let ceps = []
      ceps.push(response.data)
      localStorage.setItem("ceps", JSON.stringify(ceps)) //so far so good -> preciso manter os valores anteriores e não sobescrevê-los com um novo -> e posteriormente mostrar todos os valores
      
      const newCeps = response.data
      setCepList(newCeps)
    })
    .catch(error =>{
      
    })
    .finally(() => {
      let teste = localStorage.getItem("ceps")
      console.log("TESTE" + teste)
      console.log("CEPLIST" + cepList)
    })
  }

  // const getCEP = useCallback((e: any) => {
  //   e.preventDefault();

  //   if (cep.toString().length < 8) {
  //     return (console.log('Insira o CEP completo (8 dígitos)'))
  //   } else if (isNaN(Number(cep)) || !cep) {
  //     return (console.log('Insira somente números'))
  //   }

  //   api.get(cep + '/json')
  //   .then((response) => {
  //     setAllCeps(response.data)
  //     setCep('')
      
  //     console.log(allCeps)
  //     })
  //     .catch((error) => {
  //       // setError(error.message);
  //     })
  //     // .finally(() => {
  //     //   setAllCeps()
  //     // });
  //   },[cep]
  // );

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
              onChange={(e) => setAllCeps({ ...allCeps, cep: e.target.value })}
              // value={cep}
              required
              maxLength={8}
            />

            <button
              type="button"
              className="-mr-1 flex rounded-md p-2 ml-4 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
              onClick={getCEP}
            >
              <MagnifyingGlassIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      </header>

      <main className="flex justify-center items-center content-center min-h-[81vh] h-fit">
        {/* {allCeps.length > 1 &&
          <div className="flex flex-col items-center justify-between bg-gray-200 min-w-[90vw] w-fit h-fit h-min-[50vh] p-4 rounded-xl">
            {allCeps.map((cep, id) => {
              return(
                <div className="flex justify-between my-1 bg-purple-400 rounded-xl p-4 w-full" key={id}>
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
        } */}
      </main>

      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default App