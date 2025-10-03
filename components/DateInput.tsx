import React from 'react';

interface CustomInputProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  maxLength: number;
}

const CustomInput: React.FC<CustomInputProps> = ({ id, label, value, placeholder, onChange, error, maxLength }) => {
  const labelColor = error ? 'text-red-400' : 'text-gray-400';
  const borderColor = error ? 'border-red-500' : 'border-gray-600 focus:border-purple-500';

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className={`uppercase font-bold text-xs tracking-[0.2em] ${labelColor} transition-colors`}>
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        maxLength={maxLength}
        pattern="[0-9]*"
        inputMode="numeric"
        className={`p-3 border-2 ${borderColor} rounded-lg text-xl md:text-2xl font-bold text-white bg-transparent focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors w-full placeholder-gray-500`}
      />
      {error && <p className="text-red-400 text-xs italic mt-1">{error}</p>}
    </div>
  );
};

export default CustomInput;
