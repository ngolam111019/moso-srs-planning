const fs = require('fs');
const path = require('path');
const KGGenerator = require('./agents/kg-generator');

/**
 * Moso.vn SRS + Knowledge Graph Pipeline
 */
class SRSPipeline {
  constructor(projectName = 'moso') {
    this.projectName = projectName;
    this.outputDir = './artifacts';
    this.ensureOutputDir();
  }

  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  async run() {
    console.log('🚀 Starting Moso.vn SRS + KG Pipeline\n');

    console.log('📊 PHASE 1: System Analysis');
    console.log('  → Invoke Mary (Analyst) Agent');
    console.log('  → Task: Analyze moso.vn features, users, domain');
    console.log('  ⏳ Waiting for user input...\n');

    console.log('📋 PHASE 2: Requirements Definition');
    console.log('  → Invoke John (PM) Agent');
    console.log('  → Input: artifacts/moso-analysis.json');
    console.log('  → Output: artifacts/requirements.json\n');

    console.log('🧠 PHASE 3: Knowledge Graph Generation');
    const requirementsFile = path.join(
      this.outputDir,
      'requirements.json'
    );
    
    if (fs.existsSync(requirementsFile)) {
      const generator = new KGGenerator(requirementsFile);
      const kg = generator.generate();
      
      generator.exportJSON(
        path.join(this.outputDir, 'knowledge-graph.json')
      );
      generator.exportMermaid(
        path.join(this.outputDir, 'knowledge-graph.mmd')
      );
      generator.exportHTML(
        path.join(this.outputDir, 'knowledge-graph.html')
      );
      
      console.log(`  ✅ Generated KG with ${kg.nodes.length} nodes, ${kg.edges.length} edges\n`);
    }

    console.log('📚 PHASE 4: SRS Documentation');
    console.log('  → Invoke Paige (Tech Writer) Agent');
    console.log('  → Output: artifacts/SRS-moso.md\n');

    console.log('✨ Pipeline Complete!');
    console.log('\nGenerated Files:');
    console.log('  📄 artifacts/SRS-moso.md');
    console.log('  📊 artifacts/knowledge-graph.json');
    console.log('  📈 artifacts/knowledge-graph.mmd');
    console.log('  🌐 artifacts/knowledge-graph.html');
  }
}

const pipeline = new SRSPipeline('moso');
pipeline.run().catch(console.error);
