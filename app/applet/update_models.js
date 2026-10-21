const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// Replace gemini-3.5-flash-lite and other problematic models in geminiModelsPool or defaults
content = content.replace(/"gemini-3\.5-flash-lite"/g, '"gemini-2.5-flash"');
content = content.replace(/"gemini-3\.5-flash"/g, '"gemini-2.5-flash"');

// Replace the array items in geminiModelsPool
const oldPool = `          const geminiModelsPool = [
            selectedModel,
            'gemini-3.5-flash-lite',
            'gemini-3.6-flash',
            'gemini-3.5-flash',
            'gemini-3.1-pro-preview',
            'gemini-3.1-flash-lite',
            'gemini-3-flash-preview',
            'gemini-1.5-flash',
            'gemini-1.5-pro'
          ];`;

const newPool = `          const geminiModelsPool = [
            selectedModel,
            'gemini-2.5-flash',
            'gemini-1.5-flash',
            'gemini-1.5-pro',
            'gemini-2.5-pro'
          ];`;

content = content.replace(oldPool, newPool);

const oldEnvPool = `        const geminiModelsPool = [
          selectedModel,
          'gemini-3.5-flash-lite',
          'gemini-3.6-flash',
          'gemini-3.5-flash',
          'gemini-3.1-pro-preview',
          'gemini-3.1-flash-lite',
          'gemini-3-flash-preview',
          'gemini-1.5-flash',
          'gemini-1.5-pro'
        ];`;

const newEnvPool = `        const geminiModelsPool = [
          selectedModel,
          'gemini-2.5-flash',
          'gemini-1.5-flash',
          'gemini-1.5-pro',
          'gemini-2.5-pro'
        ];`;

content = content.replace(oldEnvPool, newEnvPool);

fs.writeFileSync('server.ts', content, 'utf8');
console.log('server.ts updated successfully!');
