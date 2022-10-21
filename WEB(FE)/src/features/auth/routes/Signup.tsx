import { useCallback, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from '@/components/Element';
import { Category } from '@/components/Element/Category';
import { PreferMiliroutine } from '@/components/Element/PreferMiliroutine';
import { ReactComponent as Check_green } from '@/assets/check_green.svg';
import Logo from '@/assets/Logo.svg';

export const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');

  const goToLogin = useCallback(() => {
    navigate('/auth/login');
  }, []);

  const goToNext = useCallback(() => {
    setStep(1);
  }, []);

  const goToHome = useCallback(() => {
    navigate('/');
  }, []);

  const onChangeUsername = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setUsername(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setPassword(e.target.value);
  }, []);

  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setEmail(e.target.value);
  }, []);

  const onChangeNickname = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setNickname(e.target.value);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <h2 className="text-black font-bold text-4xl py-6 mt-10">
            {step === 0 ? '회원가입' : '처음이신가요?'}
          </h2>
          <h4 className="text-black text-medium">
            {step === 0
              ? '밀리루틴에 오신 것을 환영합니다'
              : '추가 정보를 입력해주세요'}
          </h4>
          {step === 0 ? (
            <div className="py-1 mb-10">
              <span className="text-xs text-gray-500">이미 가입하셨나요?</span>
              <span
                onClick={goToLogin}
                className="text-xs text-blue ml-1 cursor-pointer">
                로그인
              </span>
            </div>
          ) : null}
        </div>

        <div className="container max-w-sm mb-24">
          {step === 0 ? (
            <>
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
              <Form
                label="이메일"
                type="email"
                value={email}
                onChange={onChangeEmail}
              />
              <Form
                label="닉네임"
                help="밀리루틴 사이트에서 표시될 이름입니다"
                type="text"
                value={nickname}
                onChange={onChangeNickname}
              />
            </>
          ) : null}

          {step === 1 ? (
            <>
              <h2 className="text-black font-bold text-2xl py-6 mt-10">
                관심 카테고리 설정
              </h2>
              <div className="flex flex-col">
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
            </>
          ) : null}

          {step === 1 ? (
            <>
              <h2 className="text-black font-bold text-2xl py-1 mt-10">
                어떤 밀리루틴을 선호하시나요?
              </h2>
              <h4 className="text-xs text-gray-500 pb-6">
                회원가입 후 [좋아요한 밀리루틴] 탭에서 변경할 수 있습니다
              </h4>
              <div className="flex flex-col items-stretch">
                <PreferMiliroutine label="하루 10번 감사하기" />
                <PreferMiliroutine label="하루 10번 감사하기" />
                <PreferMiliroutine label="하루 10번 감사하기" />
                <PreferMiliroutine label="하루 10번 감사하기" />
                <PreferMiliroutine label="하루 10번 감사하기" />
                <PreferMiliroutine label="하루 10번 감사하기" />
                <PreferMiliroutine label="하루 10번 감사하기" />
                <PreferMiliroutine label="하루 10번 감사하기" />
                <PreferMiliroutine label="하루 10번 감사하기" />
                <PreferMiliroutine label="하루 10번 감사하기" />
                <PreferMiliroutine label="하루 10번 감사하기" />
                <PreferMiliroutine label="하루 10번 감사하기" />
                <PreferMiliroutine label="하루 10번 감사하기" />
                <PreferMiliroutine label="하루 10번 감사하기" />
              </div>
            </>
          ) : null}

          <div className="flex justify-center items-center mt-20">
            {step === 0 ? (
              <Button label="다음 단계로" onClick={goToNext} />
            ) : (
              <Button label="계정 생성" onClick={goToHome} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
