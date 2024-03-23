import { Select as CustomSelect, Option } from '@material-tailwind/react';

interface SelectProps {
  options: { label: string; value: string }[];
  placeholder?: string;
  value: string;
  setValue: (value: string | undefined) => void;
  className?: string;
}

const Select = ({
  options,
  placeholder,
  value,
  setValue,
  className,
}: SelectProps) => {
  return (
    <CustomSelect
      label={placeholder}
      value={value}
      data-value={value.length > 0 ? 'true' : 'false'}
      onChange={setValue}
      placeholder={''}
      onPointerEnterCapture={{}}
      onPointerLeaveCapture={{}}
      className={`peer bg-white h-[40px] border-gray_DD odd:text-[12px] odd:pl-[16px] border ${value.length > 0 && 'border-t-0'} aria-expanded:border-t-0 text-black`}
      containerProps={{
        className: `${className && `min-w-0 ${className}`}`,
      }}
      labelProps={{
        className: `pt-1 pl-1 text-[12px] text-gray_DD peer-aria-expanded:text-[11px] peer-aria-expanded:text-[#9e9e9e] peer-aria-expanded:pt-0 peer-aria-expanded:pl-0 peer-aria-expanded:before:border-t peer-aria-expanded:before:border-l peer-aria-expanded:before:border-gray_DD peer-aria-expanded:after:border-t peer-aria-expanded:after:border-r peer-aria-expanded:after:border-gray_DD
        peer-data-[value=true]:text-[11px] peer-data-[value=true]:text-[#9e9e9e] peer-data-[value=true]:pt-0 peer-data-[value=true]:pl-0 peer-data-[value=true]:before:border-t peer-data-[value=true]:before:border-l peer-data-[value=true]:before:border-gray_DD peer-data-[value=true]:after:border-t peer-data-[value=true]:after:border-r peer-data-[value=true]:after:border-gray_DD
        `,
      }}
    >
      {options.map((opt) => (
        <Option
          key={opt.value}
          value={opt.value}
          className="text-[12px] text-black"
        >
          {opt.label}
        </Option>
      ))}
    </CustomSelect>
  );
};

export default Select;
