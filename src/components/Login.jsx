import React from 'react'
import authService from '@/appwrite/auth'
import { login as storeLogin } from '@/store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Input from "@/components/Input"
import { Button } from "@/components/ui/button"
import { PenTool, Loader2 } from "lucide-react"

function Login() {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();


    const login = async (data) => {
        setError("");
        setIsLoading(true);
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(storeLogin(userData))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex items-center justify-center w-full min-h-screen bg-zinc-50 px-4'>
            <div className={`w-full max-w-md bg-white rounded-xl shadow-md border border-zinc-200 p-8 mb-24`}>

                <div className="mb-6 flex flex-col items-center justify-center text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-white mb-4">
                        <PenTool className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold leading-tight text-zinc-900">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-zinc-600">
                        Don&apos;t have an account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-black transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-3 rounded-md bg-red-50 border border-red-200 text-red-600 text-sm font-medium text-center">
                        {error}
                    </div>
                )}


                <form onSubmit={handleSubmit(login)} className='space-y-5'>


                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter Your Email"
                        {
                        ...register("email", {
                            required: true,
                            pattern: {
                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message: "Email address must be a valid address",
                            }
                        })
                        }
                    />
                    {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter Your Password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 8, message: "Password must be at least 8 characters" },
                        })}
                    />
                    {errors.password && (
                        <p className="text-red-600 text-sm">{errors.password.message}</p>
                    )}

                    <Button
                        type="submit"
                        className="w-full bg-black hover:bg-zinc-800 text-white"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing in
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Login