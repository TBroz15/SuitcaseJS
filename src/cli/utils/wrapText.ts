import stripAnsi from "strip-ansi";

const width = process.stdout.columns;

export const wrapText = (
  text: string,
  indentCount: number = 0,
  maxWidth: number = width
) => {
  if (maxWidth >= width) maxWidth = width;

  const lines = text.split("\n");
  const linesOfWords = lines.map((line) => line.split(" "));
  const indent = " ".repeat(indentCount);
  let currentLine = indent;
  let wrappedText = "";

  for (const line of linesOfWords) {
    for (const word of line) {
      if (
        stripAnsi(currentLine).length + stripAnsi(word).length <=
        maxWidth - indentCount
      ) {
        currentLine += word + " ";
        continue;
      }

      wrappedText += currentLine + "\n";
      currentLine = indent + word + " ";
    }

    wrappedText += currentLine + "\n" + indent;
    currentLine = "";
  }

  return wrappedText;
};
