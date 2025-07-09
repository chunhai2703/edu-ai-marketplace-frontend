
import React, { useState, useEffect } from 'react';
import { Heart, BookOpen, History, Sparkles, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from '@/components/SearchBar';
import { FilterSection } from '@/components/FilterSection';
import { CourseCard } from '@/components/CourseCard';
import { ProductModal } from '@/components/ProductModal';
import { AiSuggestions } from '@/components/AiSuggestions';
import { ChatBot } from '@/components/ChatBot';
import { mockCourses, Course, priceRanges } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewHistory, setViewHistory] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const { toast } = useToast();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    const savedHistory = localStorage.getItem('viewHistory');
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    if (savedHistory) {
      setViewHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Save view history to localStorage
  useEffect(() => {
    localStorage.setItem('viewHistory', JSON.stringify(viewHistory));
  }, [viewHistory]);

  const filteredCourses = mockCourses.filter(course => {
    // Search filter
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchTerm.toLowerCase());

    // Price filter
    let matchesPrice = true;
    if (selectedPriceRange !== 'all') {
      const priceRange = priceRanges[parseInt(selectedPriceRange) + 1];
      matchesPrice = course.price >= priceRange.min && course.price <= priceRange.max;
    }

    // Category filter
    const matchesCategory = selectedCategory === 'Tất cả' || course.category === selectedCategory;

    return matchesSearch && matchesPrice && matchesCategory;
  });

  const handleToggleFavorite = (courseId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId];
      
      const course = mockCourses.find(c => c.id === courseId);
      if (course) {
        toast({
          title: prev.includes(courseId) ? "Đã xóa khỏi yêu thích" : "Đã thêm vào yêu thích",
          description: `${course.title}`,
          duration: 2000,
        });
      }
      
      return newFavorites;
    });
  };

  const handleViewDetails = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleAddToViewHistory = (course: Course) => {
    setViewHistory(prev => {
      // Remove if already exists to avoid duplicates
      const filtered = prev.filter(c => c.id !== course.id);
      // Add to beginning and limit to 20 items
      return [course, ...filtered].slice(0, 20);
    });
  };

  const handleClearFilters = () => {
    setSelectedPriceRange('all');
    setSelectedCategory('Tất cả');
  };

  const getFavoritesCourses = () => {
    return mockCourses.filter(course => favorites.includes(course.id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EduMarket</h1>
                <p className="text-xs text-gray-500">AI-Powered Learning</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Tìm kiếm khóa học, giảng viên..."
              />
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHistory(!showHistory)}
                className="hidden md:flex"
              >
                <History className="h-4 w-4 mr-2" />
                Lịch sử ({viewHistory.length})
              </Button>
              
              <Link to="/favorites">
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Yêu thích ({favorites.length})
                </Button>
              </Link>

              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Tìm kiếm khóa học..."
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-education-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Khám phá tri thức với
            <span className="text-yellow-300"> AI thông minh</span>
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto animate-fade-in">
            Hơn 10,000+ khóa học chất lượng cao với gợi ý cá nhân hóa từ AI
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in">
            <Badge variant="secondary" className="bg-white/20 text-white text-sm px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              Gợi ý thông minh
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white text-sm px-4 py-2">
              <BookOpen className="h-4 w-4 mr-2" />
              Chứng chỉ quốc tế
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white text-sm px-4 py-2">
              <Heart className="h-4 w-4 mr-2" />
              Học tập cá nhân hóa
            </Badge>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Suggestions */}
            <AiSuggestions 
              userId="user123"
              onViewCourse={handleViewDetails}
              onAddToViewHistory={handleAddToViewHistory}
            />

            {/* View History */}
            {showHistory && viewHistory.length > 0 && (
              <div className="bg-white rounded-lg p-4 shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <History className="h-4 w-4" />
                  Đã xem gần đây
                </h3>
                <div className="space-y-3">
                  {viewHistory.slice(0, 5).map((course) => (
                    <div 
                      key={course.id}
                      onClick={() => handleViewDetails(course)}
                      className="flex gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="h-12 w-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 truncate">
                          {course.title}
                        </h4>
                        <p className="text-xs text-gray-500">{course.instructor}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filters */}
            <FilterSection
              selectedPriceRange={selectedPriceRange}
              selectedCategory={selectedCategory}
              onPriceRangeChange={setSelectedPriceRange}
              onCategoryChange={setSelectedCategory}
              onClearFilters={handleClearFilters}
            />

            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Khóa học dành cho bạn
                </h3>
                <p className="text-gray-600">
                  Tìm thấy {filteredCourses.length} khóa học
                </p>
              </div>
            </div>

            {/* Course Grid */}
            {filteredCourses.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Không tìm thấy khóa học phù hợp
                </h3>
                <p className="text-gray-500 mb-4">
                  Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
                </p>
                <Button onClick={handleClearFilters} variant="outline">
                  Xóa bộ lọc
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isFavorite={favorites.includes(course.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onViewDetails={handleViewDetails}
                    onAddToViewHistory={handleAddToViewHistory}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isFavorite={selectedCourse ? favorites.includes(selectedCourse.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* ChatBot */}
      <ChatBot 
        onViewCourse={handleViewDetails}
        onAddToViewHistory={handleAddToViewHistory}
      />
    </div>
  );
};

export default Index;
