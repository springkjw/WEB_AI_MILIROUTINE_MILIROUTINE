import { Form, Button, Segment } from '@/components/Element';
import { Category } from '@/components/Element/Category';
import { useState } from 'react';

interface SettingContentProps {
  tab: string;
}

const ModifyUserInfoPage = () => {
  const [nickname, setNickname] = useState('');
  return (
    <>
      <section>
        <h2 className="text-black font-bold text-2xl">닉네임</h2>
        <Form
          type="text"
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
      </section>
      <section>
        <h2 className="text-black font-bold text-2xl py-6">관심 카테고리 설정</h2>
        <div className="flex flex-col mb-28">
          <div className="flex">
            <Category label="학습" />
            <Category label="운동" />
            <Category label="모닝루틴" />
          </div>
          <div className="flex">
            <Category label="경제" />
            <Category label="자기관리" />
            <Category label="진로" />
          </div>
          <div className="flex">
            <Category label="취미" />
            <Category label="정서" />
            <Category label="건강" />
          </div>
        </div>
      </section>
      <div className="flex justify-center">
        <Button text="text-xl" label="수정하기" margin="mb-24" onClick={() => {}} />
      </div>
    </>
  );
};

const ModifyUserPasswordPage = () => {
  const [password, setPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [newPassword2, setNewPassword2] = useState<string>();

  return (
    <>
      <Form
        label="기존 비밀번호"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Form
        label="새로운 비밀번호"
        type="password"
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
      />
      <Form
        label="새로운 비밀번호 (재입력)"
        type="password"
        onChange={(e) => {
          setNewPassword2(e.target.value);
        }}
      />
      <div className="flex justify-center mt-24">
        <Button text="text-xl" label="변경하기" margin="mb-24" onClick={() => {}} />
      </div>
    </>
  );
};

const DeleteUserPage = () => {
  return (
    <>
      <h2 className="text-black font-bold text-2xl">밀리루틴에서 떠나신다구요?</h2>
      <p className="text-red mt-10">
        회원탈퇴는 돌이킬 수 없습니다. <br />
        신중히 선택해주세요!
      </p>
      <Button label="계정을 삭제하겠습니다" margin="my-10" onClick={() => {}} />
    </>
  );
};

const SettingContent = ({ tab }: SettingContentProps) => {
  if (tab === 'a') {
    return <ModifyUserInfoPage />;
  } else if (tab === 'b') {
    return <ModifyUserPasswordPage />;
  }
  return <DeleteUserPage />;
};

export const SettingPage = () => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setTab((event.target as HTMLInputElement).value);
  };

  const [tab, setTab] = useState('a');

  return (
    <div className="flex">
      <nav className="flex flex-col content-center text-lg mt-10 ml-20">
        <button value="a" onClick={handleClick} className={`px-10 py-5 my-5${tab === 'a' ? ' bg-orange text-white-100 font-bold rounded-full' : ''}`}>
          회원정보 수정
        </button>
        <button value="b" onClick={handleClick} className={`px-10 py-5 my-5${tab === 'b' ? ' bg-orange text-white-100 font-bold rounded-full' : ''}`}>
          비밀번호 변경
        </button>
        <button value="c" onClick={handleClick} className={`px-10 py-5 my-5${tab === 'c' ? ' bg-orange text-white-100 font-bold rounded-full' : ''}`}>
          회원 탈퇴하기
        </button>
      </nav>
      <main className="ml-60 mt-10 w-1/4">
        <SettingContent tab={tab} />
      </main>
    </div>
  );
};
