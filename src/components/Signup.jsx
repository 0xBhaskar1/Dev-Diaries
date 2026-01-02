import React,{useState} from 'react'
import authService from '@/appwrite/auth'
import { login as storeLogin } from '@/store/authSlice'
import Input from './Input'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link,useNavigate} from 'react-router-dom'
import { Button } from './ui/button'
import { PenTool,Loader2 } from 'lucide-react'


function Signup() {

    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch  = useDispatch();
    const {register,handleSubmit,formState : {errors}} = useForm();

    const signup = async (data)=>{
        setError("");
        setLoading(true);
        try {
            const session = await authService.createAccount(data);
            if(session){
                const userData = authService.getCurrentUser();
                if(userData){
                    dispatch(storeLogin(userData))
                    navigate("/");
                }
                
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false);
        }
    }

  return (
        <div className="flex items-center justify-center w-full min-h-screen bg-zinc-50 px-4">
            <div className={`w-full max-w-md bg-white rounded-xl shadow-md border border-zinc-200 p-8 mb-24`}>
                
                <div className="mb-6 flex flex-col items-center justify-center text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-white mb-4">
                        <PenTool className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold leading-tight text-zinc-900">
                        Create an account
                    </h2>
                    <p className="mt-2 text-sm text-zinc-600">
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-black transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(signup)} className='space-y-5'>
                    
                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: "Full Name is required",
                        })}
                    />
                    {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}

                    
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message: "Email address must be a valid address",
                            }
                        })}
                    />
                    {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

                    
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Create a password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 8, message: "Password must be at least 8 characters" }
                        })}
                    />
                    {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}

                    <Button 
                        type="submit" 
                        className="w-full bg-black hover:bg-zinc-800 text-white"
                        disabled={loading}
                    >
                         {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                                Creating account...
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Signup