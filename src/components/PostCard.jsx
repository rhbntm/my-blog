import { Link } from 'react-router-dom'

export default function PostCard({ post }) {
  return (
    <div className="border p-4 rounded-md shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-semibold text-blue-600">
        <Link to={`/post/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString()}</p>
      <p className="text-gray-700">{post.excerpt}</p>
    </div>
  )
}
