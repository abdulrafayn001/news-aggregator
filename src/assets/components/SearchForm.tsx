import React from 'react';
import { Search, Filter } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { NewsFilters, NewsSource } from '../../types/article';
import { DatePickerWithRange } from '../../components/ui/date-picker';
import { DateRange } from "react-day-picker";
import { format } from 'date-fns';

interface SearchFormProps {
  onSearch: (filters: NewsFilters) => void;
  isLoading?: boolean;
}

const NEWS_SOURCES = [
  { id: 'newsapi', label: 'NewsAPI', key: NewsSource.NewsAPI },
  { id: 'guardian', label: 'The Guardian', key: NewsSource.TheGuardian },
  { id: 'NewYorkTimes', label: 'New York Times', key: NewsSource.NewYorkTimes },
] as const;

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [filters, setFilters] = React.useState<NewsFilters>({
    query: '',
    category: 'All',
    startDate: '',
    endDate: '',
    selectedSources: [NewsSource.NewsAPI, NewsSource.TheGuardian, NewsSource.NewYorkTimes],
  });

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const startDate = dateRange?.from ? new Date(dateRange.from) : null;
    if (startDate) {
      startDate.setDate(startDate.getDate() + 1);
    }

    onSearch({
      ...filters,
      startDate: startDate ? format(startDate, 'yyyy-MM-dd') : '',
      endDate: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : '',
    });
  };

  const CATEGORIES = [
    'All',
    'Business',
    'Technology',
    'Politics',
    'Sports',
    'Entertainment',
    'football',
    'Books',
    'World',
    'Briefing',
    'Movies',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search news..."
            value={filters.query}
            onChange={(e) => setFilters({ ...filters, query: e.target.value })}
            className="pl-10"
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select
                value={filters.category}
                onValueChange={(value) =>
                  setFilters({ ...filters, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Date Range</label>
              </div>
              <DatePickerWithRange
                className="w-full"
                date={dateRange}
                onSelect={setDateRange}
                disabled={(date) => date > new Date()}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">News Sources</label>
              <div className="space-y-2">
                {NEWS_SOURCES.map(({ id, label, key }) => (
                  <div key={id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={id}
                      checked={filters.selectedSources.includes(key)}
                      onChange={(e) =>
                        setFilters(prev => ({
                          ...prev,
                          selectedSources: e.target.checked
                            ? [...prev.selectedSources, key]
                            : prev.selectedSources.filter(source => source !== key)
                        }))
                      }
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor={id} className="text-sm text-gray-600">
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
