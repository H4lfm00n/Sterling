import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { useNotes } from '../contexts/NoteContext'
import { GraphNode, GraphEdge } from '../types'

const GraphView: React.FC = () => {
  const { state } = useNotes()
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || Object.keys(state.notes).length === 0) return

    const svg = d3.select(svgRef.current)
    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight

    // Clear previous content
    svg.selectAll('*').remove()

    // Create nodes from notes
    const nodes: GraphNode[] = Object.values(state.notes).map(note => ({
      id: note.id,
      label: note.title,
      type: 'note',
      size: Math.max(20, note.content.length / 100),
      color: '#0ea5e9',
      x: Math.random() * width,
      y: Math.random() * height,
    }))

    // Create edges from links
    const edges: GraphEdge[] = state.links.map(link => ({
      source: link.sourceId,
      target: link.targetId,
      type: 'link',
      weight: 1,
    }))

    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(edges).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius((d: any) => d.size + 10))

    // Create links
    const link = svg.append('g')
      .selectAll('line')
      .data(edges)
      .enter()
      .append('line')
      .attr('stroke', '#94a3b8')
      .attr('stroke-width', 2)
      .attr('opacity', 0.6)

    // Create nodes
    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .call(d3.drag<any, GraphNode>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))

    // Add circles to nodes
    node.append('circle')
      .attr('r', (d: GraphNode) => d.size)
      .attr('fill', (d: GraphNode) => d.color)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)

    // Add labels to nodes
    node.append('text')
      .text((d: GraphNode) => d.label)
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('fill', '#ffffff')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .style('pointer-events', 'none')

    // Add hover effects
    node.on('mouseover', function(_event, _d) {
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('r', (d: any) => d.size * 1.2)
        .attr('stroke-width', 3)
    })
    .on('mouseout', function(_event, _d) {
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('r', (d: any) => d.size)
        .attr('stroke-width', 2)
    })

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      node
        .attr('transform', (d: GraphNode) => `translate(${d.x},${d.y})`)
    })

    // Drag functions
    function dragstarted(event: any, d: GraphNode) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event: any, d: GraphNode) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event: any, d: GraphNode) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    // Cleanup
    return () => {
      simulation.stop()
    }
  }, [state.notes, state.links])

  return (
    <div className="h-full flex flex-col bg-white dark:bg-secondary-900">
      {/* Graph Header */}
      <div className="bg-secondary-50 dark:bg-secondary-800 border-b border-secondary-200 dark:border-secondary-700 px-6 py-4">
        <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
          Knowledge Graph
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400 mt-1">
          Visualize connections between your notes
        </p>
      </div>

      {/* Graph Content */}
      <div className="flex-1 relative">
        {Object.keys(state.notes).length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                No Notes Yet
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                Create some notes and link them together to see your knowledge graph.
              </p>
            </div>
          </div>
        ) : (
          <svg
            ref={svgRef}
            className="w-full h-full"
            style={{ background: 'transparent' }}
          />
        )}
      </div>

      {/* Graph Controls */}
      <div className="bg-secondary-50 dark:bg-secondary-800 border-t border-secondary-200 dark:border-secondary-700 px-6 py-3">
        <div className="flex items-center justify-between text-sm text-secondary-600 dark:text-secondary-400">
          <div className="flex items-center space-x-4">
            <span>Nodes: {Object.keys(state.notes).length}</span>
            <span>Links: {state.links.length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Drag nodes to rearrange</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GraphView
