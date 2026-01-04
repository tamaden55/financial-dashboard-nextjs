/**
 * Reusable input field component for financial data entry
 */

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Format number with thousand separators
const formatNumber = (value: string): string => {
  if (!value) return '';
  // Remove all non-digit characters
  const numericValue = value.replace(/\D/g, '');
  if (!numericValue) return '';
  // Add thousand separators
  return Number(numericValue).toLocaleString('ja-JP');
};

// Remove thousand separators to get raw number
const unformatNumber = (value: string): string => {
  return value.replace(/,/g, '');
};

export default function InputField({ label, value, onChange, placeholder }: InputFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Remove commas and pass raw number to parent
    const rawValue = unformatNumber(inputValue);
    onChange(rawValue);
  };

  return (
    <div>
      <label className="block text-left text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
        {label}
      </label>
      <input
        type="text"
        inputMode="numeric"
        value={formatNumber(value)}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
    </div>
  );
}
