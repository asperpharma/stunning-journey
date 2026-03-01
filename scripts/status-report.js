#!/usr/bin/env node

/**
 * Weekly Status Report Generator for Asper Beauty Shop
 * 
 * Scans FINAL_SUMMARY.md and NEXT_STEPS.md to generate a progress summary.
 * 
 * Usage: node scripts/status-report.js
 * or: npm run status-report
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
  magenta: '\x1b[35m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function readFile(filePath) {
  const fullPath = path.resolve(__dirname, '..', filePath);
  try {
    return fs.readFileSync(fullPath, 'utf-8');
  } catch (error) {
    return null;
  }
}

function parseChecklist(content) {
  const lines = content.split('\n');
  let totalItems = 0;
  let completedItems = 0;
  let sections = [];
  let currentSection = null;
  
  lines.forEach(line => {
    // Check for checklist items
    const completedMatch = line.match(/^[\s-]*\[x\]/i);
    const pendingMatch = line.match(/^[\s-]*\[\s\]/);
    
    if (completedMatch || pendingMatch) {
      totalItems++;
      if (completedMatch) completedItems++;
      
      // Extract task description
      const taskText = line.replace(/^[\s-]*\[[x\s]\]/i, '').trim();
      
      if (currentSection) {
        if (completedMatch) {
          currentSection.completed.push(taskText);
        } else {
          currentSection.pending.push(taskText);
        }
      }
    }
    
    // Detect section headers
    const headerMatch = line.match(/^#+\s+(.+)/);
    if (headerMatch) {
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = {
        name: headerMatch[1],
        completed: [],
        pending: [],
      };
    }
  });
  
  if (currentSection) {
    sections.push(currentSection);
  }
  
  return { totalItems, completedItems, sections };
}

function extractMetrics(summaryContent) {
  const metrics = {
    buildStatus: 'Unknown',
    bundleSize: 'Unknown',
    skuCount: 'Unknown',
    features: [],
  };
  
  if (summaryContent) {
    // Extract build status
    if (summaryContent.includes('✓ Build: Successful')) {
      metrics.buildStatus = 'Passing';
    }
    
    // Extract bundle size
    const bundleMatch = summaryContent.match(/~(\d+)\s*KB.*gzipped:\s*~(\d+)\s*KB/);
    if (bundleMatch) {
      metrics.bundleSize = `${bundleMatch[1]} KB (gzipped: ${bundleMatch[2]} KB)`;
    }
    
    // Extract SKU count
    const skuMatch = summaryContent.match(/(\d+,?\d*)\+?\s*SKUs/i);
    if (skuMatch) {
      metrics.skuCount = skuMatch[1];
    }
    
    // Extract features
    const featureSection = summaryContent.match(/### ✅ Key Features Implemented([\s\S]*?)###/);
    if (featureSection) {
      const featureLines = featureSection[1].split('\n');
      featureLines.forEach(line => {
        const featureMatch = line.match(/^\d+\.\s+\*\*(.+?)\*\*/);
        if (featureMatch) {
          metrics.features.push(featureMatch[1]);
        }
      });
    }
  }
  
  return metrics;
}

