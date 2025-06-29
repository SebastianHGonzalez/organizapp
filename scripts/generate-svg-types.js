#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to convert filename to TypeScript-safe identifier
function toTypeScriptIdentifier(filename) {
  // Remove .svg extension
  const name = filename.replace('.svg', '');
  
  // Convert kebab-case to PascalCase
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Function to generate the type declaration file
function generateSvgTypes() {
  const svgDir = path.join(__dirname, '..', 'assets', 'svg');
  const outputFile = path.join(__dirname, '..', 'svg-types.d.ts');
  
  try {
    // Read all files in the svg directory
    const files = fs.readdirSync(svgDir);
    
    // Filter for .svg files
    const svgFiles = files.filter(file => file.endsWith('.svg'));
    
    if (svgFiles.length === 0) {
      console.log('No SVG files found in assets/svg directory');
      return;
    }
    
    // Generate type declarations
    let typeDeclarations = `// Auto-generated SVG type declarations
// Generated on: ${new Date().toISOString()}
// Regenerate with:
// pnpm run generate-svg-types

// Individual SVG file declarations
`;
    
    svgFiles.forEach(file => {
      const componentName = toTypeScriptIdentifier(file);
      const importPath = `@/assets/svg/${file}`;
      
      typeDeclarations += `declare module "${importPath}" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const ${componentName}: React.FC<SvgProps>;
  export default ${componentName};
}

`;
    });
    
    // Write the type declarations file
    fs.writeFileSync(outputFile, typeDeclarations);
    
    console.log(`✅ Generated SVG type declarations for ${svgFiles.length} files:`);
    svgFiles.forEach(file => {
      console.log(`   - ${file} → ${toTypeScriptIdentifier(file)}`);
    });
    console.log(`📄 Output file: ${outputFile}`);
    
  } catch (error) {
    console.error('❌ Error generating SVG types:', error.message);
  }
}

// Run the script
generateSvgTypes();
