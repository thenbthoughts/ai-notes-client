import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from './components/Header';
import NavigationDrawer from './components/NavigationDrawer.tsx';

// pages
import UserLogin from './pages/user/auth/Login.tsx';
import UserRegister from './pages/user/auth/Register.tsx';
import UserLogout from './pages/user/auth/Logout.tsx';

// pages
import PageChatOneList from './pages/user/noteAdvance/pageChatOneList/ChatOneList.tsx';
import PageChatLlmListWrapper from './pages/user/noteAdvance/pageChatLlmList/ChatLlmListWrapper.tsx';
import MemoQuickAi from './pages/user/noteAdvance/MemoQuickAi/MemoQuickAi';
import PageLifeEventsWrapper from './pages/user/noteAdvance/pageLifeEventsList/LifeEventWrapper.tsx';

// Test
import RefreshToken from "./components/RefreshToken.tsx";
import UnauthorizedRoute from "./components/UnauthorizedRoute.tsx";
import Setting from "./pages/user/settings/Setting.tsx";
import TaskList from "./pages/user/noteAdvance/taskList/TaskList.tsx";
import About from "./pages/other/About.tsx";
import UserHomepage from "./pages/user/userhomepage/UserHomepage.tsx";
import LlmTaskBackgroundProcess from "./components/LlmTaskBackgroundProcess.tsx";
import AuthorizedRoute from "./components/AuthorizedRoute.tsx";

function App() {
  const Layout = () => {
    return (
      <>
        <Header />
        <NavigationDrawer />
        <Outlet />
      </>
    );
  }


  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <UserHomepage />,
        },
        {
          path: "/login",
          element: (
            <AuthorizedRoute>
              <UserLogin />,
            </AuthorizedRoute>
          )
        },
        {
          path: "/register",
          element: (
            <AuthorizedRoute>
              <UserRegister />
            </AuthorizedRoute>
          ),
        },
        {
          path: "/logout",
          element: <UserLogout />,
        },

        // protected route
        {
          path: "/user/chat-one",
          element: (
            <UnauthorizedRoute>
              <PageChatOneList />
            </UnauthorizedRoute>
          ),
        },
        {
          path: '/user/chat',
          element: (
            <UnauthorizedRoute>
              <PageChatLlmListWrapper />
            </UnauthorizedRoute>
          )
        },
        {
          path: '/user/life-events',
          element: (
            <UnauthorizedRoute>
              <PageLifeEventsWrapper />
            </UnauthorizedRoute>
          )
        },
        {
          path: '/user/task',
          element: (
            <UnauthorizedRoute>
              <TaskList />
            </UnauthorizedRoute>
          )
        },
        {
          path: "/user/quick-memo-ai",
          element: (
            <UnauthorizedRoute>
              <MemoQuickAi />
            </UnauthorizedRoute>
          ),
        },

        // -----

        {
          path: "/user/setting",
          element: <Setting />,
        },

        // -----

        {
          path: "/about",
          element: <About />,
        },
      ]
    },
  ], {

  });

  return (
    <>
      <Toaster
        position="top-center"
      />
      <RouterProvider router={router} />
      <RefreshToken />
      <LlmTaskBackgroundProcess />
    </>
  )
}

export default App;
