'use client';

import { ReactNode } from 'react';

function ClientComponent({ children }: { children: ReactNode }) {
  console.log('client-component');
  return <div>{children}</div>;
}

export default ClientComponent;
