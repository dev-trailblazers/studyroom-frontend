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
      onChange={setValue}
      placeholder={''}
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
      className="h-[40px] border-gray_DD border border-t text-black aria-expanded:border-t-0"
      labelProps={{
        className:
          'pl-[16px] text-gray_DD text-[14px] before:absolute before:left-0 before:top-[-0.5px] before:border-l before:border-gray_DD before:border-t before:rounded-tl-lg before:border-solid  after:border-r after:border-gray_DD after:w-[220px] after:border-t after:rounded-tr-lg after:border-solid after:absolute after:right-0 after:top-[-0.5px]',
      }}
    >
      {options.map((opt) => (
        <Option
          key={opt.value}
          value={opt.value}
          className="text-[14px] text-black"
        >
          {opt.label}
        </Option>
      ))}
    </CustomSelect>
  );
};

export default Select;
