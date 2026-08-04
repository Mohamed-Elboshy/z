import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Review, Product } from '../../types';
import { Star, ThumbsUp, CheckCircle, Plus, Image as ImageIcon, MessageSquare } from 'lucide-react';

interface ReviewsSectionProps {
  product: Product;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ product }) => {
  const { language, addToast } = useApp();

  const [reviewsList, setReviewsList] = useState<Review[]>([
    {
      id: 'rev-1',
      userName: 'Nour El-Din M.',
      rating: 5,
      date: '2026-07-28',
      commentEn: 'Absolute perfection! The silhouette is so elegant and the fabric weight feels ultra-luxurious.',
      commentAr: 'قصة المعطف غاية في الفخامة وجودة القماش ثقيلة وممتازة جداً.',
      isVerified: true,
      likesCount: 14,
      images: ['https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80'],
      replyEn: 'Thank you for your review. We are delighted that you love your ZARA garment!',
      replyAr: 'شكراً لتقييمك الرائع. يسعدنا أن نكون جزءاً من إطلالتك اليومية!'
    },
    {
      id: 'rev-2',
      userName: 'Farida A.',
      rating: 4,
      date: '2026-07-20',
      commentEn: 'Fits slightly oversized as described. Great tailoring on the lapels.',
      commentAr: 'المقاس فضفاض قليلاً كما هو موضح بالوصف. خياطة الياقة وتفاصيل الكتف دقيقة للغاية.',
      isVerified: true,
      likesCount: 6
    }
  ]);

  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [showAddReview, setShowAddReview] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newName, setNewName] = useState('');

  const handleLike = (id: string) => {
    setReviewsList(prev =>
      prev.map(r => (r.id === id ? { ...r, likesCount: r.likesCount + 1 } : r))
    );
    addToast(language === 'ar' ? 'شكراً لتقييم المفيد' : 'Marked review as helpful', 'info');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !newName.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      userName: newName,
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      commentEn: newComment,
      commentAr: newComment,
      isVerified: true,
      likesCount: 0
    };

    setReviewsList([newRev, ...reviewsList]);
    setShowAddReview(false);
    setNewComment('');
    setNewName('');
    addToast(language === 'ar' ? 'تم تقديم تقييمك بنجاح!' : 'Review published successfully!', 'success');
  };

  const filteredReviews = filterRating === 'all'
    ? reviewsList
    : reviewsList.filter(r => r.rating === filterRating);

  return (
    <div className="py-12 border-t border-zinc-200 dark:border-zinc-800 space-y-8 font-sans">
      {/* Reviews Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="text-xl font-serif font-bold uppercase tracking-widest text-black dark:text-white">
            {language === 'ar' ? 'تقييمات العملاء' : 'CLIENT REVIEWS'}
          </h3>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-zinc-300 dark:text-zinc-700'}`}
                />
              ))}
            </div>
            <span className="text-sm font-bold text-black dark:text-white">{product.rating}</span>
            <span className="text-xs text-zinc-500">({reviewsList.length} {language === 'ar' ? 'تقييم معتمد' : 'verified reviews'})</span>
          </div>
        </div>

        <button
          onClick={() => setShowAddReview(!showAddReview)}
          className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'ar' ? 'أضف تقييمك' : 'WRITE A REVIEW'}</span>
        </button>
      </div>

      {/* Write Review Form */}
      {showAddReview && (
        <form onSubmit={handleAddReview} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 space-y-4 rounded-lg">
          <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-black dark:text-white">
            {language === 'ar' ? 'كتابة تقييم جديد' : 'SHARE YOUR EXPERTISE'}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">
                {language === 'ar' ? 'الاسم الكامل' : 'Your Name'}
              </label>
              <input
                type="text"
                required
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="e.g. Amira El-Sayed"
                className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 p-2.5 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">
                {language === 'ar' ? 'التقييم' : 'Rating'}
              </label>
              <div className="flex items-center gap-1 py-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    className="p-1 cursor-pointer"
                  >
                    <Star
                      className={`w-5 h-5 ${star <= newRating ? 'fill-amber-500 text-amber-500' : 'text-zinc-300 dark:text-zinc-700'}`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">
              {language === 'ar' ? 'ملاحظاتك وانطباعك عن المنتج' : 'Your Review & Fit Comments'}
            </label>
            <textarea
              required
              rows={3}
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Detail fit, fabric softness, tailoring quality..."
              className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 p-3 text-xs focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddReview(false)}
              className="px-4 py-2 text-xs uppercase text-zinc-500 hover:text-black dark:hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Submit Review
            </button>
          </div>
        </form>
      )}

      {/* Review Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs text-zinc-500 uppercase font-semibold shrink-0">
          {language === 'ar' ? 'تصفية حسب:' : 'Filter:'}
        </span>
        <button
          onClick={() => setFilterRating('all')}
          className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider border cursor-pointer ${
            filterRating === 'all'
              ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
              : 'border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          All ({reviewsList.length})
        </button>
        {[5, 4, 3].map(rating => (
          <button
            key={rating}
            onClick={() => setFilterRating(rating)}
            className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1 cursor-pointer ${
              filterRating === rating
                ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                : 'border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
            }`}
          >
            <span>{rating} Stars</span>
          </button>
        ))}
      </div>

      {/* Review Items List */}
      <div className="space-y-6 divide-y divide-zinc-200 dark:divide-zinc-800">
        {filteredReviews.map(review => (
          <div key={review.id} className="pt-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-serif font-bold text-xs uppercase text-black dark:text-white">
                  {review.userName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-black dark:text-white">{review.userName}</span>
                    {review.isVerified && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                        <CheckCircle className="w-3 h-3" />
                        <span>VERIFIED PURCHASE</span>
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-zinc-400">{review.date}</span>
                </div>
              </div>

              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current' : 'text-zinc-300 dark:text-zinc-700'}`}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
              {language === 'ar' ? review.commentAr : review.commentEn}
            </p>

            {/* Photo Attachment if available */}
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 pt-1">
                {review.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Review attachment"
                    className="w-16 h-20 object-cover border border-zinc-200 dark:border-zinc-800"
                  />
                ))}
              </div>
            )}

            {/* ZARA Official Reply if available */}
            {review.replyEn && (
              <div className="bg-zinc-100 dark:bg-zinc-800/60 p-3 text-xs border-l-2 border-black dark:border-white space-y-1">
                <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-black dark:text-white">
                  <MessageSquare className="w-3 h-3" />
                  <span>ZARA CLIENT SERVICE</span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">
                  {language === 'ar' ? review.replyAr : review.replyEn}
                </p>
              </div>
            )}

            {/* Helpful Like Button */}
            <div className="flex items-center gap-4 text-[10px] text-zinc-500 pt-1">
              <span>Was this review helpful?</span>
              <button
                onClick={() => handleLike(review.id)}
                className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white font-bold cursor-pointer"
              >
                <ThumbsUp className="w-3 h-3" />
                <span>Helpful ({review.likesCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
