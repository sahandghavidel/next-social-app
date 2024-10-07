'use client';

import {
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineTrash,
  HiHeart,
} from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
export default function Icons({ post }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || []);
  const { user } = useUser();
  const router = useRouter();

  const likePost = () => {
    if (!user) {
      return router.push('/sign-in');
    }
    const like = fetch('/api/post/like', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId: post._id }),
    });
    if (like && isLiked) {
      setLikes(
        likes.filter((like) => like !== user.publicMetadata.userMongoId)
      );
    }
    if (like && !isLiked) {
      setLikes([...likes, user.publicMetadata.userMongoId]);
    }
  };
  useEffect(() => {
    if (user && likes?.includes(user.publicMetadata.userMongoId)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likes, user]);

  return (
    <div className='flex justify-start gap-5 p-2 text-gray-500'>
      <HiOutlineChat className='h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100' />
      <div className='flex items-center'>
        {isLiked ? (
          <HiHeart
            onClick={likePost}
            className='h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 text-red-600 hover:text-red-500 hover:bg-red-100'
          />
        ) : (
          <HiOutlineHeart
            onClick={likePost}
            className='h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100'
          />
        )}
        {likes.length > 0 && (
          <span className={`text-xs ${isLiked && 'text-red-600'}`}>
            {likes.length}
          </span>
        )}
      </div>
      <HiOutlineTrash className='h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100' />
    </div>
  );
}
