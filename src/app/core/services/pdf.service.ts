import { Injectable } from '@angular/core';
import { Budget } from '../../models/budget.model';

@Injectable({ providedIn: 'root' })
export class PdfService {
  async generateBudgetPdf(budget: Budget): Promise<void> {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const bottomLimit = pageHeight - 20;
    let y = margin;

    const checkPageBreak = (neededSpace: number) => {
      if (y + neededSpace > bottomLimit) {
        doc.addPage();
        y = margin + 10;
      }
    };

    doc.setFontSize(24);
    doc.setTextColor(37, 99, 235);
    doc.text('PRESUPUESTO DIGITAL', pageWidth / 2, y, { align: 'center' });
    y += 15;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`ID: ${budget.id}`, margin, y);
    doc.text(new Date(budget.date).toLocaleDateString('ca-ES'), pageWidth - margin, y, {
      align: 'right',
    });
    y += 8;
    doc.setDrawColor(200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 15;
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('Datos del Cliente', margin, y);
    y += 8;
    doc.setFontSize(11);
    doc.text(`Nombre: ${budget.clientName}`, margin, y);
    y += 6;
    doc.text(`Email: ${budget.clientEmail}`, margin, y);
    y += 6;
    doc.text(`Teléfono: ${budget.clientPhone}`, margin, y);
    y += 15;
    doc.setFontSize(14);
    doc.text('Servicios Solicitados', margin, y);
    y += 10;

    budget.selectedServices.forEach((service) => {
      checkPageBreak(15);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0);
      doc.text(service.name, margin, y);
      doc.setFont('helvetica', 'normal');
      doc.text(`${service.calculatedPrice}€`, pageWidth - margin, y, { align: 'right' });
      y += 6;
      const pages = service.subCostValues['pages'];
      const languages = service.subCostValues['languages'];
      if (pages) {
        doc.setFontSize(9);
        doc.setTextColor(100);
        doc.text(`  ${pages} páginas, ${languages} idiomas`, margin, y);
        y += 5;
      }
      y += 4;
    });

    checkPageBreak(20);
    y += 5;
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235);
    doc.text('TOTAL:', margin, y);
    doc.text(`${budget.totalPrice}€`, pageWidth - margin, y, { align: 'right' });
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.setFont('helvetica', 'normal');
    doc.text('Generado por Digital Budget Generator', pageWidth / 2, pageHeight - 10, {
      align: 'center',
    });
    doc.save(`presupuesto-${budget.id}.pdf`);
  }
}
