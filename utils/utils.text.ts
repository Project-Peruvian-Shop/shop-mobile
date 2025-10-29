export const truncateText = (text: string, maxWords: number): string => {
  const palabras = text.split(" ");
  return palabras.length > maxWords
    ? palabras.slice(0, maxWords).join(" ") + "..."
    : text;
};
