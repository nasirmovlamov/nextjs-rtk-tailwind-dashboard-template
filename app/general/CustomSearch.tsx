import { ArrowDownIcon, ArrowUpIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';

interface CustomSearchProps {
  fetchData: (params: { searchTerm: string; searchType: string; order: string }) => void; // Modified to accept filters
  searchType?: {
    label: string;
    name: string;
  }[]; // Search type passed as an optional prop
}

export const CustomSearch: React.FC<CustomSearchProps> = ({ fetchData, searchType = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>(searchType[0].name); // Changed to handle multiple filters
  const [order, setOrder] = useState<string>('asc'); // Added to handle order
  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Delay for 500ms
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchData({
      searchTerm: debouncedSearchTerm,
      searchType: selectedFilter,
      order: order,
    });
  }, [debouncedSearchTerm, selectedFilter, order]);

  const handleReset = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
    setSelectedFilter(searchType[0].name);
    setOrder('');
  };

  return (
    <div className="w-full mb-4 flex justify-between items-center">
      <div className="relative flex items-start gap-3">
        {searchType && (
          <select
            value={selectedFilter}
            onChange={(e) => {
              setSelectedFilter(e.target.value);
              setSearchTerm('');
            }}
            className="py-2.5 px-3 bg-white/5 text-white rounded-lg border-none focus:outline-none"
          >
            {searchType.map((type) => (
              <option key={type.name} value={type.name} className="bg-black text-white">
                {type.label}
              </option>
            ))}
          </select>
        )}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Axtarış..."
            required
            data-testid="input-corpusname"
            className="pl-10 w-80 block rounded-lg border-none bg-white/5 py-3 px-3 text-sm text-white focus:outline-none"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/3 transform mt-2 -translate-y-1/2 w-5 h-5 text-white" />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="relative w-full">
          <button
            type="button"
            value={order}
            onClick={() => {
              setOrder(order === 'asc' ? 'desc' : 'asc');
            }}
            className=" w-32 py-2.5 px-3 bg-white/5 text-white rounded-lg border-none focus:outline-none pr-10"
          >
            {order == 'asc' ? 'Ən son' : 'Ən əvvəl'}
          </button>

          <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
            {order == 'asc' ? (
              <ArrowUpIcon className="w-5 h-5 text-white" />
            ) : (
              <ArrowDownIcon className="w-5 h-5 text-white" />
            )}
          </div>
        </div>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-white/5 text-white rounded-lg border-none focus:outline-none"
        >
          Sıfırla
        </button>
      </div>
    </div>
  );
};
