import React from 'react';
import { ColorPrimary } from '../../Constant/Color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export const AppHeaderHeight = 42;

function AppHeaderLink(props: { text: string; canDropDown: boolean }) {
  return (
    <li>
      {props.text}
      <FontAwesomeIcon icon={faChevronDown} />
    </li>
  );
}

export function AppHeader() {
  return (
    <header
      style={{
        backgroundColor: ColorPrimary,
        color: 'white',
        height: AppHeaderHeight,
        display: 'flex'
      }}
    >
      Humpback
      <ul>
        <AppHeaderLink text="空间" canDropDown={false} />
      </ul>
    </header>
  );
}
