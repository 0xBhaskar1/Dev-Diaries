import { useState, useEffect } from 'react'; 
import dbService from '@/appwrite/db';
import { useSelector } from 'react-redux';

const useLikes = (post) => {
    const userData = useSelector((state) => state.auth.userData);
    
    
    const [likesArray, setLikesArray] = useState(post?.likes || []);

    
    useEffect(() => {
        if (post && post.likes) {
            setLikesArray(post.likes);
        }
    }, [post]); 

    const isLiked = userData ? likesArray.includes(userData.$id) : false;
    const likesCount = likesArray.length;

    const toggleLike = async () => {
        if (!userData) {
            alert("Please login to like posts");
            return;
        }

        let newLikesArray;
        if (isLiked) {
            newLikesArray = likesArray.filter(id => id !== userData.$id);
        } else {
            newLikesArray = [...likesArray, userData.$id];
        }

        
        newLikesArray = newLikesArray.filter(id => id); 

        setLikesArray(newLikesArray);

        try {
            await dbService.updatePost(post.$id, {
                likes: newLikesArray
            });
        } catch (error) {
            console.log("Like error::", error);
    
            setLikesArray(likesArray); 
        }
    };

    return { isLiked, likesCount, toggleLike };
};

export default useLikes;