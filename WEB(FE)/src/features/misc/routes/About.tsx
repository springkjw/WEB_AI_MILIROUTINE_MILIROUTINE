import { Button } from '@/components/Element';
import { MainLayout } from '@/components/Layout';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const AboutPage = () => {
  const navigate = useNavigate();

  const goToSignup = useCallback(() => {
    navigate('/auth/signup');
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col items-center mx-40 mt-20">
        <h2 className="text-black text-4xl font-bold">밀리루틴 튜토리얼</h2>
        <section className="flex flex-col items-center mt-20">
          <h3 className="text-orange text-2xl font-bold">Step 1. 나만의 계정을 만드세요</h3>
          <ol>
            <li className="flex flex-col items-center mt-10">
              <p className="text-black text-xl font-bold">1. [회원가입] 창에서 회원정보 입력하기</p>
              <img src="/pages/Signup1.jpg" className="mt-10" />
            </li>
            <li className="flex flex-col items-center mt-10">
              <p className="text-black text-xl font-bold">
                2. AI가 회원님을 더 잘 이해할 수 있도록 <br />
                관심 카테고리와 선호하는 밀리루틴을 선택해주세요!
              </p>
              <img src="/pages/Signup2.jpg" className="mt-10" />
            </li>
          </ol>
        </section>
        <section className="flex flex-col items-center mt-20">
          <h3 className="text-orange text-2xl font-bold">Step 2. 관심 있는 밀리루틴에 참여하세요</h3>
          <ol>
            <li className="flex flex-col items-center mt-10">
              <p className="text-black text-xl font-bold">1. AI가 추천하는 밀리루틴</p>
              <img src="/pages/Landing.jpg" className="mt-10" />
            </li>
            <li className="flex flex-col items-center mt-10">
              <p className="text-black text-xl font-bold">2. 테마별/인기 밀리루틴 보기</p>
              <img src="/pages/Popular.jpg" className="mt-10" />
            </li>
            <li className="flex flex-col items-center mt-10">
              <p className="text-black text-xl font-bold">
                3. [나의 밀리루틴] - [밀리루틴 개설하기] 탭에서 밀리루틴을 직접 개설할 수도 있습니다!
              </p>
              <img src="/pages/Make.jpg" className="mt-10" />
            </li>
          </ol>
        </section>
        <section className="flex flex-col items-center mt-20 mb-20">
          <h3 className="text-orange text-2xl font-bold">Step 3. 꾸준히 밀리루틴을 지키고 인증하세요</h3>
          <ol>
            <li className="flex flex-col items-center mt-10">
              <p className="text-black text-xl font-bold">1. 참여율에 따라 경험치와 포인트를 얻을 수 있습니다</p>
              <img src="/pages/Detail.jpg" className="mt-10" />
            </li>
            <li className="flex flex-col items-center mt-10">
              <p className="text-black text-xl font-bold">2. [포인트샵]에서 원하는 상품을 구매해보세요</p>
              <img src="/pages/Pointshop.jpg" className="mt-10" />
            </li>
            <li className="flex flex-col items-center mt-10">
              <p className="text-black text-xl font-bold">
                3. [나의 밀리루틴] - [인증하기]에서 인증 시 사용했던 이미지와 글을 다시볼 수 있습니다
              </p>
              <img src="/pages/Auth.jpg" className="mt-10" />
            </li>
          </ol>
        </section>
        <Button label="지금 시작하기" text="text-xl" margin="mb-20" onClick={goToSignup} />
      </div>
    </MainLayout>
  );
};
