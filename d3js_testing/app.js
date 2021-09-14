
//! PART ONE

// const el = d3.select('#foo')
//   .selectAll('p')
//   .data([1, 2, 3, 4])
//   .enter()
//   .append('p')
//   .text(data => data + "Hello");


// PART TWO
// const dummy_data = [
//   {
//     date: '17-12-2020',
//     value: 17,
//   },
//   {
//     date: '18-12-2020',
//     value: 10,
//   },
//   {
//     date: '19-12-2020',
//     value: 20,
//   },
//   {
//     date: '20-12-2020',
//     value: 40,
//   },
//   {
//     date: '21-12-2020',
//     value: 17,
//   },
//   {
//     date: '22-12-2020',
//     value: 10,
//   },
//   {
//     date: '23-12-2020',
//     value: 20,
//   },
//   {
//     date: '24-12-2020',
//     value: 40,
//   },

// ]


// const xScale = d3.scaleBand()
//   .domain(dummy_data.map((data_point) => data_point.date))
//   .rangeRound([0, 600])
//   .padding(0.1)

// const yScale = d3.scaleLinear()
//   .domain([0, 50])
//   .range([400, 0])

// const plot = d3.select('svg')
//   .classed('container', true);

// plot.selectAll('.bar')
//   .data(dummy_data)
//   .enter()
//   .append('rect')
//   .classed('bar', true)
//   .attr('width', xScale.bandwidth())
//   .attr('height', data => 400 - yScale(data.value))
//   .attr('x', data => xScale(data.date))
//   .attr('y', data => yScale(data.value))

