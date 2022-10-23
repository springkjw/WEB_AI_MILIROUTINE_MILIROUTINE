import { Header } from '@/components/Element';
import { RankedRoutineRow } from '@/components/Element/RankedRoutineRow';
import ArrowDown from '@/assets/arrow-down.png';
import { useEffect, useState } from 'react';

export const PopularPage = () => {
  let [row, setRow] = useState<number[]>([0, 1]);

  return (
    <>
      <Header />
      {row.map((i, idx) => (
        <RankedRoutineRow key={idx} from={i * 5 + 1} to={i * 5 + 5} />
      ))}
      <button
        className="py-10 flex justify-center"
        onClick={() => {
          setRow((row) => [...row, row[row.length - 1] + 1]);
          console.log(row);
        }}>
        <img src={ArrowDown} />
      </button>
    </>
  );
};
