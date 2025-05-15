import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiHome as HomeIcon, FiCalendar as CalendarIcon, FiMessageSquare as ChatIcon, FiBook as BookIcon, FiUser as UserIcon } from "react-icons/fi";

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[402px] bg-white border-t border-gray-200 py-2">
      <div className="flex justify-around items-center">
        <button 
          onClick={() => navigate('/home')}
          className={`flex flex-col items-center p-2 text-[#082154] ${
            location.pathname === '/home' && 'border-b-2 border-[#082154]'
          }`}
        >
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button className="flex flex-col items-center p-2 text-[#082154]">
          <CalendarIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Calendar</span>
        </button>
        <button 
          onClick={() => navigate('/lala-chat')}
          className={`flex flex-col items-center p-2 text-[#082154] ${
            location.pathname === '/lala-chat' && 'border-b-2 border-[#082154]'
          }`}
        >
          <ChatIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Ask Lala</span>
        </button>
        <button 
          onClick={() => navigate('/knowledge-crib')}
          className={`flex flex-col items-center p-2 text-[#082154] ${
            location.pathname === '/knowledge-crib' && 'border-b-2 border-[#082154]'
          }`}
        >
          <BookIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Knowledge Crib</span>
        </button>
        <button 
          onClick={() => navigate('/profile')}
          className={`flex flex-col items-center p-2 text-[#082154] ${
            location.pathname === '/profile' && 'border-b-2 border-[#082154]'
          }`}
        >
          <UserIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
}; 