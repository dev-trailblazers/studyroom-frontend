import { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean; // 모달 열림 여부
  onClose: () => void;
  title: string; // 모달 타이틀
  children: React.ReactNode; // 모달 Content Children으로
  width?: number; // 너비 옵셔널 기본값 100
  height?: number; // 높이 옵셔널 기본값 100
  closeOnBackdropClick?: boolean; // 백드롭 클릭시 모달 닫을지 안 닫을지 여부 기본값 true
  exitIcon?: boolean; // 닫기 버튼 표시 할지 안 할지 여부 기본값 true
  animation?: boolean; // 모달 애니메이션 여부 기본값 false
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = 100,
  height = 100,
  closeOnBackdropClick = true,
  exitIcon = true,
  animation = false,
}) => {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (isOpen && animation) {
      setAnimationClass('animate-slide-down');
      document.body.style.overflow = 'hidden';
    } else {
      setAnimationClass('');
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, animation]);

  const handleClick = () => {
    if (closeOnBackdropClick) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center`}>
          <div
            className="fixed inset-0 bg-black opacity-50 shadow-box_03"
            onClick={handleClick}
          ></div>
          <div
            className={`relative bg-white rounded-lg p-6 ${animationClass}`}
            style={{ width, height }}
          >
            <div className="flex items-center justify-between pb-2 mb-4 border-b border-gray-400">
              <h2 className="text-lg font-semibold text-main">{title}</h2>
              {exitIcon && (
                <button onClick={onClose} className="">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              )}
            </div>
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
