import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean; // 모달 열림 여부
  onClose: () => void;
  title: string; // 모달 타이틀
  children: React.ReactNode; // 모달 Content Children으로
  width?: number; // 너비 옵셔널 기본값 100
  height?: number; // 높이 옵셔널 기본값 100
  closeOnBackdropClick?: boolean; // 백드롭 클릭시 모달 닫을지 안 닫을지 여부 기본값 true
  exitIcon?: boolean; // 닫기 버튼 표시 할지 안 할지 여부 기본값 true
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
}) => {
  useEffect(() => {
    // useEffect 사용하여 isOpen 값 바뀔때 마다 실행 모달 열려있을시 백그라운드 스크롤 없애서 조작 불가능 하도록 하는 부분
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClick = () => {
    if (closeOnBackdropClick) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={handleClick}
        >
          <div className="fixed inset-0 bg-black opacity-50 shadow-box_03"></div>
          <div
            className={`relative bg-white rounded-lg p-6`}
            style={{ width: width, height: height }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 border-b border-gray-400 pb-2">
              <h2 className="text-main text-lg font-semibold">{title}</h2>
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
