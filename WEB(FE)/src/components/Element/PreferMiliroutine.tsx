import { ReactComponent as CheckGray } from '@/assets/check_gray.svg';
import { ReactComponent as CheckWhite } from '@/assets/check_white.svg';
import { useState } from 'react';

interface PreferMiliroutineProps {
  label: string;
}

export const PreferMiliroutine = ({ label }: PreferMiliroutineProps) => {
  let [checked, setClicked] = useState(false);

  const toggleClicked = () => {
    setClicked((checked) => !checked);
  };

  return (
    <button
      className={`rounded-2xl font-lg font-semibold p-4 m-1  ${
        !checked ? 'bg-white-200 text-gray-400' : 'bg-orange text-white-200'
      }`}
      onClick={toggleClicked}>
      <div className="flex">
        {!checked ? <CheckGray /> : <CheckWhite />}
        <p className="ml-5">{label}</p>
      </div>
    </button>
  );
};

//svg 이모티콘 사용하면 내부 label이 줄바꿈이 되어버림. 수정도 안먹혀서 일단 보류.
//일단 내부 글자 패딩은 안맞춰뒀음.
