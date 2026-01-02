import React from 'react'
import { useSelector } from 'react-redux'
import { Container } from '@/components'
import { User, Mail, Shield } from 'lucide-react'

function Profile() {
    const userData = useSelector((state) => state.auth.userData)

    return (
        <div className="py-12 bg-zinc-50 min-h-screen">
            <Container>
                <div className="max-w-2xl mx-auto space-y-8">
                    
                    <h1 className="text-3xl font-bold text-zinc-900">My Profile</h1>

                
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-zinc-200">
                        
                
                        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-zinc-100">
                            <div className="h-20 w-20 rounded-full bg-zinc-100 flex items-center justify-center text-3xl font-bold text-zinc-400">
                                {userData?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-zinc-900">{userData?.name}</h2>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                                    Active Account
                                </span>
                            </div>
                        </div>

                        <div className="grid gap-6">
                            
                            <div className="flex items-start gap-4 p-4 rounded-lg bg-zinc-50 border border-zinc-100">
                                <div className="p-2 bg-white rounded-md shadow-sm text-zinc-500">
                                    <User className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-zinc-500">Full Name</p>
                                    <p className="text-lg font-semibold text-zinc-900 mt-1">{userData?.name}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded-lg bg-zinc-50 border border-zinc-100">
                                <div className="p-2 bg-white rounded-md shadow-sm text-zinc-500">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-zinc-500">Email Address</p>
                                    <p className="text-lg font-semibold text-zinc-900 mt-1">{userData?.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-lg bg-zinc-50 border border-zinc-100">
                                <div className="p-2 bg-white rounded-md shadow-sm text-zinc-500">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-zinc-500">User ID</p>
                                    <p className="text-sm font-mono text-zinc-600 mt-1">{userData?.$id}</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </Container>
        </div>
    )
}

export default Profile