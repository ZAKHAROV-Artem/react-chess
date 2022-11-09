import React from "react";

type Props = {};

function AppbarComponent({}: Props) {
  return (
    <div className="app-bar p-3">
      <h1 className="text-white font-thin text-center text-2xl">
        Chess by tyoma
      </h1>
    </div>
  );
}

export default AppbarComponent;
