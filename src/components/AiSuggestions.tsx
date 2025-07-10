import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sparkles,
  Star,
  Clock,
  Users,
  ChevronRight,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Course, mockSuggestions } from "@/data/mockData";

interface AiSuggestionsProps {
  userId: string;
  onViewCourse: (course: Course) => void;
  onAddToViewHistory: (course: Course) => void;
}

export const AiSuggestions: React.FC<AiSuggestionsProps> = ({
  userId,
  onViewCourse,
  onAddToViewHistory,
}) => {
  const [suggestions, setSuggestions] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchSuggestions = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate API success/failure (90% success rate)
      if (Math.random() < 0.9) {
        const userSuggestions =
          mockSuggestions[userId as keyof typeof mockSuggestions] ||
          mockSuggestions["user123"];
        setSuggestions(userSuggestions);
        setHasLoaded(true);
      } else {
        throw new Error("Failed to fetch suggestions");
      }
    } catch (err) {
      setError("Không thể lấy gợi ý lúc này. Vui lòng thử lại sau.");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleViewCourse = (course: Course) => {
    onAddToViewHistory(course);
    onViewCourse(course);
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-700">
          <Sparkles className="h-5 w-5" />
          Gợi ý thông minh từ AI
        </CardTitle>
        <p className="text-sm text-gray-600">
          Dựa trên lịch sử học tập và sở thích của bạn
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!hasLoaded && !loading && (
          <div className="text-center py-8">
            <Sparkles className="h-12 w-12 text-blue-400 mx-auto mb-4 animate-bounce-gentle" />
            <h3 className="font-semibold text-gray-900 mb-2">
              Khám phá khóa học phù hợp với bạn
            </h3>
            <p className="text-gray-600 mb-4">
              AI sẽ phân tích sở thích và đưa ra gợi ý tốt nhất
            </p>
            <Button
              onClick={fetchSuggestions}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Nhận gợi ý từ AI
            </Button>
          </div>
        )}

        {loading && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-600">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span className="text-sm font-medium">
                AI đang phân tích sở thích của bạn...
              </span>
            </div>
            {[1, 2, 3].map((index) => (
              <div key={index} className="flex gap-4 p-4 bg-white rounded-lg">
                <Skeleton className="h-16 w-24 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Có lỗi xảy ra</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <Button
              onClick={fetchSuggestions}
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Thử lại
            </Button>
          </div>
        )}

        {suggestions.length > 0 && !loading && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">
                Khóa học được gợi ý cho bạn
              </h4>
              <Button
                onClick={fetchSuggestions}
                variant="outline"
                size="sm"
                disabled={loading}
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
                />
                Làm mới
              </Button>
            </div>

            {suggestions.map((course) => (
              <div
                key={course.id}
                className="flex lg:flex-col gap-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow cursor-pointer border"
                onClick={() => handleViewCourse(course)}
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-16 w-24 object-cover rounded lg:w-full lg:h-32"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="font-medium text-gray-900 truncate mb-1">
                    {course.title}
                  </h5>
                  <p className="text-sm text-gray-600 mb-2">
                    {course.instructor}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {course.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {course.students.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-blue-600">
                      {formatPrice(course.price)}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {course.category}
                    </Badge>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 self-center lg:hidden" />
              </div>
            ))}

            <div className="text-center pt-2">
              <p className="text-xs text-gray-500">
                💡 Gợi ý dựa trên khóa học đã xem và sở thích của bạn
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
