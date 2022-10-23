import { Label } from '@/components/Element';

export interface RoutineItemProps {
  host?: string;
  name?: string;
  thumbnail_img?: string;
  category?: string;
  auth_cycle?: number;
  participant?: number;
}

export const RoutineItem = ({
  host = '검은연필',
  name = '하루 30분 공부하기',
  thumbnail_img = 'http://dummyimage.com/214x631.png/5fa2dd/ffffff',
  category = '학습',
  auth_cycle = 5,
  participant = 35,
}: RoutineItemProps) => {
  return (
    <div>
      <img className="border rounded-xl border-black mb-2 w-40 h-40 object-cover bg-white-200 shadow-lg" src={thumbnail_img} />
      <span className="text-sm text-gray-500">{host}</span>
      <h4 className="text-lg text-black font-bold mb-1">{name}</h4>
      <Label text="text-xs" label={category} />
      <div className="flex flex-row justify-between items-center mt-4">
        <span className="text-black text-sm">주 {auth_cycle}회 인증</span>
        <span className="text-black text-sm">{participant}명 참여중</span>
      </div>
    </div>
  );
};
