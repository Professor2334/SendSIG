const fs = require('fs');

const data = JSON.parse(fs.readFileSync('design-tokens.tokens.json', 'utf8'));

let cssVariables = [];

function formatVarName(path) {
    return `--sys-${path.replace(/[^a-zA-Z0-9-]/g, '-').replace(/-+/g, '-').toLowerCase()}`;
}

function processValue(val) {
    if (typeof val === 'string' && val.startsWith('{') && val.endsWith('}')) {
        const alias = val.slice(1, -1);
        return `var(${formatVarName(alias)})`;
    }
    return val;
}

function parseTokens(obj, currentPath = []) {
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
        if ('value' in obj) {
            // It's a token
            const val = obj.value;
            const type = obj.type;

            if (typeof val === 'object' && val !== null) {
                // E.g., typography or fontStyle
                for (const [k, v] of Object.entries(val)) {
                    const newPath = [...currentPath, k];
                    let finalVal = processValue(v);

                    const kLower = k.toLowerCase();
                    if (typeof finalVal === 'number' && !kLower.includes('weight') && !kLower.includes('stretch')) {
                        if (kLower.includes('size') || kLower.includes('spacing') || kLower.includes('indent') || kLower.includes('height')) {
                            finalVal = finalVal + 'px';
                        }
                    } else if (kLower.includes('height') && typeof finalVal === 'number') {
                        finalVal = finalVal + 'px';
                    }

                    cssVariables.push(`  ${formatVarName(newPath.join('-'))}: ${finalVal};`);
                }
            } else {
                let finalVal = processValue(val);
                const pathLower = currentPath.join('-').toLowerCase();

                if (typeof finalVal === 'number') {
                    // Check if it's a weight string
                    if (!pathLower.includes('weight') && !pathLower.includes('opacity') && !pathLower.includes('stretch')) {
                        // Dimension or numbers usually px in styles unless weight/opacity
                        if (type === 'dimension' || pathLower.includes('size') || pathLower.includes('spacing') || pathLower.includes('radius') || pathLower.includes('height')) {
                            finalVal = finalVal + 'px';
                        }
                    }
                }
                cssVariables.push(`  ${formatVarName(currentPath.join('-'))}: ${finalVal};`);
            }
        } else {
            // It's a group
            for (const [key, value] of Object.entries(obj)) {
                parseTokens(value, [...currentPath, key]);
            }
        }
    }
}

parseTokens(data);

const cssContent = `:root {\n${cssVariables.join('\n')}\n}\n`;
fs.writeFileSync('variables.css', cssContent);
console.log('Successfully generated ' + cssVariables.length + ' variables to variables.css');
