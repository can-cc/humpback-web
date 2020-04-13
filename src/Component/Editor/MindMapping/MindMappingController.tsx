import d3 from 'd3';

export function generateD3Node({ width, height }) {
  const svgDom = document.createElement('svg');
  const svg = d3
    .select(svgDom)
    .attr('width', 500)
    .attr('height', 500)
    .attr('view-box', [0, 0, width, height])
    .attr('font-size', 10)
    .attr('font-family', 'sans-serif')
    .attr('text-anchor', 'middle');

  const rootNode = svg
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

  rootNode
    .append('circle')
    .attr('r', 30)
    .attr('fill-opacity', 0.7)
    .attr('fill', '#eee');

  return svg.node();
}
