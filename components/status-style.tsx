import { cn } from "@/lib/utils";
import React from "react";

const StatusStyle = (props:{status: string}) => {
  return (
    <span
      className={cn(`${
        props.status == `In Process`
          ? `bg-purple-400/50 text-purple-700 p-2`
          : props.status == `Closed`
          ? `p-2 bg-green-400/50 text-green-700 `
          : `p-2 bg-rose-400/50 text-rose-700 `
      } rounded-xl font-semibold`)}
    >
      {props.status}
    </span>
  );
};

export default StatusStyle;
