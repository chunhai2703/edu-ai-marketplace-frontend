
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Star, 
  Clock, 
  Users, 
  Award, 
  Calendar, 
  Globe, 
  Heart,
  ShoppingCart,
  Play,
  CheckCircle,
  X
} from 'lucide-react';
import { Course } from '@/data/mockData';

interface ProductModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (courseId: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  course,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite
}) => {
  if (!course) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const discountPercent = course.originalPrice 
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle className="text-2xl font-bold pr-8">
              {course.title}
            </DialogTitle>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Image and Info */}
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              {discountPercent > 0 && (
                <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                  -{discountPercent}%
                </Badge>
              )}
              <Badge 
                variant="secondary" 
                className="absolute bottom-3 left-3 bg-white/90 text-gray-700"
              >
                {course.level}
              </Badge>
              <Button
                size="icon"
                variant="outline"
                className="absolute bottom-3 right-3 bg-white/90"
              >
                <Play className="h-4 w-4" />
              </Button>
            </div>

            {/* Course Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <div>
                  <div className="font-semibold">{course.rating}</div>
                  <div className="text-xs text-gray-500">{course.reviewCount} đánh giá</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Users className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="font-semibold">{course.students.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Học viên</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Clock className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-semibold">{course.duration}</div>
                  <div className="text-xs text-gray-500">Thời lượng</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Globe className="h-5 w-5 text-purple-500" />
                <div>
                  <div className="font-semibold">{course.language}</div>
                  <div className="text-xs text-gray-500">Ngôn ngữ</div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 className="font-semibold mb-2">Kỹ năng bạn sẽ học:</h4>
              <div className="flex flex-wrap gap-2">
                {course.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Details and Actions */}
          <div className="space-y-6">
            {/* Category and Instructor */}
            <div className="space-y-2">
              <Badge variant="outline">{course.category}</Badge>
              <div>
                <p className="text-sm text-gray-600">Giảng viên</p>
                <p className="font-semibold text-lg">{course.instructor}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-semibold mb-2">Mô tả khóa học:</h4>
              <p className="text-gray-700 leading-relaxed">{course.longDescription}</p>
            </div>

            <Separator />

            {/* Additional Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>Cập nhật lần cuối: {new Date(course.lastUpdated).toLocaleDateString('vi-VN')}</span>
              </div>
              {course.certificate && (
                <div className="flex items-center gap-2 text-sm">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span>Cấp chứng chỉ hoàn thành</span>
                </div>
              )}
            </div>

            <Separator />

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(course.price)}
                </span>
                {course.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(course.originalPrice)}
                  </span>
                )}
              </div>
              {discountPercent > 0 && (
                <p className="text-sm text-green-600 font-medium">
                  Tiết kiệm {formatPrice(course.originalPrice! - course.price)} ({discountPercent}%)
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                size="lg" 
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Thêm vào giỏ hàng
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full"
                onClick={() => onToggleFavorite(course.id)}
              >
                <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                {isFavorite ? 'Đã yêu thích' : 'Thêm vào yêu thích'}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Đảm bảo hoàn tiền 30 ngày</span>
              </div>
              <p className="text-sm text-green-600 mt-1">
                Không hài lòng? Hoàn tiền 100% trong 30 ngày đầu tiên.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
