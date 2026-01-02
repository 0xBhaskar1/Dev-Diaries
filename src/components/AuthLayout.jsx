import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { Loader2 } from 'lucide-react' 

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
       
        if(authentication && authStatus !== authentication){
            navigate("/login")
        } 
      
        else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? (
    <div className="w-full h-screen flex justify-center items-center bg-zinc-50">
        <Loader2 className="animate-spin h-8 w-8 text-zinc-500" />
    </div>
  ) : <>{children}</>
}