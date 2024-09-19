// ExportComponent.js
import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ExportComponent = ({ templates, templateRefs }) => {
  const exportToPDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    let totalHeight = 0;

    for (const template of templates) {
      const element = templateRefs.current[template.uniqueId];
      if (element) {
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (totalHeight + imgHeight > pageHeight) {
          pdf.addPage();
          totalHeight = 0;
        }

        pdf.addImage(imgData, 'PNG', 0, totalHeight, imgWidth, imgHeight);
        totalHeight += imgHeight;

        if (totalHeight < pageHeight) {
          pdf.setFontSize(8);
          pdf.text(`Page ${pdf.internal.getNumberOfPages()}`, 10, pageHeight - 10);
        }
      }
    }

    pdf.save('magazine_layout.pdf');
  };

  return (
    <button onClick={exportToPDF}>Export to PDF</button>
  );
};

export default ExportComponent;