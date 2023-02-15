import {DataType} from '../../components/qr/types/types';

export const handleDesignerString = (selected: string | null | undefined, data: DataType): string => {
  let designerString = '';
  switch (selected) {
    case 'text':
    case 'web': {
      designerString = data.value || '';
      break;
    }
    case 'sms': {
      designerString = `SMSTO:${data.number || ''}:${data.message}`;
      break;
    }
    case 'email': {
      const params: { subject?: string; body?: string; } = {};
      if (data.subject) { params.subject = data.subject; }
      if (data.body) { params.body = data.body; }
      designerString = `mailto:${data?.email || ''}${Object.keys(params).length ? `?${new URLSearchParams(params).toString()}` : ''}`;
      break;
    }
    case 'wifi': {
      designerString = `WIFI:S:${data.name};P:${data.password || ''}`;
      if (data.encription && data.encription !== 'none') { designerString += `;T:${data.encription}`; }
      designerString += `;${data.hidden ? 'H:true' : ';'}`;
      designerString += ';'
      break;
    }
    case 'vcard':
    case 'vcard+': {
      designerString = 'BEGIN:VCARD\n';
      if (data.prefix || data.lastName || data.firstName) {
        designerString += `N:${data.lastName || ''};${data.prefix ? `${data.prefix};` : ''}${data.firstName || ''};\n`;
      }
      if (data.cell) { designerString += `TEL;TYPE=work,VOICE:${data.cell}\n`; }
      if (data.phone) { designerString += `TEL;TYPE=home,VOICE:${data.phone}\n`; }
      if (data.fax) { designerString += `TEL;TYPE=fax,VOICE:${data.phone}\n`; }
      if (data.organization) { designerString += `ORG:${data.organization}\n`; }
      if (data.position) { designerString += `TITLE:${data.position}\n`; }
      if (data.address || data.address2 || data.city || data.zip || data.state || data.country) {
        designerString += `ADR;TYPE=WORK,PREF:;;${data.address || ''}${data.address2 ? `${data.address ? ', ' : ''}${data.address2}` : ''};${data.city || ''};${data.state || ''};${data.zip || ''};${data.country || ''}\n`;
      }
      if (data.email) { designerString += `EMAIL:${data.email}\n`; }
      if (data.web) { designerString += `URL:${data.web}\n`; }
      designerString += 'VERSION:3.0\nEND:VCARD\n';
      break;
    }
    case 'twitter': {
      designerString += `https://twitter.com/intent/tweet?text=${encodeURIComponent(data.text || '')}`;
      designerString += `${data.url ? encodeURIComponent(` ${data.url}`) : ''}`;
      designerString += `${data.hashtags ? encodeURIComponent(` ${data.hashtags.split(',').map((x: string) => `#${x}`).join(' ')}`) : ''}`;
      designerString += `${data.via ? encodeURIComponent(` @${data.via}`) : ''}`;
      break;
    }
    case 'whatsapp': {
      designerString += `https://wa.me/${data.number}`;
      if (data.message) { designerString += `?text=${encodeURIComponent(data.message)}`; }
      break;
    }
    case 'facebook': {
      designerString += `https://www.facebook.com/sharer.php?u=${encodeURIComponent(data.message || '')}`;
      break;
    }
  }
  return designerString;
};

export function getUuid(): string {
  let dt = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt/16);
    return (c === 'x' ? r :(r&0x3|0x8)).toString(16);
  });
}
