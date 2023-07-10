import { ChangeEvent } from "react"
import { optionType } from "../types"

type Props = {
    term:string
    options:[]
    onInputChange: (e:ChangeEvent<HTMLInputElement>) => void
    onOptionSelect: (option: optionType) => void
    onSubmit: () => void 
}

function Search({term,options,onInputChange,onOptionSelect,onSubmit}: Props): JSX.Element {
  return (
      <section className="bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded">
        <h1 className="text-4x1 font-thin"> Weather <span className="font-medium">Forecast</span></h1>
        <p className=" text-sm mt-2">Enter below a place you want to know the weather of and select an option from dropdown</p>
        <div className="relative flex mt-10 md:mt-4">
        <input onChange={onInputChange} type="text" value={term} className="px-2 py-1 rounded-l-md border-2 border-white" />
        <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
          {options.map((option : optionType,index: number) => (
          <li key={option.name + '-' + index}>
            <button onClick={() => onOptionSelect(option)}>
                {option.name}              
            </button>
          </li>
          ))}
        </ul>
        <button className="rounded-r-md" onClick={onSubmit}>
        search
        </button>
        </div>
      </section>
  )
}

export default Search
