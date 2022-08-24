export const handleDesignerString = (selected: string | null | undefined, data: any, value: string | null | undefined) => {
  let designerString = '';
  switch (selected) {
    case 'web': {
      designerString = value || '';
      break;
    }
    case 'text': {
      designerString = value || '';
      break;
    }
    case 'sms': {
      designerString = `SMSTO:${data.number || ''}:${data.message}`;
      break;
    }
    case 'email': {
      const params: { subject?: string; body?: string; } = {};
      if (data.subject) {
        params.subject = data.subject;
      }
      if (data.body) {
        params.body = data.body;
      }
      designerString = `mailto:${data?.email || ''}${Object.keys(params).length ? `?${new URLSearchParams(params).toString()}` : ''}`;
      break;
    }
    case 'wifi': {
      designerString = `WIFI:S:${data.name};P:${data.password || ''}`;
      if (data.encription && data.encription !== 'none') {
        designerString += `;T:${data.encription}`;
      }
      designerString += `;${data.hidden ? 'H:true' : ';'}`;
      designerString += ';'
      break;
    }
    case 'vcard': {
      designerString = 'BEGIN:VCARD\n';
      if (data.prefix || data.lastName || data.firstName) {
        designerString += `N:${data.lastName || ''};${data.prefix ? `${data.prefix};` : ''}${data.firstName || ''};\n`;
      }
      if (data.cell) {
        designerString += `TEL;TYPE=work,VOICE:${data.cell}\n`;
      }
      if (data.phone) {
        designerString += `TEL;TYPE=home,VOICE:${data.phone}\n`;
      }
      if (data.fax) {
        designerString += `TEL;TYPE=fax,VOICE:${data.phone}\n`;
      }
      if (data.organization) {
        designerString += `ORG:${data.organization}\n`;
      }
      if (data.position) {
        designerString += `TITLE:${data.position}\n`;
      }
      if (data.address || data.city || data.zip || data.state || data.country) {
        designerString += `ADR;TYPE=WORK,PREF:;;${data.address || ''};${data.city || ''};${data.state || ''};${data.zip || ''};${data.country || ''}\n`;
      }
      if (data.email) {
        designerString += `EMAIL:${data.email}\n`;
      }
      if (data.web) {
        designerString += `URL:${data.web}\n`;
      }
      designerString += 'VERSION:3.0\nEND:VCARD';
      break;
    }
    case 'twitter': {
      designerString += `https://twitter.com/intent/tweet?text=${encodeURIComponent(data.text)}`;
      designerString += `${data.url ? encodeURIComponent(` ${data.url}`) : ''}`;
      designerString += `${data.hashtags ? encodeURIComponent(` ${data.hashtags.split(',').map((x: string) => `#${x}`).join(' ')}`) : ''}`;
      designerString += `${data.via ? encodeURIComponent(` @${data.via}`) : ''}`;
      break;
    }
    case 'whatsapp': {
      designerString += `https://wa.me/${data.number}`;
      if (data.message) {
        designerString += `?text=${encodeURIComponent(data.message)}`;
      }
      break;
    }
    case 'facebook': {
      designerString += `https://www.facebook.com/sharer.php?u=${encodeURIComponent(data.message)}`;
      break;
    }
  }
  return designerString;
};
