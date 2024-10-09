import Post from '@/components/Post';
import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';


export default async function SearchPage({ params }) {
  let data = null;
  try {
    const result = await fetch(process.env.URL + `/api/post/search`, {
      method: 'POST',
      body: JSON.stringify({ searchTerm: params.searchTerm }),
      cache: 'no-store',
    });

    data = await result.json();
    console.log(data);
  } catch (error) {
    console.error('Failed to fetch search results', error);
  }

  return (
    <div>
      <div className='flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
        <Link href={'/'} className='hover:bg-gray-100 rounded-full p-2'>
          <HiArrowLeft className='h-5 w-5' />
        </Link>
        <h2 className='sm:text-lg'>Back</h2>
      </div>
      <div className='border-b p-6'>
        <h1 className='text-center text-lg'>
          Search results for &quot;{decodeURIComponent(params.searchTerm)}&quot;
        </h1>
      </div>
      {data && data.length === 0 && (
        <h1 className='text-center pt-6 text-2xl'>No results found</h1>
      )}

      {data && data.map((post) => <Post key={post._id} post={post}></Post>)}
    </div>
  );
}