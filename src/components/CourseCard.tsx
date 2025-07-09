
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
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover-lift overflow-hidden border border-gray-100 flex flex-col h-full">
      {/* Course Image */}
      <div className="relative flex-shrink-0">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        {discountPercent > 0 && (
          <Badge className="absolute top-3 left-3 bg-red-500 text-white text-xs">
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
          className="absolute bottom-3 left-3 bg-white/90 text-gray-700 text-xs"
        >
          {course.level}
        </Badge>
      </div>

      {/* Course Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs truncate max-w-[120px]">
            {course.category}
          </Badge>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{course.rating}</span>
            <span className="text-xs text-gray-500">({course.reviewCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-base mb-2 line-clamp-2 leading-tight min-h-[2.5rem]">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-sm text-gray-600 mb-2 truncate">
          Giảng viên: <span className="font-medium">{course.instructor}</span>
        </p>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">
          {course.shortDescription}
        </p>

        {/* Course Info */}
        <div className="flex flex-wrap gap-2 mb-3 text-xs text-gray-500">
          <div className="flex items-center gap-1 whitespace-nowrap">
            <Clock className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{course.duration}</span>
          </div>
          <div className="flex items-center gap-1 whitespace-nowrap">
            <Users className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{course.students.toLocaleString()} học viên</span>
          </div>
          {course.certificate && (
            <div className="flex items-center gap-1 whitespace-nowrap">
              <Award className="h-3 w-3 flex-shrink-0" />
              <span>Chứng chỉ</span>
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {course.skills.slice(0, 2).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs truncate max-w-[80px]">
              {skill}
            </Badge>
          ))}
          {course.skills.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{course.skills.length - 2}
            </Badge>
          )}
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col min-w-0 flex-1 mr-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-lg font-bold text-primary truncate">
                {formatPrice(course.price)}
              </span>
              {course.originalPrice && (
                <span className="text-sm text-gray-400 line-through truncate">
                  {formatPrice(course.originalPrice)}
                </span>
              )}
            </div>
          </div>
          <Button 
            onClick={handleViewDetails}
            className="bg-primary hover:bg-primary/90 text-white flex-shrink-0 text-sm px-3 py-2"
            size="sm"
          >
            <span className="hidden sm:inline">Xem chi tiết</span>
            <span className="sm:hidden">Xem</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
