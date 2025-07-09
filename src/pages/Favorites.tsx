
import React from 'react';
import { Heart, ArrowLeft, BookOpen, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/CourseCard';
import { Course } from '@/data/mockData';
import { Link } from 'react-router-dom';

interface FavoritesProps {
  favorites: Course[];
  onToggleFavorite: (courseId: string) => void;
  onViewDetails: (course: Course) => void;
  onAddToViewHistory: (course: Course) => void;
}

export const Favorites: React.FC<FavoritesProps> = ({
  favorites,
  onToggleFavorite,
  onViewDetails,
  onAddToViewHistory
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-red-500 fill-current" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Khóa học yêu thích</h1>
                <p className="text-gray-600">
                  {favorites.length} khóa học đã lưu
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {favorites.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Chưa có khóa học yêu thích
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Bạn chưa thêm khóa học nào vào danh sách yêu thích. 
              Hãy khám phá và lưu lại những khóa học bạn quan tâm!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="bg-primary hover:bg-primary/90">
                  <Search className="h-4 w-4 mr-2" />
                  Khám phá khóa học
                </Button>
              </Link>
              <Button variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Xem danh mục
              </Button>
            </div>
          </div>
        ) : (
          // Favorites Grid
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600 mb-1">
                    {favorites.length}
                  </div>
                  <div className="text-sm text-gray-600">Khóa học yêu thích</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {new Set(favorites.map(course => course.category)).size}
                  </div>
                  <div className="text-sm text-gray-600">Danh mục khác nhau</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {favorites.reduce((total, course) => total + course.price, 0).toLocaleString('vi-VN')}đ
                  </div>
                  <div className="text-sm text-gray-600">Tổng giá trị</div>
                </div>
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isFavorite={true}
                  onToggleFavorite={onToggleFavorite}
                  onViewDetails={onViewDetails}
                  onAddToViewHistory={onAddToViewHistory}
                />
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm">
                  Thêm tất cả vào giỏ hàng
                </Button>
                <Button variant="outline" size="sm">
                  Chia sẻ danh sách
                </Button>
                <Button variant="outline" size="sm">
                  Xuất PDF
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
