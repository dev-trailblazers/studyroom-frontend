import { useState, useEffect, useMemo } from 'react';
import { Notification } from 'src/types/Notification';

export const useNotifications = (isOpen: boolean) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const { currentItems, totalPages } = useMemo(() => {
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    return {
      currentItems: notifications.slice(indexOfFirstItem, indexOfLastItem),
      totalPages: Math.ceil(notifications.length / ITEMS_PER_PAGE),
    };
  }, [notifications, currentPage]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await fetch('/src/data/notificationData.json');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleReadNotification = () => {
    console.log('읽음');
  };

  return {
    loading,
    currentItems,
    currentPage,
    totalPages,
    handlePrevPage,
    handleNextPage,
    handleReadNotification,
  };
};
