import { useId } from 'react';

interface SelectProps {
  label: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({
  label,
  options,
  placeholder,
  value,
  onChange,
}: SelectProps) => {
  const uid = useId();
  return (
    <>
      <label className="sr-only" htmlFor={`${uid}-select`}>
        {label}
      </label>
      <select
        name={`${uid}-select`}
        id={`${uid}-select`}
        className="border border-gray_DD border-solid rounded-[10px] py-3 px-5 w-full text-[12px] outline-none placeholder-gray_DD"
        value={value}
        onChange={onChange}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
