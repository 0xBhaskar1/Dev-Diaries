import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter,Router,RouterProvider } from 'react-router-dom'  
import { Home,Post,LoginPage,SignUpPage,MyPosts,AddPost,EditPost,Profile } from './pages'
import { AuthLayout } from './components' 


const router = createBrowserRouter([
  {
  path : "/",
  element : <App/>,
  children : [
    {
      path : "/",
      element : <Home/>
    },
    {
      path : "/login",
      element : <AuthLayout authentication={false}>
                    <LoginPage />
                </AuthLayout>
    },
    {
      path : "/signup",
      element : <AuthLayout authentication={false}>
                    <SignUpPage />
                </AuthLayout>
    },
    {
      path : "/my-posts",
      element : <AuthLayout authentication>
                    {" "}
                    <MyPosts />
                </AuthLayout>
    },
    {
      path : "/add-post",
      element : <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
    },
    {
      path : "/edit-post/:slug",
      element : <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
    },
    {
      path : "/post/:slug",
      element : <Post/>
    },
    {
      path: "/profile",
    element: (
        <AuthLayout authentication>
            <Profile />
        </AuthLayout>
    ),
    }
  ]
}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router = {router}/>
    </Provider>

  </StrictMode>,
)
