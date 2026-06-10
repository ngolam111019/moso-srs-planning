const fs = require('fs');
const path = require('path');

/**
 * Knowledge Graph Generator
 * Từ requirements → Knowledge Graph visualization
 */

class KGGenerator {
  constructor(requirementsFile) {
    this.requirements = JSON.parse(
      fs.readFileSync(requirementsFile, 'utf-8')
    );
    this.graph = {
      nodes: [],
      edges: [],
      metadata: {}
    };
  }

  /**
   * Extract entities from requirements
   */
  extractEntities() {
    const entities = new Set();
    
    // Từ features
    this.requirements.features?.forEach(feature => {
      entities.add(JSON.stringify({
        id: `feature-${feature.id}`,
        label: feature.name,
        type: 'feature',
        properties: {
          description: feature.description,
          complexity: feature.complexity
        }
      }));
    });

    // Từ users
    this.requirements.users?.forEach(user => {
      entities.add(JSON.stringify({
        id: `user-${user.id}`,
        label: user.name,
        type: 'user',
        properties: { role: user.role }
      }));
    });

    return Array.from(entities).map(e => JSON.parse(e));
  }

  /**
   * Build relationships
   */
  buildRelationships() {
    const edges = [];

    // User → Feature relationships
    this.requirements.features?.forEach(feature => {
      feature.users_affected?.forEach(userType => {
        edges.push({
          source: `user-${userType}`,
          target: `feature-${feature.id}`,
          type: 'uses',
          weight: 1
        });
      });
    });

    // Feature → Feature dependencies
    this.requirements.features?.forEach(feature => {
      feature.dependencies?.forEach(depId => {
        edges.push({
          source: `feature-${feature.id}`,
          target: `feature-${depId}`,
          type: 'depends_on',
          weight: 2
        });
      });
    });

    return edges;
  }

  /**
   * Generate Knowledge Graph
   */
  generate() {
    const nodes = this.extractEntities();
    const edges = this.buildRelationships();

    this.graph.nodes = nodes;
    this.graph.edges = edges;
    this.graph.metadata = {
      generated_at: new Date().toISOString(),
      node_count: nodes.length,
      edge_count: edges.length,
      system: 'moso.vn'
    };

    return this.graph;
  }

  /**
   * Export as JSON
   */
  exportJSON(outputPath) {
    fs.writeFileSync(
      outputPath,
      JSON.stringify(this.graph, null, 2)
    );
  }

  /**
   * Export as Mermaid diagram
   */
  exportMermaid(outputPath) {
    const mermaid = this.toMermaid();
    fs.writeFileSync(outputPath, mermaid);
  }

  /**
   * Convert to Mermaid syntax
   */
  toMermaid() {
    let diagram = 'graph TB\n';

    // Add nodes with styling
    this.graph.nodes.forEach(node => {
      const style = node.type === 'feature' ? 'rect' : 'circle';
      diagram += `  ${node.id}["${node.label}"] \n`;
    });

    diagram += '\n';

    // Add edges
    this.graph.edges.forEach(edge => {
      const arrow = edge.type === 'depends_on' ? '--depends-->' : '--uses-->';
      diagram += `  ${edge.source} ${arrow} ${edge.target}\n`;
    });

    return diagram;
  }

  /**
   * Export as HTML visualization
   */
  exportHTML(outputPath) {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/vis-network/standalone/umd/vis-network.min.js"></script>
  <style>
    #network { width: 100%; height: 100vh; }
    body { font-family: Arial; }
  </style>
</head>
<body>
  <div id="network"></div>
  <script type="module">
    const data = ${JSON.stringify(this.graph)};
    
    const nodes = new vis.DataSet(data.nodes.map(n => ({
      id: n.id,
      label: n.label,
      color: n.type === 'feature' ? '#FF6B6B' : '#4ECDC4',
      shape: n.type === 'feature' ? 'box' : 'circle'
    })));

    const edges = new vis.DataSet(data.edges.map(e => ({
      from: e.source,
      to: e.target,
      label: e.type,
      arrows: 'to'
    })));

    const container = document.getElementById('network');
    const graph = { nodes, edges };
    const options = { physics: true };
    new vis.Network(container, graph, options);
  </script>
</body>
</html>
    `;
    
    fs.writeFileSync(outputPath, html);
  }
}

// Usage
if (require.main === module) {
  const generator = new KGGenerator('artifacts/requirements.json');
  const kg = generator.generate();
  
  generator.exportJSON('artifacts/knowledge-graph.json');
  generator.exportMermaid('artifacts/knowledge-graph.mmd');
  generator.exportHTML('artifacts/knowledge-graph.html');
  
  console.log('✅ Knowledge Graph generated!');
  console.log(`   - Nodes: ${kg.nodes.length}`);
  console.log(`   - Edges: ${kg.edges.length}`);
}

module.exports = KGGenerator;
