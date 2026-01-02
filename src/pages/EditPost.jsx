import React, { useEffect, useState } from 'react'
import { Container,PostForm } from '@/components'
import dbService from '@/appwrite/db'
import { useParams,useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'


function EditPost() {
    const navigate = useNavigate();
    const [post,setPost] = useState();
    const {slug} = useParams();
    const [loading,setLoading] = useState(true);
    useEffect(() => {
      if(slug){
        dbService.getPost(slug)
        .then((post)=>{
            if(post) {
                setPost(post);
                setLoading(false);
            } else{
                navigate("/")
            }
        })
      }
      else{
        navigate("/");
      }
    }, [slug,navigate])
    
    if (loading) {
        return (
             <div className="w-full h-screen flex items-center justify-center bg-zinc-50">
                <Loader2 className="animate-spin h-8 w-8 text-zinc-500"/>
            </div>
        )
    }
    return post ? (
        <div className='py-8 bg-zinc-50 min-h-screen'>
            <Container>
                <div className="max-w-6xl mx-auto mb-6 pl-2">
                     <h1 className="text-2xl font-bold text-zinc-900">
                        Edit Story
                    </h1>
                </div>
                <div className="max-w-6xl mx-auto">
                    <PostForm post={post} />
                </div>
            </Container>
        </div>
    ) : null

}

export default EditPost