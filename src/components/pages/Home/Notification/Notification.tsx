import { NotificationHeader } from './NotificationHeader';
import { NotificationContent } from './NotificationContent';
import { NotificationList } from './NotificationList';
import { Pagination } from './Pagination';
import { NotificationItem } from './NotificationItem';
import { Notification as NotificationDataType } from 'src/types/Notification';

interface NotificationProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  currentItems: NotificationDataType[];
  currentPage: number;
  totalPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handleReadNotification: () => void;
}

export const Notification = ({
  isOpen,
  onClose,
  loading,
  currentItems,
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
  handleReadNotification,
}: NotificationProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-2 right-0 z-10 w-[31.25rem] p-4 bg-white border border-gray-200 rounded-lg shadow-box_01">
      <NotificationHeader onClose={onClose} />
      <NotificationContent loading={loading} currentItems={currentItems}>
        <NotificationList>
          <NotificationItem
            currentItems={currentItems}
            handleReadNotification={handleReadNotification}
          />
        </NotificationList>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      </NotificationContent>
    </div>
  );
};
