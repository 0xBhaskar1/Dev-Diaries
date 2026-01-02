import React,{useState,useEffect} from 'react'
import dbService from '@/appwrite/db'
import { useSelector } from 'react-redux';
import { Loader2,PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';
import {Query} from "appwrite"
import { Container,PostCard } from '@/components';

function MyPosts() {

    const [posts,setPosts] = useState([]);
    const [loading,setLoading] = useState(true)
    const userData = useSelector((state)=>state.auth.userData)

    useEffect(() => {
      if(userData){
        dbService.getPosts([Query.equal("userID",userData.$id)])
    .then((posts)=>{
        if(posts) {
            setPosts(posts.rows)
        }
        setLoading(false)
    })
      } else{
        setLoading(false)
      }
    }, [userData])
    
    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-zinc-50">
                <Loader2 className="animate-spin h-8 w-8 text-zinc-500"/>
            </div>
        )
    }

    return (
        <div className='w-full py-8 bg-zinc-50 min-h-screen'>
            <Container>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-900">My Dashboard</h1>
                        <p className="text-zinc-500 mt-1">
                            You have published {posts.length} {posts.length === 1 ? 'story' : 'stories'}.
                        </p>
                    </div>
                    
                    
                    <Link to="/add-post" className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors flex items-center gap-2">
                        <PenTool className="h-4 w-4"/>
                        Write New
                    </Link>
                </div>

                {posts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50/50">
                        <div className="h-16 w-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
                            <PenTool className="h-8 w-8 text-zinc-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-zinc-900">No posts yet</h3>
                        <p className="text-zinc-500 max-w-sm text-center mt-2 mb-6">
                            You haven't published any content yet. Start your journey by writing your first story.
                        </p>
                        <Link to="/add-post" className="bg-black text-white px-6 py-2.5 rounded-lg font-medium hover:bg-zinc-800 transition-colors">
                            Create Post
                        </Link>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-full'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
    
}

export default MyPosts