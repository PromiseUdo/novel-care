import MaxWidthWrapper from "@/components/max-width-wrapper";
import React from "react";

const Map = () => {
  return (
    <div className="w-full mt-16">
      <MaxWidthWrapper>
        <div className="w-full flex items-center justify-center">
          <div
            className="h-[498px] w-full bg-cover bg-center"
            style={{
              backgroundImage: `url("/map.png")`, // Corrected syntax with quotes
            }}
            role="img"
            aria-label="Map"
          />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Map;
