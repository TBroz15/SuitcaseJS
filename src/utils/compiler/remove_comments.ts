// I have to admit, this function came from Gemini AI lol -TBroz15
export const removeComments = (jsonData: string) => {
  let result = "";
  let inString = false;
  let inSingleLineComment = false;
  let inBlockComment = false;

  for (let i = 0; i < jsonData.length; i++) {
    const char = jsonData[i];

    if (inString) {
      if (char === '"' && jsonData[i - 1] !== "\\") {
        inString = false;
      }
      result += char;
      continue;
    }

    if (inSingleLineComment) {
      if (char === "\n") {
        inSingleLineComment = false;
      }
      continue;
    }

    if (inBlockComment) {
      if (char === "*" && jsonData[i + 1] === "/") {
        inBlockComment = false;
        i++;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      result += char; // Add this line to keep the starting quote
    } else if (char === "/" && jsonData[i + 1] === "/") {
      inSingleLineComment = true;
      i++;
    } else if (char === "/" && jsonData[i + 1] === "*") {
      inBlockComment = true;
      i++;
    } else {
      result += char;
    }
  }

  return result;
};
