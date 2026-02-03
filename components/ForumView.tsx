import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowUp, ArrowDown, Plus, Search, TrendingUp, Clock, Star, X } from 'lucide-react';
import { Post, Comment } from '../types';
import { FORUM_CATEGORIES, getMockPosts } from '../constants';

interface ForumViewProps {
  isDarkMode?: boolean;
}

type SortOption = 'hot' | 'new' | 'top';

export const ForumView: React.FC<ForumViewProps> = ({ isDarkMode }) => {
  const [posts, setPosts] = useState<Post[]>(() => {
    if (typeof window === 'undefined') return getMockPosts();
    try {
      const stored = localStorage.getItem('eduprep_forum_posts');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        return parsed.map((post: any) => ({
          ...post,
          createdAt: new Date(post.createdAt),
          comments: post.comments?.map((c: any) => ({
            ...c,
            createdAt: new Date(c.createdAt)
          })) || []
        }));
      }
    } catch (e) {
      console.error('Error loading forum posts:', e);
    }
    return getMockPosts();
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('hot');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'General Discussion' });
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('eduprep_forum_posts', JSON.stringify(posts));
    }
  }, [posts]);

  const handleUpvote = (postId: string) => {
    setPosts(prev => prev.map(p => 
      p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p
    ));
  };

  const handleDownvote = (postId: string) => {
    setPosts(prev => prev.map(p => 
      p.id === postId ? { ...p, downvotes: p.downvotes + 1 } : p
    ));
  };

  const handleCreatePost = () => {
    const post: Post = {
      id: `post-${Date.now()}`,
      authorId: 'user-1',
      authorName: 'You',
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      upvotes: 0,
      downvotes: 0,
      commentCount: 0,
      createdAt: new Date(),
      comments: []
    };
    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', category: 'General Discussion' });
    setShowCreatePost(false);
  };

  const handleAddComment = (postId: string) => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: `comment-${Date.now()}`,
      postId,
      authorId: 'user-1',
      authorName: 'You',
      content: newComment,
      upvotes: 0,
      downvotes: 0,
      createdAt: new Date()
    };
    
    setPosts(prev => prev.map(p => 
      p.id === postId 
        ? { ...p, comments: [...p.comments, comment], commentCount: p.commentCount + 1 }
        : p
    ));
    setNewComment('');
  };

  const filteredPosts = posts
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.content.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'hot') {
        return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
      } else if (sortBy === 'new') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return b.upvotes - a.upvotes;
      }
    });

  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setSelectedPost(null)}
          className="mb-4 text-nigeria-600 dark:text-nigeria-400 hover:underline flex items-center gap-2"
        >
          ← Back to Forum
        </button>
        
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-200 dark:border-slate-800 mb-4">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex flex-col items-center gap-1">
              <button onClick={() => handleUpvote(selectedPost.id)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                <ArrowUp className="h-5 w-5 text-gray-400 hover:text-nigeria-600" />
              </button>
              <span className="font-bold text-gray-900 dark:text-white">{selectedPost.upvotes - selectedPost.downvotes}</span>
              <button onClick={() => handleDownvote(selectedPost.id)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                <ArrowDown className="h-5 w-5 text-gray-400 hover:text-red-600" />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-nigeria-100 dark:bg-nigeria-900/20 text-nigeria-600 dark:text-nigeria-400 rounded text-xs font-bold">
                  {selectedPost.category}
                </span>
                <span className="text-sm text-gray-500 dark:text-slate-400">by {selectedPost.authorName}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{selectedPost.title}</h2>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed">{selectedPost.content}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-200 dark:border-slate-800">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Comments ({selectedPost.comments.length})</h3>
          
          <div className="space-y-4 mb-6">
            {selectedPost.comments.map(comment => (
              <div key={comment.id} className="p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-gray-900 dark:text-white">{comment.authorName}</span>
                  <span className="text-xs text-gray-500 dark:text-slate-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-slate-300">{comment.content}</p>
                <div className="flex items-center gap-4 mt-2">
                  <button className="flex items-center gap-1 text-sm text-gray-500 dark:text-slate-400 hover:text-nigeria-600">
                    <ArrowUp className="h-4 w-4" />
                    {comment.upvotes}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white"
              onKeyPress={(e) => e.key === 'Enter' && handleAddComment(selectedPost.id)}
            />
            <button
              onClick={() => handleAddComment(selectedPost.id)}
              className="px-6 py-3 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Forum</h2>
          <p className="text-gray-600 dark:text-slate-400">Discuss, share tips, and help each other</p>
        </div>
        <button
          onClick={() => setShowCreatePost(true)}
          className="flex items-center gap-2 px-4 py-2 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all"
        >
          <Plus className="h-5 w-5" />
          New Post
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-gray-200 dark:border-slate-800 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            {['hot', 'new', 'top'].map(option => (
              <button
                key={option}
                onClick={() => setSortBy(option as SortOption)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  sortBy === option
                    ? 'bg-nigeria-600 text-white'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-nigeria-600 text-white'
                : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'
            }`}
          >
            All
          </button>
          {FORUM_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-nigeria-600 text-white'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map(post => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-200 dark:border-slate-800 hover:border-nigeria-400 cursor-pointer transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-1">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleUpvote(post.id); }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <ArrowUp className="h-5 w-5 text-gray-400 hover:text-nigeria-600" />
                </button>
                <span className="font-bold text-gray-900 dark:text-white">{post.upvotes - post.downvotes}</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDownvote(post.id); }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <ArrowDown className="h-5 w-5 text-gray-400 hover:text-red-600" />
                </button>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-nigeria-100 dark:bg-nigeria-900/20 text-nigeria-600 dark:text-nigeria-400 rounded text-xs font-bold">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-slate-400">by {post.authorName}</span>
                  <span className="text-sm text-gray-500 dark:text-slate-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{post.title}</h3>
                <p className="text-gray-600 dark:text-slate-400 line-clamp-2 mb-3">{post.content}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    {post.commentCount} comments
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-gray-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Post</h2>
              <button
                onClick={() => setShowCreatePost(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Category
                </label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white"
                >
                  {FORUM_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  placeholder="Enter post title..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                  Content
                </label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  placeholder="Write your post..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white resize-none"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="flex-1 py-3 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300 font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-slate-600 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  disabled={!newPost.title || !newPost.content}
                  className="flex-1 py-3 bg-nigeria-600 text-white font-bold rounded-xl hover:bg-nigeria-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
