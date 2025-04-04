import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const IntroPage = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-x-hidden w-[402px] h-[874px]">
        <div className="relative w-[406px] h-[874px] -left-0.5">
          {/* App logo image */}
          <img
            className="absolute w-[406px] h-[406px] top-[22px] left-0 object-cover"
            alt="Doulala Logo"
            src="/image-3.png"
          />

          {/* Status bar */}
          <header className="flex flex-col w-[402px] h-[50px] items-start pt-[21px] pb-0 px-0 absolute top-px left-0.5 bg-white">
            <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex items-center justify-center gap-2.5 pl-4 pr-1.5 py-0 relative flex-1 grow">
                <div className="relative w-fit mt-[-1.00px] font-semibold text-black text-[17px] text-center tracking-[0] leading-[22px] whitespace-nowrap">
                  9:41
                </div>
              </div>

              <div className="relative w-[124px] h-2.5" />

              <div className="flex items-center justify-center gap-[7px] pl-1.5 pr-4 py-0 relative flex-1 grow">
                <img
                  className="relative w-[19.2px] h-[12.23px]"
                  alt="Cellular connection"
                  src="/cellular-connection.svg"
                />

                <img
                  className="relative w-[17.14px] h-[12.33px]"
                  alt="Wifi"
                  src="/wifi.svg"
                />

                <div className="relative w-[27.33px] h-[13px]">
                  <div className="absolute w-[25px] h-[13px] top-0 left-0 rounded-[4.3px] border border-solid border-[#00000059]">
                    <div className="relative w-[21px] h-[9px] top-px left-px bg-black rounded-[2.5px]" />
                  </div>

                  <img
                    className="absolute w-px h-1 top-[5px] left-[26px]"
                    alt="Cap"
                    src="/cap.svg"
                  />
                </div>
              </div>
            </div>
          </header>

          {/* Home indicator */}
          <div className="absolute w-[402px] h-[34px] top-[840px] left-0.5">
            <div className="relative w-36 h-[5px] top-[21px] left-[129px] bg-black rounded-[100px] rotate-180" />
          </div>

          {/* iPhone frame */}
          <div className="absolute w-[402px] h-[874px] top-0 left-0.5">
            <img
              className="absolute w-[450px] h-[920px] top-[-23px] -left-6 object-cover"
              alt="iPhone frame"
              src="/iphone-16-pro---black-titanium---portrait.png"
            />
          </div>

          {/* Authentication card */}
          <Card className="absolute w-[307px] h-36 top-[366px] left-[49px] border-none shadow-none">
            <CardContent className="p-0">
              {/* Sign In button */}
              <Button
                variant="outline"
                className="absolute w-[210px] top-[12px] left-[45px] font-bold text-[#082154] text-base leading-[22.4px] border-[#082154] rounded-md"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </Button>

              {/* Create Account button */}
              <Button
                variant="outline"
                className="absolute w-[210px] top-[107px] left-[45px] font-bold text-[#082154] text-base leading-[22.4px] border-[#082154] rounded-md"
                onClick={() => navigate("/signup")}
              >
                Create Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};