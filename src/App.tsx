import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";

// component
import Header from './components/Header';
import NavigationDrawer from './components/NavigationDrawer.tsx';
import UnauthorizedRoute from "./components/UnauthorizedRoute.tsx";
import RefreshToken from "./components/RefreshToken.tsx";
import LlmTaskBackgroundProcess from "./components/LlmTaskBackgroundProcess.tsx";
import AuthorizedRoute from "./components/AuthorizedRoute.tsx";

// pages -> auth
const UserLogin = lazy(() => import('./pages/user/auth/Login.tsx'));
const UserRegister = lazy(() => import('./pages/user/auth/Register.tsx'));
const UserLogout = lazy(() => import('./pages/user/auth/Logout.tsx'));

// pages -> other
const About = lazy(() => import("./pages/other/About.tsx"));
const UserHomepage = lazy(() => import("./pages/user/userhomepage/UserHomepage.tsx"));

// pages -> setting
const SettingProfile = lazy(() => import("./pages/user/settings/settingProfile/SettingProfile.tsx"));
const SettingApiKey = lazy(() => import("./pages/user/settings/settingApiKeys/SettingApiKey.tsx"));
const SettingModelPreference = lazy(() => import("./pages/user/settings/settingModelPreference/SettingModelPreference.tsx"));

// pages -> ai
const PageChatLlmListWrapper = lazy(() => import('./pages/user/noteAdvance/pageChatLlmList/ChatLlmListWrapper.tsx'));
const AiDeepResearchWrapper = lazy(() => import("./pages/user/noteAdvance/AiDeepResearch/AiDeepResearchWrapper.tsx"));

// pages -> notes
const NotesWrapper = lazy(() => import("./pages/user/noteAdvance/Notes/NotesWrapper.tsx"));
const NotesWorkspaceCrud = lazy(() => import("./pages/user/noteAdvance/NotesWorkspaceCrud/NotesWorkspaceCrud.tsx"));
const InfoVaultWrapper = lazy(() => import("./pages/user/noteAdvance/InfoVault/InfoVaultWrapper.tsx"));
const PageLifeEventsWrapper = lazy(() => import('./pages/user/noteAdvance/pageLifeEventsList/LifeEventWrapper.tsx'));

// pages -> productivity
const TaskList = lazy(() => import("./pages/user/noteAdvance/taskList/TaskList.tsx"));
const TaskWorkspaceCrud = lazy(() => import("./pages/user/noteAdvance/TaskWorkspaceCrud/TaskWorkspaceCrud.tsx"));
const CalendarWrapper = lazy(() => import("./pages/user/noteAdvance/Calendar/CalendarWrapper.tsx"));
const FinanceWrapper = lazy(() => import("./pages/user/noteAdvance/Finance/FinanceWrapper.tsx"));

// pages -> test
const TestDevWrapper = lazy(() => import("./pages/test/testDev/TestDevWrapper.tsx"));
const TestUserHomepageBackupDelete = lazy(() => import("./pages/user/userhomepage/backup-delete/UserHomepage-backup-delete.tsx"));

// components -> settings
const ModelOpenrouterInsertAll = lazy(() => import('./components/settings/ModelOpenrouterInsertAll.tsx'));

function App() {
  const Layout = () => {
    return (
      <>
        <Header />
        <NavigationDrawer />
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
          <Outlet />
        </Suspense>
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
              <UserLogin />
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
          element: (
            <UnauthorizedRoute>
              <UserLogout />
            </UnauthorizedRoute>
          ),
        },

        // protected route
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
          path: '/user/task-workspace',
          element: (
            <UnauthorizedRoute>
              <TaskWorkspaceCrud />
            </UnauthorizedRoute>
          )
        },
        //
        {
          path: "/user/notes",
          element: (
            <UnauthorizedRoute>
              <NotesWrapper />
            </UnauthorizedRoute>
          ),
        },
        {
          path: "/user/notes-workspace",
          element: (
            <UnauthorizedRoute>
              <NotesWorkspaceCrud />
            </UnauthorizedRoute>
          ),
        },
        {
          path: "/user/info-vault",
          element: (
            <UnauthorizedRoute>
              <InfoVaultWrapper />
            </UnauthorizedRoute>
          ),
        },
        {
          path: "/user/calender",
          element: (
            <UnauthorizedRoute>
              <CalendarWrapper />
            </UnauthorizedRoute>
          ),
        },

        // -----

        {
          path: "/user/finance",
          element: (
            <UnauthorizedRoute>
              <FinanceWrapper />
            </UnauthorizedRoute>
          ),
        },
        {
          path: "/user/ai-deep-search",
          element: (
            <UnauthorizedRoute>
              <AiDeepResearchWrapper />
            </UnauthorizedRoute>
          ),
        },

        // -----

        {
          path: "/user/setting",
          element: (
            <UnauthorizedRoute>
              <SettingProfile />
            </UnauthorizedRoute>
          ),
        },
        {
          path: "/user/setting/api-key",
          element: (
            <UnauthorizedRoute>
              <SettingApiKey />
            </UnauthorizedRoute>
          ),
        },
        {
          path: "/user/setting/model-preference",
          element: (
            <UnauthorizedRoute>
              <SettingModelPreference />
            </UnauthorizedRoute>
          ),
        },

        // -----

        {
          path: "/about",
          element: (
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
              <About />
            </Suspense>
          ),
        },

        // -----

        {
          path: '/test',
          element:  (
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
              <TestDevWrapper />
            </Suspense>
          )
        },
        {
          path: '/test/homepage-backup-delete',
          element: (
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
              <TestUserHomepageBackupDelete />
            </Suspense>
          )
        }
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

      {/* dynamic data */}
      <ModelOpenrouterInsertAll />
    </>
  )
}

export default App;
