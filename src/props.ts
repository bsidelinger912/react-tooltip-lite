import React from 'react';
import PropTypes from 'prop-types';

type PropTypes<T> = {
  [P in keyof T]: PropTypes.Requireable<T[P]> | PropTypes.Validator<T[P]>;
};

export interface Props {
  arrow?: boolean;
  arrowSize?: number;
  background?: string;
  children: React.ReactNode;
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
  padding?: string | number;
  styles?: React.CSSProperties;
  tagName?: string;
  tipContentHover?: boolean;
  tipContentClassName?: string;
  useHover?: boolean;
  useDefaultStyles?: boolean;
  zIndex?: number;
  onToggle?: (showTip: boolean) => void;
}

export const propTypes: PropTypes<Props> = {
  arrow: PropTypes.bool,
  arrowSize: PropTypes.number,
  background: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  content: PropTypes.node.isRequired,
  direction: PropTypes.string,
  distance: PropTypes.number,
  eventOff: PropTypes.string,
  eventOn: PropTypes.string,
  eventToggle: PropTypes.string,
  forceDirection: PropTypes.bool,
  hoverDelay: PropTypes.number,
  isOpen: PropTypes.bool,
  mouseOutDelay: PropTypes.number,
  padding: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  styles: PropTypes.object,
  tagName: PropTypes.string,
  tipContentHover: PropTypes.bool,
  tipContentClassName: PropTypes.string,
  useDefaultStyles: PropTypes.bool,
  useHover: PropTypes.bool,
  zIndex: PropTypes.number,
  onToggle: PropTypes.func,
}

export const defaultProps: Partial<Props> = {
  arrow: true,
  arrowSize: 10,
  background: '',
  className: '',
  color: '',
  direction: 'up',
  distance: undefined,
  eventOff: undefined,
  eventOn: undefined,
  eventToggle: undefined,
  forceDirection: false,
  hoverDelay: 200,
  isOpen: undefined,
  mouseOutDelay: undefined,
  padding: '10px',
  styles: {},
  tagName: 'div',
  tipContentHover: false,
  tipContentClassName: undefined,
  useDefaultStyles: false,
  useHover: true,
  zIndex: 1000,
  onToggle: undefined,
}