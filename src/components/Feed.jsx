import Post from './Post';

export default function Feed({ data }) {
  return (
    <div>
      {data.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}
