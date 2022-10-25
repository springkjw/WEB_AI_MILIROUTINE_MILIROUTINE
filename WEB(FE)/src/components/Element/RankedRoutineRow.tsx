import translateCategory from '@/utils/translateCategory';
import { useCallback, useEffect, useState } from 'react';
import { RoutineItem } from '.';

export const fetchRankedRoutine = async (from: number, to: number) => {
  const SERVER_URL: string = 'http://localhost:3000'; // 임시
  const url: string = SERVER_URL + `/popular?from=${from}&to=${to}`;
  const response = await fetch(url);
  const json = await response.json();
  return json.rankedRoutine;
};

interface RankedRoutineRowProps {
  from: number;
  to: number;
}

export const RankedRoutineRow = ({ from, to }: RankedRoutineRowProps) => {
  const [routines, setRoutines] = useState<any[]>([]);

  useEffect(() => {
    fetchRankedRoutine(from, to).then(setRoutines);
  }, []);

  return (
    <>
      {routines.length ? (
        <div className="ml-48 mt-12 max-w-screen-lg">
          <h2 className="text-xl font-bold">
            {from} ~ {to}위
          </h2>
          <div className="flex justify-between mt-6">
            {routines.map((routine, idx) => (
              <RoutineItem
                key={idx}
                id={routine.id}
                host={routine.hostName}
                name={routine.name}
                thumbnail_img={routine.thumbnail_img}
                category={translateCategory(routine.category)}
                auth_cycle={routine.auth_cycle}
                participant={routine.participants}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};
