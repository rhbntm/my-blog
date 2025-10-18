import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const newPost = {
      id: uuidv4(),
      title: data.title,
      content: data.content,
      author: data.author || 'Admin',
      date: new Date().toISOString().split('T')[0],
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : []
    };

    try {
      // In a real app, you would send this to a backend API
      console.log('New post:', newPost);
      setSuccess('Post created successfully!');
      reset();
      
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Error saving post:', error);
      setSuccess('Error saving post. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Blog Post</h1>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            id="title"
            type="text"
            {...register('title', { required: 'Title is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content *
          </label>
          <textarea
            id="content"
            rows={8}
            {...register('content', { required: 'Content is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <input
            id="author"
            type="text"
            {...register('author')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your name (optional)"
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <input
            id="tags"
            type="text"
            {...register('tags')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Comma-separated tags (e.g., react, javascript, webdev)"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Publish Post
          </button>
        </div>
      </form>
    </div>
  );
}