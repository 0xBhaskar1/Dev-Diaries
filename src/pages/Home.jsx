import React from 'react'
import dbService from '@/appwrite/db';
import { useEffect,useState } from 'react'; 
import { Container,PostCard } from '@/components';
import { Link } from 'react-router-dom';


function Home() {
    const [posts,setPosts] = useState([]);
    const [loading,setLoading] = useState(true);
    const stripHtml = (html) => {
      const tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
  }

  
    useEffect(() => {
        dbService.getPosts()
            .then((posts)=>{
                if(posts){
                    setPosts(posts.rows)
                }
                setLoading(false)
            })
    }, [])
    
  if(loading) return <div className="text-center py-10">Loading...</div>

  if (posts.length === 0) {
        return (
             <Container>
                 <div className="flex flex-col items-center justify-center min-h-[50vh]">
                     <h1 className="text-3xl font-bold text-zinc-800">No stories yet.</h1>
                     <Link to = "/AddPost"className="text-zinc-500 mt-2">Write the first one!</Link>
                 </div>
             </Container>
        )
    }
    const previewText = stripHtml(posts[0].content).slice(0, 150) + "...";
    return (
        <div className='w-full py-8 bg-white min-h-screen'>
            <Container>
                <div className="mb-12 border-b border-zinc-200 pb-12">
                     <Link to={`/post/${posts[0].$id}`} className="group grid grid-cols-12 gap-8 items-center cursor-pointer">
                        <div className="col-span-12 md:col-span-6 order-2 md:order-1 flex flex-col gap-4">
                            <span className="uppercase tracking-widest text-xs font-bold text-zinc-500">
                                Featured Entry
                            </span>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-900 group-hover:underline decoration-zinc-900 decoration-4 underline-offset-4 leading-tight">
                                {posts[0].title}
                            </h1>
                            <p className="text-lg text-zinc-500 font-serif line-clamp-3">
                                {previewText}
                            </p>
                            <div className="flex items-center gap-2 mt-4">
                                
                                    <span className="text-sm font-medium">Read more</span>
                        
                                
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-6 order-1 md:order-2">
                             <div className="aspect-video w-full rounded-xl overflow-hidden bg-zinc-100">
                                <img 
                                    src={dbService.getFilePreview(posts[0].featuredImage)} 
                                    alt={posts[0].title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                             </div>
                        </div>
                     </Link>
                </div>


                <div className='max-w-3xl mx-auto flex flex-col gap-0'>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6">
                        Latest Stories
                    </h3>
                    {posts.slice(1).map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>

            </Container>
        </div>
    )
}

export default Home