const fs = require('fs');
const path = require('path');

const DIRECTORIES = ['components/sections', 'components/ui', 'app/wedding', 'config'];

const REPLACEMENTS = [
  // 1. Backgrounds to Transparent (to let canvas show)
  { regex: /bg-\[#0A1128\]/g, replace: 'bg-transparent' },
  { regex: /bg-black\/40/g, replace: 'bg-[#FAF3F0]/60' }, // For Hero right panel and other glassmorphism
  { regex: /bg-black\/60/g, replace: 'bg-white/80' },
  { regex: /bg-black\/80/g, replace: 'bg-white/90' },
  
  // 2. Flip text back to Dark Brown for Terracotta theme
  { regex: /text-gray-100/g, replace: 'text-[#4A3728]' },
  { regex: /text-gray-200/g, replace: 'text-[#4A3728]' },
  { regex: /text-gray-300/g, replace: 'text-[#4A3728]/80' },
  { regex: /text-gray-400/g, replace: 'text-[#4A3728]/60' },
  
  // Flip card backgrounds back to light
  { regex: /bg-gray-800/g, replace: 'bg-[#FDFBF7]' },
  { regex: /border-gray-700/g, replace: 'border-[#4A3728]/10' },
  
  // 3. Champagne Gold -> Terracotta (Text)
  { regex: /#E5D3B3/gi, replace: '#C06C59' },
  
  // 4. Classic Gold -> Blush/Light Terracotta (Borders/SVG)
  { regex: /#D4AF37/gi, replace: '#D48C70' },
];

function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let updated = content;
      
      for (const { regex, replace } of REPLACEMENTS) {
        updated = updated.replace(regex, replace);
      }
      
      if (content !== updated) {
        fs.writeFileSync(fullPath, updated, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

DIRECTORIES.forEach(dir => processDirectory(path.join(__dirname, dir)));
console.log('Theme replacement to Terracotta & Blush complete.');
