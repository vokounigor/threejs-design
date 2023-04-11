import React, { FC } from 'react';
import state from '../store';
import { useSnapshot } from 'valtio';
import { getContrastingColor } from '../config/helpers';

interface ButtonProps extends React.ComponentProps<'button'> {
  customStyles?: string;
  filled?: boolean;
}

const Button: FC<ButtonProps> = ({ customStyles, filled, children, ...props }) => {
  const snap = useSnapshot(state);

  const resolveStyles = () => {
    if (filled) {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      };
    }

    return { borderWidth: '1px', borderColor: snap.color, color: snap.color };
  };

  return (
    <button className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`} style={resolveStyles()} {...props}>
      {children}
    </button>
  );
};

export default Button;
