import React, { useEffect, useState } from 'react';
import Select, { ActionMeta, Props as SelectProps, SingleValue } from 'react-select';

interface Option {
  label: string;
  value: string | number; // Adjust based on the response data
}

interface SearchInputProps extends Record<string, any> {
  getSearchQuery: any; // API function, expects a search term and returns a promise with the results
  mapResponseToOptions: any; // Function to map API response to React Select options
  handleInputChange?: any; // Optional callback for input change
  register?: any; // React Hook Form register function
  onFieldChange?: any; // Optional callback for field change
  onSelectChange?: any; // Optional callback for select change
}

export const SearchInput: React.FC<SearchInputProps> = (props) => {
  const { getSearchQuery, mapResponseToOptions, onFieldChange, onSelectChange } = props;
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  // Handle input change and debounce it
  const handleInput = (newValue: string) => {
    setSearchTerm(newValue); // Update the search term
    if (onFieldChange) onFieldChange(newValue); // Call the optional input change callback
    if (debounceTimeout) {
      clearTimeout(debounceTimeout); // Clear the previous timeout
    }

    const timeout = setTimeout(() => {
      setDebouncedSearchTerm(newValue); // Update debounced search term after delay
    }, 500);

    setDebounceTimeout(timeout); // Store the new timeout ID
  };

  const onChange = (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => {
    setSelectedOption(newValue);
    if (onSelectChange) onSelectChange(newValue); // Call the optional input change callback
  };

  const fetchData = async () => {
    const response = await getSearchQuery(debouncedSearchTerm);
    setOptions(mapResponseToOptions(response?.data ?? [])); // Map API response to React Select options
  };

  useEffect(() => {
    // Skip search if the search term is too short
    if (debouncedSearchTerm.length < 3) {
      setOptions([]);
      return;
    }
    fetchData();
  }, [debouncedSearchTerm]);

  return (
    <div className="flex flex-col">
      <Select
        options={options}
        onInputChange={handleInput}
        isLoading={isLoading}
        placeholder={'Axtarış'}
        noOptionsMessage={() => 'Nəticə tapılmadı'}
        loadingMessage={() => 'Yüklənir...'}
        isClearable={true}
        styles={{
          control: (provided) => ({
            ...provided,
            width: '240px', // Full width,
            backgroundColor: 'rgb(255 255 255 / 0.05)', // Custom background color
            borderColor: 'transparent', // Border color removal
            borderRadius: '0.45rem', // Adjust border-radius
            padding: '0rem 0.25rem', // Padding for the control
            fontSize: '0.875rem', // Font size adjustment
            color: '#fff', // Text color
            // This line disable the blue border
            boxShadow: 'none',
            // on hover
            '&:hover': {
              borderColor: 'transparent',
              boxShadow: 'none',
              outline: 'white',
            },
          }),
          singleValue: (provided) => ({
            ...provided,
            color: '#fff', // Text color for selected option
          }),
          input: (provided, state) => ({
            ...provided,
            color: '#fff', // Text color inside input
            // remove border, boxshadow and background on focus
            '&:focus': {
              borderColor: 'transparent',
              boxShadow: 'none',
              backgroundColor: 'transparent',
            },
          }),
          placeholder: (provided, state) => ({
            ...provided,
            color: '#fff', // Text color for selected option
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: '#2D2D2D', // Dropdown background color
            borderRadius: '0.75rem', // Match border radius with control
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#4C4C4C' : 'transparent', // Selected option background
            color: '#fff',
            padding: '0.5rem', // Padding for each option
          }),
          indicatorSeparator: (provided) => ({
            ...provided,
            backgroundColor: 'transparent', // No separator between icons
            color: '#fff', // Icon color
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            color: '#B0B0B0', // Icon color
          }),
        }}
        {...props}
        value={selectedOption}
        onChange={onChange}
      />
      {error && <div className="flex text-red-500 text-sm">{error}</div>}
    </div>
  );
};
