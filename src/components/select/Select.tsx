import { Select as CustomSelect, Option } from '@material-tailwind/react';

interface SelectProps {
  options: { label: string; value: string }[];
  placeholder?: string;
  value: string;
  setValue: (value: string | undefined) => void;
}

const Select = ({ options, placeholder, value, setValue }: SelectProps) => {
  return (
    <CustomSelect
      label={placeholder}
      value={value}
      data-value={value.length > 0 ? 'true' : 'false'}
      onChange={setValue}
      placeholder={''}
      onPointerEnterCapture={{}}
      onPointerLeaveCapture={{}}
      className={`peer h-[40px] odd:!pl-[16px] border-gray_DD odd:text-[12px] border ${value.length > 0 && 'border-t-0'}
            text-black aria-expanded:border-t-0`}
      labelProps={{
        className: ``,
        // ' pt-1 text-gray_CC text-[12px] peer-aria-expanded:pt-0 peer-data-[value=true]:pt-0 before:absolute before:left-0 before:top-[-0.5px] before:border-l before:border-gray_DD before:border-t before:rounded-tl-lg before:border-solid  after:border-r after:border-gray_DD after:w-[full] after:border-t after:rounded-tr-lg after:border-solid after:absolute after:right-0 after:top-[-0.5px] peer-data-[value=true]:text-[11px] peer-data-[value=true]:text-[#9e9e9e] peer-aria-expanded:text-[11px] peer-aria-expanded:text-[#9e9e9e]',
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
