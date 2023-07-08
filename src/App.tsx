import { ChangeEvent, useState,useEffect } from "react"
import { optionType } from "./types"


function App(): JSX.Element {
  const [term,setTerm] = useState<string>('')
  const [city,setCity] = useState<optionType | null> (null)
  const [options,setOptions] = useState<[]>([])

  const getSearchOptions = (value: string) => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${import.meta.env.VITE_REACT_APP_API_KEY}`)
    .then(res => res.json())
    .then((data) => setOptions(data))
  }

  const onInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setTerm(value);

    if(value === '') return 
    getSearchOptions(value)
  }

  const getForecast = (city: optionType) => {
    fetch(`https://api.openweathermap.org/data/2.5 /weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${import.meta.env.VITE_REACT_APP_API_KEY}`)
    .then(res => res.json())
    .then(data => console.log({data}))
  }

  const onSubmit = () =>{
    if(!city) return
    getForecast(city)
  }

  const onOptionSelect = (option: optionType) => {
    setCity(option)
  }

  useEffect(() => {
    if(city){
      setTerm(city.name)
      setOptions([])
    }
  }, [city])
  
  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
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
    </main>
  )
}

export default App
