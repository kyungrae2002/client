import React from 'react';

export default function CurationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-gray-100">{children}</div>;
}
