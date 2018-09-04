declare module 'react-tooltip-lite' {

  import * as React from 'react';

  export interface TooltipProps {
    tagName?: string;
    direction?: string;
    className?: string;
    content: React.ReactNode;
    background?: string;
    color?: string;
    padding?: string;
    distance?: number;
    styles?: object;
    eventOff?: string;
    eventOn?: string;
    eventToggle?: string;
    useHover?: boolean;
    useDefaultStyles?: boolean;
    isOpen?: boolean;
    hoverDelay?: number;
    tipContentHover?: boolean;
    arrow?: boolean;
  }

  export default class Tooltip extends React.Component<TooltipProps> {
  }

}
