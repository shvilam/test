import React from 'react';

declare module 'react' {
  interface IframeHTMLAttributes<T> extends React.HTMLAttributes<T> {
    allowPaymentRequest?: boolean;
  }
}
