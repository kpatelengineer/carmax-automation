/**
 * Script to clean up previous test reports when a new test run is triggered
 */
const fs = require('fs');
const path = require('path');

const directories = [
  path.join(__dirname, '../../allure-results'),
  path.join(__dirname, '../../allure-report'),
  path.join(__dirname, '../../test-results')
];

// Function to delete all files and subdirectories from a directory
function cleanDirectory(directory) {
  if (!fs.existsSync(directory)) {
    console.log(`Creating directory: ${directory}`);
    fs.mkdirSync(directory, { recursive: true });
    return;
  }

  console.log(`Cleaning directory: ${directory}`);
  
  const items = fs.readdirSync(directory);
  
  for (const item of items) {
    const itemPath = path.join(directory, item);
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory()) {
      cleanDirectory(itemPath);
      fs.rmdirSync(itemPath);
    } else {
      fs.unlinkSync(itemPath);
    }
  }
}

// Clean up each directory
directories.forEach(directory => {
  try {
    cleanDirectory(directory);
    console.log(`Successfully cleaned ${directory}`);
  } catch (error) {
    console.error(`Error cleaning ${directory}:`, error);
  }
});

console.log('Report cleanup completed.');