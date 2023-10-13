import React from "react";

type LinksListProps = {
  uri: string;
  onUriChange: (uri: string) => void;
  onClearUri: () => void;
};

const LinksList = ({ uri, onUriChange, onClearUri }:LinksListProps) => {
  return (
    <div className="link-input">
      下記のリンクをここに入力ください。
      <input type="text" onChange={(e) => onUriChange(e.target.value)} value={uri} />
      <br />
      <input type="submit" value="Clear" onClick={onClearUri} />
      <br />
      demo link:
      <p>
        PowerPoint file:<br />
        https://sample-videos.com/ppt/Sample-PPT-File-500kb.ppt
      </p>
      <br />
      <p>
        MSWord file:<br />
        https://calibre-ebook.com/downloads/demos/demo.docx
      </p>
      <br />
      <p>
        MSExcel file:<br />
        https://sample-videos.com/xls/Sample-Spreadsheet-10-rows.xls
      </p>
      <br />
    </div>
  );
};

export default LinksList;
