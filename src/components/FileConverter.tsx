'use client';
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
// @ts-ignore
import mammoth from 'mammoth/mammoth.browser';

async function convertToHTML(file: File) {
  const result = await mammoth.convertToHtml({
    arrayBuffer: file.arrayBuffer(),
  });

  var html = result.value; // The generated HTML
  console.log(html);
  return html;
}

const FileConverter = () => {
  const [uploadedFile, setUploadedFile] = useState<File>();
  const [html, setHtml] = useState('');

  console.log(uploadedFile);

  const convert = async () => {
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();

    const element = document.querySelector('#doc-content');
    if (!element || !uploadFile) return;
    doc.setFont('courier', 'normal');
    doc.setTextColor(0.0, 0.0, 0.0, 1.0);
    doc.html(element.innerHTML, {
      callback: function (doc) {
        // Save the PDF
        doc.save(`${uploadedFile?.name.split('.')[0]}.pdf`);
      },
      x: 15,
      y: 15,
      autoPaging: 'text',
      width: 170, //target width in the PDF document
      windowWidth: 650, //window width in CSS pixels
    });
  };

  const uploadFile = async (e) => {
    const file = e.target.files?.[0];
    const html = await convertToHTML(file);
    setHtml(html);
    setUploadedFile(file);
  };

  return (
    <>
      <input type="file" onChange={uploadFile} accept=".doc,.docx" />
      <button onClick={convert} disabled={!uploadedFile}>
        Convert
      </button>

      <div
        id="doc-content"
        className="mt-12 p-8"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
};

export default FileConverter;
