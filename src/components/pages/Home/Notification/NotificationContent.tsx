import { Notification } from 'src/types/Notification';
import { LoaderCircle } from 'lucide-react';

interface ContentProps {
  loading: boolean;
  currentItems: Notification[];
  children: React.ReactNode;
}

export const NotificationContent = ({
  loading,
  currentItems,
  children,
}: ContentProps) => {
  if (loading)
    return (
      <p className="flex justify-center py-2">
        <LoaderCircle className="animate-spin" color="#587fa7" />
      </p>
    );

  if (currentItems.length === 0)
    return <p className="text-center text-gray-500">새로운 알림이 없습니다.</p>;

  return <>{children}</>;
};
