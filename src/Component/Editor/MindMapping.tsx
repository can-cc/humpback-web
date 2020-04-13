import React, { useState, useEffect } from 'react';
import rd3 from 'react-d3-library';
import node from './example';

const RD3Component = rd3.Component;

export function MindMapping() {
  const [d3Data, setD3Data] = useState<HTMLDivElement>();
  useEffect(() => {
    setD3Data(node);
  }, []);
  return (
    <div>
      <RD3Component data={d3Data} />
    </div>
  );
}
