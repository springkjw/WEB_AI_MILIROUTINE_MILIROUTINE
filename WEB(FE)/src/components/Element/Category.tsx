import { useState } from 'react';

interface CategoryProps {
  label: string;
}

export const Category = ({ label }: CategoryProps) => {
  let [checked, setClicked] = useState(false);

  const toggleClicked = () => {
    setClicked((checked) => !checked);
  };

  return (
    <button
      className={`w-32 h-32 rounded-2xl text-center text-xl font-semibold m-1 ${
        !checked ? 'bg-white-200 text-gray-400' : 'bg-orange text-white-200'
      }`}
      onClick={toggleClicked}>
      {label}
    </button>
  );
};
