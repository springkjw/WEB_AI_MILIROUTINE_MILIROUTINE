interface Dictionary<T> {
  [key: string]: T;
}

const DICT: Dictionary<string> = {
  study: '학습',
  workout: '운동',
  morningroutine: '모닝루틴',
  economy: '경제',
  selfcare: '자기관리',
  dream: '진로',
  hobby: '취미',
  emotion: '정서',
  health: '건강',
};

const translateCategory = (category: string) => {
  return DICT[category];
};

export default translateCategory;
