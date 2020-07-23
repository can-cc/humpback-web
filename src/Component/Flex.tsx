import React, { CSSProperties, MutableRefObject, ReactNode } from "react";

export const Flex = React.forwardRef((props: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  alignCenter?: boolean;
  spaceBetween?: boolean;
}, ref?: MutableRefObject<HTMLDivElement>)  => {
  return (
    <div
      ref={ref}
      className={props.className}
      style={{
        display: 'flex',
        ...(props.alignCenter
          ? {
              alignItems: 'center',
            }
          : {}),
        ...(props.spaceBetween
          ? {
              justifyContent: 'space-between',
            }
          : {}),
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
});
