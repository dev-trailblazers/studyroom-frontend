interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  blueType?: 'dark' | 'light';
}

// className에 속성을 줘서 custom도 가능 + font-size: 16px(default)
const Button = ({
  text,
  onClick,
  className,
  blueType = 'dark',
}: ButtonProps) => {
  return (
    <button
      className={`shadow-box_02 w-full h-[40px] rounded-[10px] font-semibold text-center ${blueType === 'light' && 'bg-blue_05 text-black '} ${blueType === 'dark' && 'bg-blue_01 text-white'} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
