import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import type { Comment } from '../types';
import { commentsAPI } from '../api/comments';

interface CommentSectionProps {
  articleId: number;
}

const CommentSection = ({ articleId }: CommentSectionProps) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const data = await commentsAPI.getByArticle(articleId);
      setComments(data.comments);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    setSubmitting(true);
    setError('');

    try {
      const commentData: any = {
        article_id: articleId,
        author_name: user?.username || 'Anonymous',
        content: newComment.trim()
      };

      // Only include email if user is logged in and has an email
      if (user?.email) {
        commentData.author_email = user.email;
      }

      await commentsAPI.create(commentData);
      setNewComment('');
      fetchComments(); // Refresh comments
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    // Show relative time for recent comments (mobile-friendly)
    if (diffInHours < 24) {
      if (diffInHours < 1) {
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
        return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes}m ago`;
      }
      return `${diffInHours}h ago`;
    }
    
    // Show full date for older comments
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mt-6 sm:mt-8">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
        Comments ({comments.length})
      </h3>

      {/* Comment Form */}
      <div className="mb-6 sm:mb-8">
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              {user ? `Leave a comment as ${user.username}:` : 'Leave a comment:'}
            </label>
            <textarea
              id="comment"
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none text-sm sm:text-base"
              placeholder="Share your thoughts..."
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
            <p className="text-xs sm:text-sm text-gray-500 order-2 sm:order-1">
              {user ? 'Commenting as: ' + user.username : 'You will be commenting as Anonymous'}
            </p>
            <button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className="bg-primary-600 text-white px-4 sm:px-6 py-2 sm:py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium text-sm sm:text-base order-1 sm:order-2 w-full sm:w-auto"
            >
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-4 sm:space-y-6">
        {loading ? (
          <div className="flex justify-center py-6 sm:py-8">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-6 sm:py-8">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-gray-500 text-base sm:text-lg">No comments yet</p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-100 pb-4 sm:pb-6 last:border-b-0">
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Avatar */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                  {comment.author_name.charAt(0).toUpperCase()}
                </div>

                {/* Comment Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{comment.author_name}</h4>
                    <span className="hidden sm:inline text-gray-400">•</span>
                    <time className="text-xs sm:text-sm text-gray-500" dateTime={comment.created_at}>
                      {formatDate(comment.created_at)}
                    </time>
                  </div>
                  
                  <div className="text-gray-700 leading-relaxed text-sm sm:text-base break-words">
                    {comment.content}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
