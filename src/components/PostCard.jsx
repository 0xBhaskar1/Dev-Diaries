import React, { useState } from 'react'
import dbService from '@/appwrite/db'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart,User } from 'lucide-react'
import { useSelector } from 'react-redux'

function PostCard({ $id, title, featuredImage, content, $createdAt,owner,category,likes=[] }) {

  const formatDate = (dateString) => {
      const options = { month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
  }

  const stripHtml = (html) => {
      const tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
  }

  const userData = useSelector((state)=>state.auth.userData)

  const [likesArr,setLikesArr] = useState(likes || []);

  const isLiked = userData ? likesArr.includes(userData.$id) : false;

  const likesCount = likesArr.length;

//   const toggleLike = async (e) => {
//         e.preventDefault(); 
//         e.stopPropagation(); 

//         if (!userData) {
//             alert("Please login to like posts");
//             return;
//         }

//         let newLikesArray;
//         if (isLiked) {
//             newLikesArray = likesArr.filter(id => id !== userData.$id);
//         } else {
//             newLikesArray = [...likesArr, userData.$id];
//         }

        
//         setLikesArr(newLikesArray);

//         try {
            
//             await dbService.updatePost($id, {
//                 likes: newLikesArray
//             });
//         } catch (error) {
//             console.log("Like error::", error);
            
//             setLikesArr(likesArr);
//         }
//     }

  const previewText = stripHtml(content).slice(0, 150) + "...";
  const getReadingTime = (content) => {
        const text = stripHtml(content);
        const wpm = 200;
        const words = text.trim().split(/\s+/).length;
        const time = Math.ceil(words / wpm);
        return time;
    }
    const readingTime  = getReadingTime(content);

  return (
    <Link to={`/post/${$id}`} >
      <article className="group grid grid-cols-12 gap-6 items-start border-b border-zinc-100 py-8 cursor-pointer">
        <div className="col-span-12 sm:col-span-8 flex flex-col gap-2">
                
                    <div className="flex items-center gap-2 mb-1">
                        <Avatar className="h-5 w-5">
                            <AvatarFallback className="bg-zinc-100">
                                            <User className="h-4 w-4 text-zinc-900" />
                                        </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium text-zinc-900">{owner}</span>
                        <span className="text-xs text-zinc-400">•</span>
                        <span className="text-xs text-zinc-500">{formatDate($createdAt)}</span>
                    </div>

                   
                   <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 group-hover:underline decoration-zinc-900 decoration-2 underline-offset-2 leading-tight">
                        {title}
                    </h2>
            

                    
                    <p className="hidden sm:block text-zinc-500 font-serif leading-relaxed line-clamp-2">
                        {previewText}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="rounded-full bg-zinc-100 px-2 py-1 text-[10px] font-medium text-zinc-600">
                                {category}
                            </span>
                             <span className="text-xs text-zinc-400">{readingTime} min read</span>
                        </div>

                        <div className="flex items-center gap-2 group/like">
                            <button 
                                
                                className={`flex items-center gap-1 transition-colors ${
                                    isLiked ? "text-red-500" : "text-zinc-400 hover:text-red-500"
                                }`}
                            >
                                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                                <span className="text-xs font-medium">{likesCount}</span> 
                            </button>
                        </div>

                    </div>
                </div>

                <div className="col-span-12 sm:col-span-4 flex justify-end">
                    <div className="overflow-hidden rounded-md bg-zinc-100 h-32 w-full sm:h-36 sm:w-full object-cover relative">
                         <img 
                            src={dbService.getFilePreview(featuredImage)} 
                            alt={title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                </div>
      </article>
    </Link>
    )
}

export default PostCard