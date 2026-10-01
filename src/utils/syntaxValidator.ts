export function validateSyntax(code: string): { hasError: boolean, errorMsg: string | null, line: number | null } {
  // Simple heuristic checks for unmatched brackets, braces, parentheses, and backticks.
  const stack: { char: string, line: number }[] = [];
  let inString: string | null = null;
  let inComment = false;
  let inMultilineComment = false;
  
  const lines = code.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let j = 0;
    while (j < line.length) {
      const char = line[j];
      const nextChar = line[j+1];

      // Handle comments
      if (!inString && !inMultilineComment && char === '/' && nextChar === '/') {
        break; // rest of line is comment
      }
      if (!inString && !inMultilineComment && char === '/' && nextChar === '*') {
        inMultilineComment = true;
        j += 2;
        continue;
      }
      if (inMultilineComment && char === '*' && nextChar === '/') {
        inMultilineComment = false;
        j += 2;
        continue;
      }
      if (inMultilineComment) {
        j++;
        continue;
      }

      // Handle strings
      if (char === '"' || char === "'" || char === '`') {
        if (!inString) {
          inString = char;
        } else if (inString === char && line[j-1] !== '\\') {
          inString = null;
        }
        j++;
        continue;
      }

      if (inString) {
        j++;
        continue;
      }

      // Handle brackets
      if (char === '{' || char === '[' || char === '(') {
        stack.push({ char, line: i + 1 });
      } else if (char === '}' || char === ']' || char === ')') {
        if (stack.length === 0) {
          return { hasError: true, errorMsg: `Unexpected closing bracket '${char}'`, line: i + 1 };
        }
        const last = stack.pop();
        if (!last) continue;
        if (
          (char === '}' && last.char !== '{') ||
          (char === ']' && last.char !== '[') ||
          (char === ')' && last.char !== '(')
        ) {
          return { hasError: true, errorMsg: `Mismatched closing bracket '${char}'. Expected closing for '${last.char}'`, line: i + 1 };
        }
      }
      j++;
    }
  }

  if (inString === '`') {
    return { hasError: true, errorMsg: `Unclosed template literal (backtick)`, line: lines.length };
  }

  if (stack.length > 0) {
    const unclosed = stack.pop();
    return { hasError: true, errorMsg: `Unclosed bracket '${unclosed?.char}'`, line: unclosed?.line || lines.length };
  }

  return { hasError: false, errorMsg: null, line: null };
}
