import React, { Component } from 'react';
import enhancer from './enhancer';
import { propTypes, defaultProps } from './types';

class Line extends Component {
  render() {
    const {
      className,
      percent,
      prefixCls,
      strokeColor,
      strokeLinecap,
      strokeWidth,
      style,
      trailColor,
      trailWidth,
      vertical,
      ...restProps
    } = this.props;

    delete restProps.gapPosition;

    const pathStyle = {
      strokeDasharray: '100px, 100px',
      strokeDashoffset: `${(100 - percent)}px`,
      transition: 'stroke-dashoffset 0.3s ease 0s, stroke 0.3s linear',
    };

    const center = strokeWidth / 2;
    const target = 100 - (strokeWidth / 2);
    const L = vertical
      ? `L ${strokeLinecap === 'round' ? target : 100},${center}`
      : `L ${center}, ${strokeLinecap === 'round' ? target : 100}`;
    const pathString = `M ${strokeLinecap === 'round' ? center : 0},${center} ${L}`;
    const viewBoxString = vertical
      ? `0 0 ${strokeWidth} 100`
      : `0 0 100 ${strokeWidth}`;

    return (
      <svg
        className={`${prefixCls}-line ${className}`}
        viewBox={viewBoxString}
        preserveAspectRatio="none"
        style={style}
        {...restProps}
      >
        <path
          className={`${prefixCls}-line-trail`}
          d={pathString}
          strokeLinecap={strokeLinecap}
          stroke={trailColor}
          strokeWidth={trailWidth || strokeWidth}
          fillOpacity="0"
        />
        <path
          className={`${prefixCls}-line-path`}
          d={pathString}
          strokeLinecap={strokeLinecap}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fillOpacity="0"
          ref={(path) => { this.path = path; }}
          style={pathStyle}
        />
      </svg>
    );
  }
}

Line.propTypes = propTypes;

Line.defaultProps = defaultProps;

export default enhancer(Line);
