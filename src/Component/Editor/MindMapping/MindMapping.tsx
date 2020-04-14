import React, { useState, useEffect, useCallback } from 'react';
import rd3 from 'react-d3-library';
import { generateD3Node } from './MindMappingController';

export function MindMapping() {
  const buildSvgRef = useCallback((node: SVGElement) => {
    if (!node) {
      return;
    }
    generateD3Node(node);
  }, []);

  return (
    <div>
      <svg ref={buildSvgRef} width={500} height={500}></svg>
    </div>
  );
}
