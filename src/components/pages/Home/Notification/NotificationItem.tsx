import { Bell } from 'lucide-react';
import { Notification } from 'src/types/Notification';

interface NotificationItemProps {
  currentItems: Notification[];
  handleReadNotification: () => void;
}

export const NotificationItem = ({
  currentItems,
  handleReadNotification,
}: NotificationItemProps) => (
  <>
    {currentItems.map((notification) => (
      <li className="py-4" key={notification.id}>
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Bell className="w-6 h-6" color="#587fa7" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-black truncate">
              {notification.message}
            </p>
            <p className="text-sm text-gray-500">{notification.time}</p>
          </div>
          <button
            className="text-sm text-black hover:scale-95"
            type="button"
            onClick={handleReadNotification}
          >
            읽음
          </button>
        </div>
      </li>
    ))}
  </>
);
