import React from 'react';
import { ToolbarButton } from "./ToolbarButton";
import {  faItalic } from "@fortawesome/free-solid-svg-icons";

export function ItalicButton({onClick}) {
  return <ToolbarButton onClick={onClick} icon={faItalic} />

}
