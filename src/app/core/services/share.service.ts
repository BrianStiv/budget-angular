import { Injectable } from '@angular/core';
import { Budget } from '../../models/budget.model';

@Injectable({ providedIn: 'root' })
export class ShareService {
  async share(budget: Budget): Promise<void> {
    const servicesText = budget.selectedServices
      .map((s) => {
        const pages = s.subCostValues['pages'];
        const languages = s.subCostValues['languages'];
        return pages ? `${s.name} (${pages} pàgines, ${languages} llenguatges)` : s.name;
      })
      .join(', ');

    const shareText = `Pressupost de ${budget.clientName}\nTotal: ${budget.totalPrice}€\nServeis: ${servicesText}\nData: ${this.formatDate(budget.date)}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: `Pressupost - ${budget.clientName}`, text: shareText });
      } catch {
        /* cancelado */
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Pressupost copiat al porta-retalls!');
      } catch {
        alert("No s'ha pogut copiar el pressupost");
      }
    }
  }

  private formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString('ca-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}
