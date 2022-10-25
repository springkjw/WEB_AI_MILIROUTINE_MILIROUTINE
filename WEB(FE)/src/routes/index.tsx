import { useRoutes } from "react-router-dom";

import { LandingPage, PopularPage, AboutPage } from '@/features/misc';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const commonRoutes = [
    { path: '/', element: <LandingPage /> },
    { path: '/popular', element: <PopularPage /> },
    { path: '/about', element: <AboutPage /> },
  ];

  // const routes = auth.user ? protectedRoutes : publicRoutes;

  // const element = useRoutes([...routes, ...commonRoutes]);

  const element = useRoutes([...commonRoutes, ...protectedRoutes, ...publicRoutes]);

  return <>{element}</>;
};
