import posts from '../data/posts.json'
import PostCard from '../components/PostCard'

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Latest Posts</h1>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
