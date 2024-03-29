interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  blueType?: 'dark' | 'light'; // dark : 진한 블루, light : 연한 블루
  type?: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean;
}

// className에 속성을 줘서 custom도 가능 + font-size: 16px(default)
const Button = ({
  text,
  onClick,
  className,
  blueType,
  type = 'button',
  disabled,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`shadow-box_02 w-full h-[40px] rounded-[10px] font-semibold text-center ${blueType === 'light' && 'bg-blue_05 text-black '} ${blueType === 'dark' && 'bg-blue_01 text-white'} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
