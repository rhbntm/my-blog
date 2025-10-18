import { useParams, Link } from 'react-router-dom'
import posts from '../data/posts.json'

export default function PostDetails() {
  const { slug } = useParams()
  const post = posts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-2">Post not found</h1>
        <Link to="/" className="text-blue-500 underline">Back to Home</Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{new Date(post.date).toLocaleDateString()}</p>
      <p className="text-gray-800 leading-relaxed whitespace-pre-line">{post.content}</p>
    </div>
  )
}
