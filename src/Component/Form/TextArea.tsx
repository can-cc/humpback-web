import React, { ChangeEvent, MutableRefObject, TextareaHTMLAttributes, useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import omit from 'lodash/omit';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { buildClassName } from '../../util/component';

import './TextArea.css';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onChangeDebounce?: (value: string) => void;
  changeDebounceTime?: number;
  borderLess?: boolean;
}

export const TextArea = React.forwardRef((props: TextAreaProps, ref?: MutableRefObject<HTMLTextAreaElement>) => {
  const { onChangeDebounce, changeDebounceTime } = props;
  const changeRef$ = useRef(new Subject<string>());

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    props.onChangeDebounce && changeRef$.current.next(event.target.value);
    props.onChange && props.onChange(event);
  };

  useEffect(() => {
    if (!onChangeDebounce) {
      return;
    }
    const subscriber = changeRef$.current.pipe(debounceTime(changeDebounceTime || 600)).subscribe((value: string) => {
      onChangeDebounce(value);
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [onChangeDebounce, changeDebounceTime]);

  return (
    <TextareaAutosize
      inputRef={ref}
      className={buildClassName(['AppTextArea', props.className])}
      onChange={onChange}
      style={{
        ...(props.borderLess
          ? {
              border: 'none',
              outline: 'none',
              resize: 'none',
            }
          : {}),
        ...props.style,
      }}
      {...omit(props, ['className', 'style', 'onChange', 'onChangeDebounce', 'changeDebounceTime', 'borderLess'])}
    />
  );
});
