import d3 from 'd3';



const currentDay = 8


export function generateD3Node(svgArea: any): any {
  // const svgDom = document.createElement('svg');
  // const svg = d3
  //   .select(svgDom)
  //   .attr('width', 500)
  //   .attr('height', 500)
  //   .attr('view-box', [0, 0, width, height])
  //   .attr('font-size', 10)
  //   .attr('font-family', 'sans-serif')
  //   .attr('text-anchor', 'middle');

  // const rootNode = svg
  //   .append('g')
  //   .attr('transform', `translate(${width / 2}, ${height / 2})`);

  const data = {
    name: 'root',
    children: [
      {
        name: 'leaf',
        children: [
          {name: 'leaf'},
          {name: 'leaf'},
        ]
      }, {
        name: 'leaf',
        children: [
          {name: 'leaf'},
          {name: 'leaf'},
        ]
      }, {
        name: 'leaf'
      }, {
        name: 'leaf'
      },
    ]
  }
  
  const treeChart = d3.layout.tree()
    .size([350, 350])
  const linkGenerator = d3.svg.diagonal()
  const depthScale = d3.scale.category10([0, 1, 2])
  
  const nodeContainers = d3.select(svgArea)
    .append('g')
    .attr('transform', 'translate(30, 30)')
    .selectAll('g')
    .data(treeChart(data))
    .enter()
    .append('g')
    .attr('transform', d => `translate(${d.x}, ${d.y})`)
  
  nodeContainers.append('circle')
    .attr({
      fill: d => depthScale(d.depth),
      r: 10,
      stroke: 'white',
      'stroke-width': 2,
    })
  
  nodeContainers.append('text')
    .text(d => d.name)
    .attr({
      transform: 'translate(10, 4)'
    })
  
  d3.select(svgArea).selectAll('path')
    .data(treeChart.links(treeChart(data)))
    .enter()
    .insert('path', 'g')
    .attr('d', linkGenerator)
    .style({
      fill: 'none',
      stroke: 'black',
      'stroke-width': '2',
      transform: 'translate(30px, 30px)'
    })

  return svgArea;
}
