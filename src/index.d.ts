declare module 'react-tooltip-lite' {

  import * as React from 'react';

  export interface TooltipProps {
    arrow?: boolean;
    arrowSize?: number;
    background?: string;
    className?: string;
    color?: string;
    content: React.ReactNode;
    direction?: string;
    distance?: number;
    eventOff?: string;
    eventOn?: string;
    eventToggle?: string;
    forceDirection?: boolean;
    hoverDelay?: number;
    isOpen?: boolean;
    mouseOutDelay?: number;
    padding?: string;
    styles?: object;
    tagName?: string;
    tipContentHover?: boolean;
    tipContentClassName?: string;
    useHover?: boolean;
    useDefaultStyles?: boolean;
  }

  export default class Tooltip extends React.Component<TooltipProps> {
  }

}
