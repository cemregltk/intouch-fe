import BlogCard from './BlogCard'

interface BlogListProps {
  posts: any[]
  emptyMessage?: string
}

export default function BlogList({ posts, emptyMessage = 'Henüz yazı bulunmamaktadır.' }: BlogListProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  )
}

