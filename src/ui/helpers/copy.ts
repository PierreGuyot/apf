export const copyToClipboard = (content: string) => {
  navigator.clipboard.writeText(content);
  window.alert(
    "Le texte a été copié dans votre presse-papier (Ctrl + V pour coller).",
  );
};
