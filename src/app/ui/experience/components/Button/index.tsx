import React from 'react';
import { classNames } from 'helpers/classNames';
import { ButtonWrapper } from 'app/ui/experience/components/Button/styles';
import type { ButtonProps } from 'app/ui/experience/components/Button/types';

export const Button = ({
  as,
  children,
  className = '',
  dataTestId = 'button',
  id,
  style,
}: ButtonProps) => (
    <ButtonWrapper
      as={as}
      className={classNames(className, {
        // TODO: Write Button's classes
      })}
      data-testid={dataTestId}
      id={id}
      style={style}
    >
      {children}
    </ButtonWrapper>
  );
