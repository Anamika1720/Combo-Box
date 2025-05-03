import React, { useState, useRef, useEffect } from "react";

type ComboBoxProps = {
  options: string[];
};

const ComboBox: React.FC<ComboBoxProps> = ({ options }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const escapePressedRef = useRef(false);

  useEffect(() => {
    const filtered = options.filter(
      (option) =>
        option.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selectedOptions.includes(option)
    );
    setFilteredOptions(filtered);
    setHighlightedIndex(0);
    setIsOpen(inputValue !== "");
  }, [inputValue, options, selectedOptions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    if (e.key === "Escape") {
      escapePressedRef.current = true;
      setIsOpen(false);
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        setHighlightedIndex((prev) =>
          prev + 1 < filteredOptions.length ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        setHighlightedIndex((prev) =>
          prev - 1 >= 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        const selected = filteredOptions[highlightedIndex];
        if (selected) {
          setSelectedOptions([...selectedOptions, selected]);
          setInputValue("");
          setIsOpen(false);
        }
        break;
    }
  };

  const handleOptionClick = (option: string) => {
    setSelectedOptions([...selectedOptions, option]);
    setInputValue("");
    setIsOpen(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!escapePressedRef.current) {
        setIsOpen(false);
      }
      escapePressedRef.current = false;
    }, 100);
  };

  const removeSelected = (optionToRemove: string) => {
    setSelectedOptions(selectedOptions.filter((opt) => opt !== optionToRemove));
  };

  return (
    <div className="relative w-full max-w-sm">
      <div className="flex flex-wrap items-center gap-2 p-1 border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
        {selectedOptions.map((option) => (
          <span
            key={option}
            className="flex items-center px-2 py-1 text-sm text-white bg-purple-700 rounded-full"
          >
            {option}
            <button
              type="button"
              onClick={() => removeSelected(option)}
              className="ml-1 text-white hover:text-gray-200 focus:outline-none"
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={() => {
            const filtered = options.filter(
              (option) =>
                option.toLowerCase().includes(inputValue.toLowerCase()) &&
                !selectedOptions.includes(option)
            );
            setFilteredOptions(filtered);
            setIsOpen(true);
          }}
          placeholder="Search fruits"
          aria-expanded={isOpen}
          aria-controls="combo-options"
          aria-autocomplete="list"
          role="combobox"
          className="flex-grow min-w-[50px] px-2 py-1 outline-none"
        />
      </div>

      {isOpen && (
        <ul
          id="combo-options"
          role="listbox"
          ref={listRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={option}
                role="option"
                aria-selected={highlightedIndex === index}
                className={`px-4 py-2 cursor-pointer ${
                  highlightedIndex === index
                    ? "bg-blue-100 text-blue-900"
                    : "hover:bg-gray-100"
                }`}
                onMouseDown={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No results</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default ComboBox;
