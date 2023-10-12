
type TextEditorProps = {
  text: string;
  onTextChange: (newText: string) => void;
  onFontChange: (font: string) => void;
};

export const TextEditor = ({ text, onTextChange, onFontChange }:TextEditorProps ) => {
  return (
    <div className="text-editor">
      <textarea value={text} onChange={(e) => onTextChange(e.target.value)} />
      <select onChange={(e) => onFontChange(e.target.value)}>
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Times New Roman">Times New Roman</option>
      </select>
    </div>
  );
};
