import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login,logout } from './store/authSlice'
import authService from './appwrite/auth';
import { Header,Footer } from './components';
import { Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

function App() {

  const dispatch = useDispatch();
  const [loading,setLoading] = useState(true);

  useEffect(() => {
   authService.getCurrentUser()
      .then((userData)=>{
        if(userData){
          dispatch(login(userData));
        } else{
          dispatch(logout())
        }
    }).finally(()=>{
      setLoading(false);
    })
  }, [])

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-zinc-50">
        <Loader2 className="h-10 w-10 animate-spin text-zinc-500" />
      </div>
    )
  }

  return (
    <div className='min-h-screen flex flex-col bg-zinc-50'>
      <Header />
      
      <main className="flex-1">
         <Outlet />
      </main>

      <Footer />
    </div>
  )

}

export default App
