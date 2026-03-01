#!/usr/bin/env node

/**
 * Health Check Protocol for Asper Beauty Shop
 * 
 * Runs a comprehensive 6-step "Medical Luxury" audit to ensure
 * the site is production-ready and safe for customers.
 * 
 * Usage: node scripts/health-check.js
 * or: npm run health-check
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = [];

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logStep(step, title) {
  log(`\n${colors.bold}${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  log(`${colors.bold}${colors.blue}Step ${step}: ${title}${colors.reset}`);
  log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
}

function checkPassed(message) {
  totalChecks++;
  passedChecks++;
  log(`${colors.green}✓${colors.reset} ${message}`);
}

function checkFailed(message, error = null) {
  totalChecks++;
  failedChecks.push({ message, error });
  log(`${colors.red}✗${colors.reset} ${message}`);
  if (error) {
    log(`  ${colors.red}Error: ${error}${colors.reset}`);
  }
}

function checkWarning(message) {
  log(`${colors.yellow}⚠${colors.reset} ${message}`);
}

function runCommand(command, description) {
  try {
    log(`\n${colors.yellow}Running: ${command}${colors.reset}`);
    const output = execSync(command, { 
      encoding: 'utf-8',
      cwd: path.resolve(__dirname, '..'),
      stdio: 'pipe'
    });
    checkPassed(description);
    return { success: true, output };
  } catch (error) {
    checkFailed(description, error.message);
    return { success: false, error: error.message };
  }
}

function checkFileExists(filePath, description) {
  const fullPath = path.resolve(__dirname, '..', filePath);
  if (fs.existsSync(fullPath)) {
    checkPassed(description);
    return true;
  } else {
    checkFailed(description, `File not found: ${filePath}`);
    return false;
  }
}

// Step 1: Linting Check
function step1_Linting() {
  logStep(1, 'Code Quality - Linting');
  
  // Check if ESLint is configured
  checkFileExists('eslint.config.js', 'ESLint configuration exists');
  
  // Run linting (skip if ESLint not installed)
  try {
    const result = runCommand('npm run lint', 'ESLint passes all checks');
    if (!result.success) {
      checkWarning('Linting failed - review and fix code quality issues');
    }
  } catch (e) {
    checkWarning('ESLint not available - install dependencies first');
  }
}

// Step 2: Build Verification
function step2_Build() {
  logStep(2, 'Build System - Production Bundle');
  
  // Check build configuration
  checkFileExists('vite.config.ts', 'Vite configuration exists');
  checkFileExists('tsconfig.json', 'TypeScript configuration exists');
  
  // Run production build
  const buildResult = runCommand('npm run build', 'Production build completes successfully');
  
  if (buildResult.success) {
    // Check if dist folder was created
    if (fs.existsSync(path.resolve(__dirname, '..', 'dist'))) {
      checkPassed('Build artifacts created in dist/');
      
      // Check critical build files
      checkFileExists('dist/index.html', 'HTML entry point generated');
      
      // Check for JS and CSS bundles
      const distPath = path.resolve(__dirname, '..', 'dist', 'assets');
      if (fs.existsSync(distPath)) {
        const files = fs.readdirSync(distPath);
        const hasJS = files.some(f => f.endsWith('.js'));
        const hasCSS = files.some(f => f.endsWith('.css'));
        
        if (hasJS) checkPassed('JavaScript bundle generated');
        else checkFailed('JavaScript bundle missing');
        
        if (hasCSS) checkPassed('CSS bundle generated');
        else checkFailed('CSS bundle missing');
      }
    } else {
      checkFailed('Build artifacts not found');
    }
  }
}

// Step 3: Type Safety Check
function step3_TypeChecking() {
  logStep(3, 'Type Safety - TypeScript Validation');
  
  // Run TypeScript compiler check
  const tscResult = runCommand('npx tsc --noEmit', 'TypeScript type checking passes');
  
  if (tscResult.success) {
    checkPassed('No type errors found');
  }
}

// Step 4: Dependencies Security Check
function step4_Dependencies() {
  logStep(4, 'Vault Check - Dependency Security');
  
  // Check package.json exists
  checkFileExists('package.json', 'Package manifest exists');
  checkFileExists('package-lock.json', 'Lock file exists');
  
  // Check for security vulnerabilities
  try {
    log(`\n${colors.yellow}Running: npm audit${colors.reset}`);
    const auditOutput = execSync('npm audit --json', { 
      encoding: 'utf-8',
      cwd: path.resolve(__dirname, '..'),
    });
    
    const audit = JSON.parse(auditOutput);
    const vulnerabilities = audit.metadata?.vulnerabilities || {};
    
    if (vulnerabilities.critical > 0) {
      checkFailed(`${vulnerabilities.critical} critical vulnerabilities found`);
    } else {
      checkPassed('No critical vulnerabilities');
    }
    
    if (vulnerabilities.high > 0) {
      checkWarning(`${vulnerabilities.high} high-severity vulnerabilities found`);
    } else {
      checkPassed('No high-severity vulnerabilities');
    }
    
    if (vulnerabilities.moderate > 0) {
      checkWarning(`${vulnerabilities.moderate} moderate-severity vulnerabilities`);
    }
    
    const total = vulnerabilities.critical + vulnerabilities.high + vulnerabilities.moderate + (vulnerabilities.low || 0);
    if (total === 0) {
      checkPassed('All dependencies are secure');
    }
  } catch (error) {
    checkWarning('Could not run security audit - npm audit command failed');
  }
}

// Step 5: Critical Files Check
function step5_CriticalFiles() {
  logStep(5, 'File Structure - Critical Assets');
  
  // Check critical application files
  checkFileExists('src/App.tsx', 'Main App component exists');
  checkFileExists('src/main.tsx', 'Application entry point exists');
  checkFileExists('src/index.css', 'Global styles exist');
  checkFileExists('index.html', 'HTML template exists');
  
  // Check important pages
  checkFileExists('src/pages/Index.tsx', 'Home page component exists');
  
  // Check components
  checkFileExists('src/components/Header.tsx', 'Header component exists');
  checkFileExists('src/components/Hero.tsx', 'Hero component exists');
  checkFileExists('src/components/ProductGrid.tsx', 'Product grid component exists');
  
  // Check configuration files
  checkFileExists('tailwind.config.ts', 'Tailwind configuration exists');
  checkFileExists('components.json', 'Components configuration exists');
  
  // Check documentation
  checkFileExists('README.md', 'README documentation exists');
  checkFileExists('FINAL_SUMMARY.md', 'Final summary document exists');
  checkFileExists('NEXT_STEPS.md', 'Next steps document exists');
}

// Step 6: Visual Identity Check
function step6_VisualIdentity() {
  logStep(6, 'Brand Identity - Theme Validation');
  
  // Check CSS file for required theme variables
  const cssPath = path.resolve(__dirname, '..', 'src/index.css');
  if (fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    
    // Check for font imports
    if (cssContent.includes('Playfair Display')) {
      checkPassed('Display font (Playfair Display) configured');
    } else {
      checkFailed('Display font not found in CSS');
    }
    
    if (cssContent.includes('Inter')) {
      checkPassed('Body font (Inter) configured');
    } else {
      checkFailed('Body font not found in CSS');
    }
    
    // Check for theme variables
    if (cssContent.includes('--primary')) {
      checkPassed('Primary color variable defined');
    } else {
      checkFailed('Primary color variable missing');
    }
    
    if (cssContent.includes('--background')) {
      checkPassed('Background color variable defined');
    } else {
      checkFailed('Background color variable missing');
    }
    
    // Check for gradients
    if (cssContent.includes('--gradient-hero') || cssContent.includes('gradient')) {
      checkPassed('Gradient definitions found');
    } else {
      checkWarning('No gradient definitions found');
    }
  } else {
    checkFailed('CSS file not found');
  }
  
  // Check Tailwind config
  const tailwindPath = path.resolve(__dirname, '..', 'tailwind.config.ts');
  if (fs.existsSync(tailwindPath)) {
    const tailwindContent = fs.readFileSync(tailwindPath, 'utf-8');
    
    if (tailwindContent.includes('Playfair Display')) {
      checkPassed('Custom fonts configured in Tailwind');
    }
    
    if (tailwindContent.includes('fontFamily')) {
      checkPassed('Font family extensions configured');
    }
  }
}

// Main execution
async function main() {
  log(`\n${colors.bold}${colors.cyan}╔════════════════════════════════════════════════════════╗${colors.reset}`);
  log(`${colors.bold}${colors.cyan}║  Asper Beauty Shop - Health Check Protocol           ║${colors.reset}`);
  log(`${colors.bold}${colors.cyan}║  "Medical Luxury" 6-Step Production Audit            ║${colors.reset}`);
  log(`${colors.bold}${colors.cyan}╚════════════════════════════════════════════════════════╝${colors.reset}`);
  
  log(`\n${colors.blue}Starting comprehensive health check...${colors.reset}`);
  log(`${colors.blue}Date: ${new Date().toISOString()}${colors.reset}\n`);
  
  try {
    step1_Linting();
    step2_Build();
    step3_TypeChecking();
    step4_Dependencies();
    step5_CriticalFiles();
    step6_VisualIdentity();
    
    // Final summary
    log(`\n${colors.bold}${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    log(`${colors.bold}${colors.blue}Health Check Summary${colors.reset}`);
    log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
    
    log(`Total checks: ${totalChecks}`);
    log(`${colors.green}Passed: ${passedChecks}${colors.reset}`);
    log(`${colors.red}Failed: ${failedChecks.length}${colors.reset}`);
    
    const successRate = Math.round((passedChecks / totalChecks) * 100);
    log(`\nSuccess rate: ${successRate}%`);
    
    if (failedChecks.length > 0) {
      log(`\n${colors.red}${colors.bold}Failed Checks:${colors.reset}`);
      failedChecks.forEach((check, index) => {
        log(`${colors.red}${index + 1}. ${check.message}${colors.reset}`);
        if (check.error) {
          log(`   ${colors.red}${check.error}${colors.reset}`);
        }
      });
    }
    
    log('\n');
    
    if (failedChecks.length === 0) {
      log(`${colors.bold}${colors.green}╔════════════════════════════════════════════════════════╗${colors.reset}`);
      log(`${colors.bold}${colors.green}║  ✓ ALL CHECKS PASSED - READY FOR LIFTOFF! 🚀         ║${colors.reset}`);
      log(`${colors.bold}${colors.green}╚════════════════════════════════════════════════════════╝${colors.reset}\n`);
      process.exit(0);
    } else if (successRate >= 80) {
      log(`${colors.bold}${colors.yellow}╔════════════════════════════════════════════════════════╗${colors.reset}`);
      log(`${colors.bold}${colors.yellow}║  ⚠ MOSTLY READY - Address warnings before launch     ║${colors.reset}`);
      log(`${colors.bold}${colors.yellow}╚════════════════════════════════════════════════════════╝${colors.reset}\n`);
      process.exit(1);
    } else {
      log(`${colors.bold}${colors.red}╔════════════════════════════════════════════════════════╗${colors.reset}`);
      log(`${colors.bold}${colors.red}║  ✗ CRITICAL ISSUES - Fix errors before deployment    ║${colors.reset}`);
      log(`${colors.bold}${colors.red}╚════════════════════════════════════════════════════════╝${colors.reset}\n`);
      process.exit(1);
    }
  } catch (error) {
    log(`\n${colors.red}${colors.bold}Fatal error during health check:${colors.reset}`);
    log(`${colors.red}${error.message}${colors.reset}\n`);
    process.exit(1);
  }
}

main();
