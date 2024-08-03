import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Notification } from '@components/pages/Home/Notification/Notification';
import { useNotifications } from '@hooks/useNotifications';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveIndexFromPath = useMemo(() => {
    return (path: string): number => {
      switch (path) {
        case '/home':
          return 0;
        case '/notice':
          return 1;
        case '/mypage':
          return 3;
        default:
          return 0;
      }
    };
  }, []);

  const [headerActiveIndex, setHeaderActiveIndex] = useState(() =>
    getActiveIndexFromPath(location.pathname)
  );
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);

  useEffect(() => {
    if (!isAlarmOpen) {
      const newIndex = getActiveIndexFromPath(location.pathname);
      setHeaderActiveIndex(newIndex);
    }
  }, [location, getActiveIndexFromPath, isAlarmOpen]);

  const {
    loading,
    currentItems,
    currentPage,
    totalPages,
    handlePrevPage,
    handleNextPage,
    handleReadNotification,
  } = useNotifications(isAlarmOpen);

  const links = [
    { label: '홈', path: '/home' },
    { label: '공지사항', path: '/notice' },
    { label: '알림', path: '' },
    { label: '내정보', path: '/mypage' },
  ];

  const handleHeaderClick = (index: number) => {
    if (index === 2) {
      setIsAlarmOpen(!isAlarmOpen);
      setHeaderActiveIndex(
        isAlarmOpen ? getActiveIndexFromPath(location.pathname) : 2
      );
    } else {
      setIsAlarmOpen(false);
      setHeaderActiveIndex(index);
      navigate(links[index].path);
    }
  };

  const navLinks = links.map((link, index) =>
    link.label === '알림' ? (
      <button
        type="button"
        key={link.label}
        aria-label="알림 열기"
        className={`relative flex-1 flex items-center justify-center font-medium cursor-pointer select-none hover:scale-95 ${
          headerActiveIndex === index
            ? 'text-blue_01 text-[18px] font-semibold py-3'
            : 'text-white text-[18px] font-normal py-3'
        }`}
        onClick={(e) => {
          e.preventDefault();
          handleHeaderClick(index);
        }}
      >
        {link.label}
        {currentItems.length > 0 && (
          <>
            <span
              className="absolute w-1.5 h-1.5 font-semibold bg-red-500 rounded-full right-10 top-3 "
              aria-label="새 알림"
            ></span>
          </>
        )}
      </button>
    ) : (
      <a
        key={link.label}
        href={link.path}
        aria-label={`${link.label} 페이지로 이동`}
        className={`flex-1 flex items-center justify-center font-medium cursor-pointer select-none hover:scale-95 ${
          headerActiveIndex === index
            ? 'text-blue_01 text-[18px] font-semibold py-3'
            : 'text-white text-[18px] font-normal py-3'
        }`}
        onClick={(e) => {
          e.preventDefault();
          handleHeaderClick(index);
        }}
      >
        {link.label}
      </a>
    )
  );

  const notification = (
    <div className="relative">
      <Notification
        isOpen={isAlarmOpen}
        onClose={() => {
          setIsAlarmOpen(false);
        }}
        loading={loading}
        currentItems={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        handleReadNotification={handleReadNotification}
      />
    </div>
  );

  return (
    <header className="w-full max-w-[1280px] m-auto">
      <div
        className="flex items-center justify-end mb-2 mr-1"
        role="group"
        aria-label="유저 옵션"
      >
        <span className="text-xs text-gray-500" aria-hidden="true">
          엄현호님
        </span>
        <span
          className="w-[0.0725rem] h-3 bg-gray-400 mx-1"
          aria-hidden="true"
        ></span>
        <button className="text-xs text-gray-500" aria-label="로그아웃">
          로그아웃
        </button>
      </div>
      <div className="flex items-center justify-between">
        <a
          href="/home"
          className="flex items-center gap-2"
          aria-label="홈으로 이동"
        >
          <h1 className="text-6xl font-semibold text-blue_01" id="site-title">
            StudyRoom
          </h1>
          <img src="/logo.svg" alt="logo" />
        </a>
        <nav
          className="flex flex-row items-center w-[500px] h-[60px] rounded-md bg-blue_02 shadow-md"
          role="group"
          aria-labelledby="navigation-title"
        >
          <h2 id="navigation-title" className="sr-only">
            페이지 이동 내비게이션
          </h2>
          {navLinks}
        </nav>
      </div>
      {isAlarmOpen && notification}
    </header>
  );
};

export default Header;
