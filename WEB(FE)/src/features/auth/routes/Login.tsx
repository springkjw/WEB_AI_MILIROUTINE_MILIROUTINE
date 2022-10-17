import { ChangeEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from '@/components/Element';

export const LoginPage = () => {
  const navigate = useNavigate();

  const goToSignup = useCallback(() => {
    navigate('/auth/signup');
  }, []);

  const goToNext = useCallback(() => {
    navigate('/'); // 미개발
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onChangeUsername = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setUsername(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setPassword(e.target.value);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <h2 className="text-black font-bold text-4xl py-6 mt-10">로그인</h2>
        <h4 className="text-black text-medium mb-10">
          밀리루틴에 오신 것을 환영합니다
        </h4>
        <div className="container max-w-sm mb-10">
          <Form
            label="아이디"
            type="text"
            value={username}
            onChange={onChangeUsername}
          />
          <Form
            label="비밀번호"
            type="password"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <Button label="로그인" onClick={goToNext} />
        <div className="py-1 mb-24">
          <span className="text-xs text-gray-500">아직 회원이 아니신가요?</span>
          <span
            onClick={goToSignup}
            className="text-xs text-blue ml-1 cursor-pointer">
            회원가입
          </span>
        </div>
      </div>
    </>
  );
};
