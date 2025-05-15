import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { IntroPage } from "./screens/IntroPage/IntroPage";
import { SignInPage } from "./screens/SignInPage/SignInPage";
import { SignUpPage } from "./screens/SignUpPage/SignUpPage";
import { HomePage } from "./screens/HomePage/HomePage";
import { KnowledgeCrib } from "./screens/KnowledgeCrib/KnowledgeCrib";
import { LalaChat } from "./screens/LalaChat/LalaChat";
import { DeviceFrame } from './components/DeviceFrame';
import { ProfilePage } from "./screens/ProfilePage";


const rootElement = document.getElementById("app");
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/knowledge-crib" element={<KnowledgeCrib />} />
          <Route path="/lala-chat" element={<LalaChat />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </UserProvider>
  </StrictMode>
);