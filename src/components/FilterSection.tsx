
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { priceRanges, categories } from '@/data/mockData';

interface FilterSectionProps {
  selectedPriceRange: string;
  selectedCategory: string;
  onPriceRangeChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onClearFilters: () => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  selectedPriceRange,
  selectedCategory,
  onPriceRangeChange,
  onCategoryChange,
  onClearFilters
}) => {
  const hasActiveFilters = selectedPriceRange !== 'all' || selectedCategory !== 'Tất cả';

  return (
    <div className="flex flex-wrap gap-4 items-center justify-between p-4 bg-white rounded-lg shadow-sm border">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Price Range Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Khoảng giá:</label>
          <Select value={selectedPriceRange} onValueChange={onPriceRangeChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Chọn khoảng giá" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả giá</SelectItem>
              {priceRanges.slice(1).map((range, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Danh mục:</label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Chọn danh mục" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters & Clear Button */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            {selectedPriceRange !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {priceRanges[parseInt(selectedPriceRange) + 1]?.label}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => onPriceRangeChange('all')}
                />
              </Badge>
            )}
            {selectedCategory !== 'Tất cả' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {selectedCategory}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => onCategoryChange('Tất cả')}
                />
              </Badge>
            )}
          </div>
          <button
            onClick={onClearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}
    </div>
  );
};
