interface HeaderProps {
  onClose: () => void;
}

export const NotificationHeader = ({ onClose }: HeaderProps) => (
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-semibold text-main">알림</h3>
    <button
      onClick={onClose}
      className="text-gray-500 hover:text-gray-700"
      aria-label="닫기"
    >
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#587fa7">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
);
