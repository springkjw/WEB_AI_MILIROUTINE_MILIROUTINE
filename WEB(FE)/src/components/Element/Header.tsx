import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavItem } from '@/components/Element/NavItem';
import { Button } from '@/components/Element/Button';
import Logo from '@/assets/Logo.svg';

export const Header = () => {
  const navigate = useNavigate();

  const goToHome = useCallback(() => {
    navigate('/');
  }, []);

  const goToSignup = useCallback(() => {
    navigate('/auth/signup');
  }, []);

  const goToLogin = useCallback(() => {
    navigate('/auth/login');
  }, []);

  const goToAbout = useCallback(() => {
    navigate('/about');
  }, []);

  const goToPopular = useCallback(() => {
    navigate('/popular');
  }, []);

  return (
    <header className="w-screen flex items-center justify-center bg-white">
      <div className="container max-w-screen-xl flex flex-row items-center justify-between py-4">
        <div className="flex flex-row items-center justify-center">
          <img src={Logo} onClick={goToHome} className="cursor-pointer" />
          <NavItem label="밀리루틴 소개" margin="ml-12" onClick={goToAbout} />
          <NavItem label="인기" margin="mx-6" onClick={goToPopular} />
        </div>

        <div className="flex flex-row items-center justify-center">
          <Button label="회원가입" margin="mx-4" onClick={goToSignup} />
          <NavItem label="로그인" onClick={goToLogin} />
        </div>
      </div>
    </header>
  );
};
