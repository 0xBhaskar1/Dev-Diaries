import React from 'react'
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import authService from "@/appwrite/auth";
import { LogOut as LogoutIcon } from 'lucide-react';
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";



function LogoutBtn() {

    const dispatch = useDispatch();
    const logoutHandler = ()=>{
        authService.logout()
            .then(()=>{
                dispatch(logout())
            })
            .catch((error)=>{
                console.log("Logout Failed",error)
            })
    }

  return (
    <DropdownMenuItem onClick={logoutHandler} className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50">
            <LogoutIcon className="mr-2 h-4 w-4" />
            <span>Log out</span>
    </DropdownMenuItem>
  )
}

export default LogoutBtn