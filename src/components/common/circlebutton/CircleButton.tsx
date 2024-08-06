import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Plus,
  LucideIcon,
} from 'lucide-react';

type IconType = 'left' | 'right' | 'down' | 'up' | 'plus';
type ColorScheme = 'white' | 'blue';

interface CircleButtonProps {
  type: IconType;
  width?: string;
  height?: string;
  iconSize?: number;
  color: ColorScheme;
  ariaLabel: string;
  onClick?: () => void;
}

const iconMap: Record<IconType, LucideIcon> = {
  left: ChevronLeft,
  right: ChevronRight,
  down: ChevronDown,
  up: ChevronUp,
  plus: Plus,
};

const CircleButton = ({
  type,
  width = 'w-[40px]',
  height = 'h-[40px]',
  color,
  ariaLabel,
  iconSize = 24,
  onClick,
}: CircleButtonProps) => {
  const Icon = iconMap[type];
  const styles = {
    button: `${width} ${height} font-semibold rounded-full shadow-box_03 flex justify-center items-center transition duration-300 hover:scale-95`,
    icon: color === 'white' ? '#2E4563' : '#fff',
    bg: color === 'white' ? 'bg-white' : 'bg-primary-800',
  };

  return (
    <button
      className={`${styles.button} ${styles.bg}`}
      aria-label={ariaLabel}
      type="button"
      onClick={onClick}
    >
      <Icon color={styles.icon} size={iconSize} />
    </button>
  );
};

export default CircleButton;
