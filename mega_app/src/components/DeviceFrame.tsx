import React from 'react';

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  return (
    <div className="relative mx-auto w-[402px] h-[868px] bg-white rounded-[60px] shadow-xl border-8 border-black overflow-hidden">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[160px] h-[34px] bg-black rounded-b-[20px] z-50">
        <div className="absolute top-[10px] left-1/2 transform -translate-x-1/2 w-[10px] h-[10px] bg-[#666] rounded-full" />
      </div>
      
      {/* Status Bar */}
      <div className="relative z-40 flex justify-between items-center px-8 h-[44px] bg-white">
        <span className="text-[17px] font-semibold">9:41</span>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-4" viewBox="0 0 20 16">
            <path fill="currentColor" d="M18.5 16h-1c-.8 0-1.5-.7-1.5-1.5v-13C16 .7 16.7 0 17.5 0h1c.8 0 1.5.7 1.5 1.5v13c0 .8-.7 1.5-1.5 1.5z"/>
            <path fill="currentColor" d="M12.5 16h-1c-.8 0-1.5-.7-1.5-1.5v-11C10 2.7 10.7 2 11.5 2h1c.8 0 1.5.7 1.5 1.5v11c0 .8-.7 1.5-1.5 1.5z"/>
            <path fill="currentColor" d="M6.5 16h-1c-.8 0-1.5-.7-1.5-1.5v-8C4 5.7 4.7 5 5.5 5h1c.8 0 1.5.7 1.5 1.5v8c0 .8-.7 1.5-1.5 1.5z"/>
            <path fill="currentColor" d="M.5 16h-1c-.8 0-1.5-.7-1.5-1.5v-4C-2 9.7-1.3 9-.5 9h1c.8 0 1.5.7 1.5 1.5v4c0 .8-.7 1.5-1.5 1.5z"/>
          </svg>
          <svg className="w-5 h-4" viewBox="0 0 20 16">
            <path fill="currentColor" d="M10 2.5c2.3 0 4.5.7 6.3 1.9.2.1.2.4 0 .6C14.5 6.3 12.3 7 10 7S5.5 6.3 3.7 5c-.2-.2-.2-.5 0-.6C5.5 3.2 7.7 2.5 10 2.5z"/>
          </svg>
          <div className="w-[25px] h-[13px] rounded-[3px] border-2 border-black relative">
            <div className="absolute right-[2px] top-[2px] w-[18px] h-[7px] bg-black rounded-[1px]" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-44px)] overflow-y-auto">
        {children}
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[134px] h-1 bg-black rounded-full" />
    </div>
  );
}; 