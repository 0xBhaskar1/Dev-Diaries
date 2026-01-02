import React,{useState,useEffect} from 'react'
import { useParams,useNavigate,Link } from 'react-router-dom'
import dbService from '@/appwrite/db'
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Container } from '@/components';
import { Loader2, Edit2, Trash2, Calendar, User,Heart } from "lucide-react";
import parse from "html-react-parser";
import useLikes from '@/hooks/likeCounter';

function Post() {
    
    const [loading,setLoading] = useState(true);
    const [post,setPost] = useState();
    const navigate = useNavigate();
    const {slug} = useParams();
    const userData = useSelector((state)=>
        state.auth.userData
    )

    const isAuthor = post && userData ? post.userID===userData.$id : false;

    useEffect(() => {
      if(slug){
        dbService.getPost(slug)
            .then((post)=>{
                if(post){
                    setPost(post)
                    setLoading(false);
                    console.log(isAuthor)
                }else navigate("/")
            })
      } else{
        navigate("/");
      }
    }, [slug,navigate])
    const { isLiked, likesCount, toggleLike } = useLikes(post);
    const deletePost = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            dbService.deletePost(post.$id).then((status) => {
                if (status) {
                    dbService.deleteFile(post.featuredImage);
                    navigate("/");
                }
            });
        }
    };
    
    if (loading) {
         return (
            <div className="w-full h-screen flex items-center justify-center bg-zinc-50">
                <Loader2 className="animate-spin h-8 w-8 text-zinc-500"/>
            </div>
        )
    }

    return post ? (
        <div className="py-8 bg-white min-h-screen">
            <Container>
                <div className="max-w-4xl mx-auto mb-8 relative">
                    <div className="rounded-xl overflow-hidden border border-zinc-100 shadow-sm aspect-video mb-6 relative">
                        <img
                            src={dbService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        {isAuthor && (
                            <div className="absolute top-4 right-4 flex gap-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button variant="secondary" className="bg-white/90 hover:bg-white text-zinc-900 border border-zinc-200">
                                        <Edit2 className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                </Link>
                                <Button 
                                    variant="destructive" 
                                    className="bg-red-500/90 hover:bg-red-600"
                                    onClick={deletePost}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 mb-4 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-4 text-zinc-500 text-sm mb-8 border-b border-zinc-100 pb-8">
                         <div className="flex items-center gap-1">
                             <User className="h-4 w-4" />
                             <span>{post.owner}</span>
                         </div>
                         <button 
                            onClick={toggleLike}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                                isLiked 
                                ? "bg-red-50 text-red-600 border border-red-200" 
                                : "bg-white text-zinc-500 border border-zinc-200 hover:bg-zinc-50"
                            }`}
                        >
                            <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                            <span className="font-medium">
                                {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
                            </span>
                        </button>
                         <div className="flex items-center gap-1">
                             <Calendar className="h-4 w-4" />
                             <span>{new Date(post.$createdAt).toLocaleDateString()}</span>
                         </div>
                    </div>
                    <div className="prose prose-zinc prose-lg max-w-none">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;


}

export default Post