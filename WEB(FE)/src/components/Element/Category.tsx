import { useState } from "react"

interface CategoryProps {
  label: string
}

export const Category = ({ label }: CategoryProps) => {

  let [checked, setClicked] = useState(false);

  return (
    <button className={`w-32 h-32 rounded-2xl ${!checked ? 'bg-white-200' : 'bg-orange'}`}

      onClick={() => {
        setClicked(checked => !checked)
      }}>

      <p className={`text-center text-2xl font-semibold ${!checked ? 'text-gray-400' : 
      'text-white-200'}`}>{label}</p>
    </button>


  )
}
