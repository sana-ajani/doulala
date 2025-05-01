import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { BottomNav } from '../../components/BottomNav';
import { FiCamera, FiEdit2 } from 'react-icons/fi';
import { calculatePregnancyProgress } from '../../utils/pregnancyCalculations';

interface ProfileData {
  age: number;
  monthsToGo: number;
  dueDate: string;
}

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { userName } = useUser();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [age, setAge] = useState<number>(25);
  const [monthsToGo, setMonthsToGo] = useState<number>(9);
  const [isEditingDueDate, setIsEditingDueDate] = useState(false);
  const [dueDate, setDueDate] = useState<string>('');
  const [pregnancyProgress, setPregnancyProgress] = useState({
    weeksRemaining: 0,
    monthsRemaining: 0,
    currentWeek: 0,
    trimester: ''
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar');
    const savedAge = localStorage.getItem('userAge');
    const savedMonths = localStorage.getItem('monthsToGo');
    const savedDueDate = localStorage.getItem('dueDate');

    if (savedAvatar) setAvatarUrl(savedAvatar);
    if (savedAge) setAge(parseInt(savedAge));
    if (savedMonths) setMonthsToGo(parseInt(savedMonths));
    if (savedDueDate) setDueDate(savedDueDate);
  }, []);

  // Update pregnancy progress whenever due date changes
  useEffect(() => {
    if (dueDate) {
      const progress = calculatePregnancyProgress(dueDate);
      setPregnancyProgress(progress);
      localStorage.setItem('pregnancyProgress', JSON.stringify(progress));
    }
  }, [dueDate]);

  // Handle avatar change
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarUrl(result);
        localStorage.setItem('userAvatar', result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle age change
  const handleAgeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newAge = parseInt(event.target.value);
    setAge(newAge);
    localStorage.setItem('userAge', newAge.toString());
  };

  // Handle months change
  const handleMonthsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonths = parseInt(event.target.value);
    setMonthsToGo(newMonths);
    localStorage.setItem('monthsToGo', newMonths.toString());
  };

  // Handle due date change
  const handleDueDateSubmit = () => {
    setIsEditingDueDate(false);
    localStorage.setItem('dueDate', dueDate);
    const progress = calculatePregnancyProgress(dueDate);
    setPregnancyProgress(progress);
    localStorage.setItem('pregnancyProgress', JSON.stringify(progress));
  };

  return (
    <div className="max-w-[402px] mx-auto min-h-screen bg-white">
      {/* Header */}
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold text-[#082154]">Profile</h1>
      </div>

      {/* Profile Content */}
      <div className="p-6 space-y-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl text-gray-400">
                  {userName?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-[#082154] rounded-full p-2 cursor-pointer">
              <FiCamera className="text-white w-4 h-4" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <h2 className="mt-4 text-xl font-semibold">{userName}</h2>
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          {/* Age Dropdown */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="text-sm text-gray-600">Age</label>
            <select
              value={age}
              onChange={handleAgeChange}
              className="mt-1 block w-full p-2 border rounded bg-white"
            >
              {Array.from({ length: 35 }, (_, i) => i + 16).map((value) => (
                <option key={value} value={value}>
                  {value} years old
                </option>
              ))}
            </select>
          </div>

          {/* Due Date */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <label className="text-sm text-gray-600">Expected Due Date</label>
              <button
                onClick={() => setIsEditingDueDate(!isEditingDueDate)}
                className="text-[#082154]"
              >
                <FiEdit2 className="w-4 h-4" />
              </button>
            </div>
            {isEditingDueDate ? (
              <div className="mt-2 space-y-2">
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={handleDueDateSubmit}
                  className="w-full p-2 bg-[#082154] text-white rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <p className="text-lg font-medium">{dueDate}</p>
            )}
          </div>

          {/* Months to Go Dropdown */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="text-sm text-gray-600">Pregnancy Journey</label>
            <p className="text-lg font-medium">
              {pregnancyProgress.monthsRemaining} months to go
              <br />
              <span className="text-sm text-gray-600">
                (Week {pregnancyProgress.currentWeek} of 40)
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}; 