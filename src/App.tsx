import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import { Favorites } from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import { ProductModal } from "./components/ProductModal";
import { Footer } from "./components/Footer";
import { mockCourses, Course } from "./data/mockData";

const queryClient = new QueryClient();

const App = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewHistory, setViewHistory] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    const savedHistory = localStorage.getItem("viewHistory");

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    if (savedHistory) {
      setViewHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    sessionStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Save view history to localStorage
  useEffect(() => {
    sessionStorage.setItem("viewHistory", JSON.stringify(viewHistory));
  }, [viewHistory]);

  const handleToggleFavorite = (courseId: string) => {
    setFavorites((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleViewDetails = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleAddToViewHistory = (course: Course) => {
    setViewHistory((prev) => {
      const filtered = prev.filter((c) => c.id !== course.id);
      return [course, ...filtered].slice(0, 20);
    });
  };

  const getFavoritesCourses = () => {
    return mockCourses.filter((course) => favorites.includes(course.id));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <div className="flex-1">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Index
                      favorites={favorites}
                      viewHistory={viewHistory}
                      onToggleFavorite={handleToggleFavorite}
                      onViewDetails={handleViewDetails}
                      onAddToViewHistory={handleAddToViewHistory}
                    />
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <Favorites
                      favorites={getFavoritesCourses()}
                      onToggleFavorite={handleToggleFavorite}
                      onViewDetails={handleViewDetails}
                      onAddToViewHistory={handleAddToViewHistory}
                    />
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>

            {/* Footer */}
            <Footer />

            {/* Global Product Modal */}
            <ProductModal
              course={selectedCourse}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              isFavorite={
                selectedCourse ? favorites.includes(selectedCourse.id) : false
              }
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