function generateReport() {
  log(`\n${colors.bold}${colors.cyan}╔════════════════════════════════════════════════════════╗${colors.reset}`);
  log(`${colors.bold}${colors.cyan}║     Asper Beauty Shop - Weekly Status Report         ║${colors.reset}`);
  log(`${colors.bold}${colors.cyan}╚════════════════════════════════════════════════════════╝${colors.reset}`);
  
  const now = new Date();
  log(`\n${colors.blue}Report Date: ${now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}${colors.reset}`);
  log(`${colors.blue}Generated at: ${now.toLocaleTimeString()}${colors.reset}\n`);
  
  // Read documentation files
  const summaryContent = readFile('FINAL_SUMMARY.md');
  const nextStepsContent = readFile('NEXT_STEPS.md');
  
  if (!summaryContent) {
    log(`${colors.red}⚠ Warning: FINAL_SUMMARY.md not found${colors.reset}`);
  }
  
  if (!nextStepsContent) {
    log(`${colors.red}⚠ Warning: NEXT_STEPS.md not found${colors.reset}`);
  }
  
  // Section 1: Production Status
  log(`${colors.bold}${colors.magenta}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  log(`${colors.bold}${colors.blue}📊 Production Status${colors.reset}`);
  log(`${colors.magenta}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
  
  if (summaryContent) {
    const metrics = extractMetrics(summaryContent);
    
    log(`${colors.cyan}Build Status:${colors.reset} ${colors.green}${metrics.buildStatus}${colors.reset}`);
    log(`${colors.cyan}Bundle Size:${colors.reset} ${metrics.bundleSize}`);
    log(`${colors.cyan}Product SKUs:${colors.reset} ${metrics.skuCount}+`);
    
    if (metrics.features.length > 0) {
      log(`\n${colors.cyan}Key Features:${colors.reset}`);
      metrics.features.forEach(feature => {
        log(`  ${colors.green}✓${colors.reset} ${feature}`);
      });
    }
  } else {
    log(`${colors.yellow}No summary data available${colors.reset}`);
  }
  
  // Section 2: Task Progress
  log(`\n${colors.bold}${colors.magenta}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  log(`${colors.bold}${colors.blue}✅ Task Progress${colors.reset}`);
  log(`${colors.magenta}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
  
  if (nextStepsContent) {
    const checklist = parseChecklist(nextStepsContent);
    
    if (checklist.totalItems > 0) {
      const completionRate = Math.round((checklist.completedItems / checklist.totalItems) * 100);
      
      log(`${colors.cyan}Total Tasks:${colors.reset} ${checklist.totalItems}`);
      log(`${colors.green}Completed:${colors.reset} ${checklist.completedItems}`);
      log(`${colors.yellow}Pending:${colors.reset} ${checklist.totalItems - checklist.completedItems}`);
      log(`${colors.cyan}Completion Rate:${colors.reset} ${completionRate}%\n`);
      
      // Progress bar
      const barLength = 40;
      const filledLength = Math.round((completionRate / 100) * barLength);
      const emptyLength = barLength - filledLength;
      const progressBar = `[${'█'.repeat(filledLength)}${' '.repeat(emptyLength)}]`;
      log(`${colors.green}${progressBar}${colors.reset} ${completionRate}%\n`);
      
      // Show sections with tasks
      if (checklist.sections.length > 0) {
        log(`${colors.cyan}Task Breakdown by Section:${colors.reset}\n`);
        
        checklist.sections.forEach(section => {
          const sectionTotal = section.completed.length + section.pending.length;
          if (sectionTotal > 0) {
            log(`${colors.bold}${section.name}${colors.reset}`);
            log(`  ${colors.green}✓ ${section.completed.length} completed${colors.reset} | ${colors.yellow}○ ${section.pending.length} pending${colors.reset}`);
            
            // Show up to 3 pending items per section
            if (section.pending.length > 0) {
              section.pending.slice(0, 3).forEach(task => {
                log(`    ${colors.yellow}○${colors.reset} ${task}`);
              });
              if (section.pending.length > 3) {
                log(`    ${colors.yellow}... and ${section.pending.length - 3} more${colors.reset}`);
              }
            }
            log('');
          }
        });
      }
    } else {
      log(`${colors.yellow}No tasks found in checklist${colors.reset}\n`);
    }
  } else {
    log(`${colors.yellow}No progress data available${colors.reset}\n`);
  }
  
  // Section 3: Next Actions
  log(`${colors.bold}${colors.magenta}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  log(`${colors.bold}${colors.blue}🎯 Recommended Next Actions${colors.reset}`);
  log(`${colors.magenta}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
  
  if (nextStepsContent) {
    const checklist = parseChecklist(nextStepsContent);
    
    // Find the first section with pending items
    const nextSection = checklist.sections.find(s => s.pending.length > 0);
    
    if (nextSection) {
      log(`${colors.cyan}Focus Area:${colors.reset} ${nextSection.name}\n`);
      log(`${colors.cyan}Priority Tasks:${colors.reset}`);
      nextSection.pending.slice(0, 5).forEach((task, index) => {
        log(`  ${index + 1}. ${task}`);
      });
    } else {
      log(`${colors.green}✓ All tasks completed!${colors.reset}`);
      log(`${colors.cyan}Consider:${colors.reset}`);
      log(`  1. Run health checks to verify production readiness`);
      log(`  2. Review and update documentation`);
      log(`  3. Plan next feature release`);
    }
  } else {
    log(`${colors.cyan}Suggested actions:${colors.reset}`);
    log(`  1. Create NEXT_STEPS.md with upcoming tasks`);
    log(`  2. Run health check: npm run health-check`);
    log(`  3. Review production deployment status`);
  }
  
  // Section 4: System Commands
  log(`\n${colors.bold}${colors.magenta}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  log(`${colors.bold}${colors.blue}🛠️  Available Commands${colors.reset}`);
  log(`${colors.magenta}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
  
  log(`${colors.cyan}Development:${colors.reset}`);
  log(`  npm run dev              Start development server`);
  log(`  npm run build            Build for production`);
  log(`  npm run preview          Preview production build\n`);
  
  log(`${colors.cyan}Quality Assurance:${colors.reset}`);
  log(`  npm run lint             Run ESLint`);
  log(`  npm run test             Run tests`);
  log(`  npm run health-check     Run 6-step production audit\n`);
  
  log(`${colors.cyan}Reporting:${colors.reset}`);
  log(`  npm run status-report    Generate this status report\n`);
  
  // Footer
  log(`${colors.bold}${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  log(`${colors.cyan}Report generated successfully!${colors.reset}`);
  log(`${colors.cyan}Next report recommended: ${new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}${colors.reset}`);
  log(`${colors.bold}${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
}

// Run the report
try {
  generateReport();
} catch (error) {
  log(`\n${colors.red}${colors.bold}Error generating report:${colors.reset}`, colors.red);
  log(`${colors.red}${error.message}${colors.reset}\n`, colors.red);
  process.exit(1);
}
