import React from 'react'
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import authService from "@/appwrite/auth";
import { Button } from "@/components/ui/button";            

function MobileLogoutBtn() {
    const dispatch = useDispatch();
    return (
        <Button
            variant="destructive"
            className="mt-4 w-full justify-start"
            onClick={() => {
                authService.logout().then(() => dispatch(logout()))
            }}
        >
            Log out
        </Button>
    )
}

export default MobileLogoutBtn