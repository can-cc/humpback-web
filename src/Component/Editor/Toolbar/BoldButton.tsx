import React from 'react';
import { ToolbarButton } from "./ToolbarButton";
import { faBold } from "@fortawesome/free-solid-svg-icons";

export function BoldButton({onClick}) {
  return <ToolbarButton onClick={onClick} icon={faBold} />
}
