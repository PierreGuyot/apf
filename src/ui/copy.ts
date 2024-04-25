export const copyToClipboard = (content: string) => {
  // TODO: add alert for feedback
  navigator.clipboard.writeText(content);
};
