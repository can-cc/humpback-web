import React, { useState, useEffect } from 'react';
import rd3 from 'react-d3-library';
import { generateD3Node } from './MindMappingController';

const RD3Component = rd3.Component;

export function MindMapping() {
  const [d3Data, setD3Data] = useState<HTMLDivElement>();
  useEffect(() => {
    setD3Data(
      generateD3Node({
        width: 500,
        height: 500,
      })
    );
  }, []);
  return (
    <div>
      <RD3Component data={d3Data} />
    </div>
  );
}
