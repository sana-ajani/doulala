import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { FiHome, FiCalendar, FiMessageSquare, FiBook, FiUser } from "react-icons/fi";
import { useUser } from "../../context/UserContext";
import { BottomNav } from '../../components/BottomNav';

export const HomePage = (): JSX.Element => {
  const navigate = useNavigate();
  const { userName } = useUser();
  const [todos, setTodos] = useState({
    birthPlan: false,
    hospitalBags: false,
    carSeat: false,
  });
  const [trimester, setTrimester] = useState<string>('');

  useEffect(() => {
    // Get pregnancy progress from localStorage
    const savedProgress = localStorage.getItem('pregnancyProgress');
    if (savedProgress) {
      const { trimester } = JSON.parse(savedProgress);
      setTrimester(trimester);
    }
  }, []);

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-full">
        {/* Main Content */}
        <div className="px-6 pt-4 pb-20">
          <h1 className="text-2xl font-bold text-[#082154]">
            Good Morning, {userName}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {trimester ? 
              `Welcome to your ${trimester} trimester, how are you feeling today?` :
              "How are you feeling today?"}
          </p>

          {/* Action Buttons */}
          <div className="flex justify-between mt-8 gap-4">
            <button className="flex-1 bg-[#082154] text-white py-3 rounded-lg font-medium">
              Timeline
            </button>
            <button className="flex-1 bg-[#082154] text-white py-3 rounded-lg font-medium">
              Resources
            </button>
            <button className="flex-1 bg-[#082154] text-white py-3 rounded-lg font-medium">
              Ask Lala
            </button>
          </div>

          {/* Focus of the Week */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-[#082154]">
              Focus of the week: Rest, Recharge, Prepare
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              This week, it's all about balancing rest with gentle movement. Now's a great time to explore birth plans, line up support, and listen to your body.
            </p>
          </div>

          {/* To-Do List */}
          <Card className="mt-8 border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-[#082154]">
                Your To-Dos!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={todos.birthPlan}
                    onChange={(e) => setTodos({ ...todos, birthPlan: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-[#082154] focus:ring-[#082154]"
                  />
                  <span className="text-gray-700">Finalize birth plan</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={todos.hospitalBags}
                    onChange={(e) => setTodos({ ...todos, hospitalBags: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-[#082154] focus:ring-[#082154]"
                  />
                  <span className="text-gray-700">Pack hospital bags</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={todos.carSeat}
                    onChange={(e) => setTodos({ ...todos, carSeat: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-[#082154] focus:ring-[#082154]"
                  />
                  <span className="text-gray-700">Install car seat</span>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
};