
import React from 'react';
import { Heart, Star, Clock, Users, Award, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Course } from '@/data/mockData';

interface CourseCardProps {
  course: Course;
  isFavorite: boolean;
  onToggleFavorite: (courseId: string) => void;
  onViewDetails: (course: Course) => void;
  onAddToViewHistory: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
  onAddToViewHistory
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleViewDetails = () => {
    onAddToViewHistory(course);
    onViewDetails(course);
  };

  const discountPercent = course.originalPrice 
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover-lift overflow-hidden border border-gray-100">
      {/* Course Image */}
      <div className="relative">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        {discountPercent > 0 && (
          <Badge className="absolute top-3 left-3 bg-red-500 text-white">
            -{discountPercent}%
          </Badge>
        )}
        <button
          onClick={() => onToggleFavorite(course.id)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isFavorite 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-white text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
        <Badge 
          variant="secondary" 
          className="absolute bottom-3 left-3 bg-white/90 text-gray-700"
        >
          {course.level}
        </Badge>
      </div>

      {/* Course Content */}
      <div className="p-5">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            {course.category}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{course.rating}</span>
            <span className="text-xs text-gray-500">({course.reviewCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 leading-tight">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-sm text-gray-600 mb-2">
          Giảng viên: <span className="font-medium">{course.instructor}</span>
        </p>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.shortDescription}
        </p>

        {/* Course Info */}
        <div className="flex flex-wrap gap-3 mb-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {course.students.toLocaleString()} học viên
          </div>
          {course.certificate && (
            <div className="flex items-center gap-1">
              <Award className="h-3 w-3" />
              Chứng chỉ
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {course.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {course.skills.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{course.skills.length - 3}
            </Badge>
          )}
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">
                {formatPrice(course.price)}
              </span>
              {course.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(course.originalPrice)}
                </span>
              )}
            </div>
          </div>
          <Button 
            onClick={handleViewDetails}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Xem chi tiết
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
