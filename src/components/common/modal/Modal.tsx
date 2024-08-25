import { ReactNode } from 'react';
import { useModal } from '@/hooks/useModal';

interface ModalProps {
  name: string;
  children: ReactNode;
  width?: string;
  height?: string;
  closeOnOverlayClick?: boolean;
}

const Modal = ({
  name,
  children,
  width = 'w-[500px]',
  height = 'h-[500px]',
  closeOnOverlayClick = true,
}: ModalProps) => {
  const { isOpen, handleOverlayClick, zIndex } = useModal(name);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]`}
      onClick={closeOnOverlayClick ? handleOverlayClick : () => {}}
      style={{ zIndex: 1000 + zIndex }}
    >
      <div className={`relative ${width} ${height} rounded shadow-lg bg-white`}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
