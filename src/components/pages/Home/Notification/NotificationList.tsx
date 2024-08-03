interface ListProps {
  children: React.ReactNode;
}

export const NotificationList = ({ children }: ListProps) => (
  <ul className="divide-y divide-gray-200">{children}</ul>
);
