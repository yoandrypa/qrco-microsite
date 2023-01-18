import {DEFAULT_COLORS, FONTS, SOCIALS} from "../../constants";
import {handleDesignerString} from "../../../../helpers/qr/helpers";
import {FileType} from "../../types/types";
import {getExtension} from "../../../helpers/generalFunctions";

function handleDownload(contents: string, type: string, name: string, useFile?: boolean) {
  let url = contents;
  const link = document.createElement("a");

  if (useFile) {
    const file = new File([contents], name, {type});
    url = URL.createObjectURL(file);
    link.download = file.name;
  } else {
    link.download = name;
  }

  link.href = url;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

export function downloadVCard(data: any) {
  SOCIALS.forEach((x: string) => {
    if (data[x]) {
      delete data[x];
    }
  });

  const contents = handleDesignerString("petId", data);

  handleDownload(contents, 'text/plain', 'my vcard.vcf', true);
}

export function handleDownloadFiles(data: FileType, kind: string) {
  const type = data.type as string;
  let extension = getExtension(type);
  if (extension.includes('/')) {
    extension = type.split('/')[1];
  }
  handleDownload(data.content, type, `my ${kind}.${extension}`);
}

/**
 * kind = t: title, s: subtitle, m: message, b: button
 * @param data
 * @param kind
 */
export function handleFont(data: any, kind: 't' | 's' | 'm' | 'b') {
  let property: string;
  let size = '20px';

  const handleSize = (item: string): void => {
    if (!data[item] || data[item] === 'default') {
      size = item === 'titlesFontSize' ? '22px' : (item === 'subtitlesFontSize' ? '24px' : '20px');
    } else if (data[item] === 'small') {
      size = item === 'titlesFontSize' ? '20px' : (item === 'subtitlesFontSize' ? '22px' : '18px');
    } else if (data[item] === 'medium') {
      size = item === 'titlesFontSize' ? '24px' : (item === 'subtitlesFontSize' ? '25px' : '22px');
    } else if (data[item] === 'large') {
      size = item === 'titlesFontSize' ? '28px' : (item === 'subtitlesFontSize' ? '30px' : '24px');
    }
  }

  const style = {};
  if (data?.globalFont) { // @ts-ignore
    style.fontFamily = FONTS[data.globalFont] || 'Default';
  }
  if (data?.globalFontColor) { // @ts-ignore
    style.color = data.globalFontColor || '#000';
  }

  switch (kind) {
    case 't': {
      property = 'titlesFontStyle';
      handleSize('titlesFontSize'); // @ts-ignore
      style.fontFamily = FONTS[data.titlesFont || data.globalFont] || 'unset';
      break;
    }
    case 's': {
      property = 'subtitlesFontStyle';
      handleSize('subtitlesFontSize'); // @ts-ignore
      style.fontFamily = FONTS[data.subtitlesFont || data.globalFont] || 'unset';
      break;
    }
    case 'b': {
      property = 'buttonsFontStyle';
      handleSize('buttonsFontSize'); // @ts-ignore
      style.fontFamily = FONTS[data.buttonsFont || data.globalFont] || 'unset';
      break;
    }
    default : {
      property = 'messagesFontStyle';
      handleSize('messagesFontSize'); // @ts-ignore
      style.fontFamily = FONTS[data.messagesFont || data.globalFont] || 'unset';
      break;
    }
  }

  if (data?.[property] !== undefined) {
    if (data[property].includes('#') && (property !== 'buttonsFontStyle' || !data[property].endsWith('#-1'))) { // @ts-ignore
      style.color = `#${data[property].split('#')[1]}`;
    }
    if (data[property].includes('b')) { // @ts-ignore
      style.fontWeight = 'bold';
    }
    if (data[property].includes('i')) { // @ts-ignore
      style.fontStyle = 'italic';
    }
    if (data[property].includes('u')) { // @ts-ignore
      style.textDecoration = 'underline';
    }
  } else if (['t', 's'].includes(kind)) { // @ts-ignore
    style.fontWeight = 'bold';
  }

  // @ts-ignore
  return {...style, fontSize: size, };
}

export const handleButtons = (data: any, theme: any) => {
  const style = {};
  if (data?.buttonShape !== undefined && data.buttonShape !== '1') { // @ts-ignore
    style.borderRadius = data.buttonShape === '0' ? 0 : data.buttonShape === '2' ? '50px' : (data.buttonBorders || '25px 10px 15px 0');
  }
  if (data?.buttonBack !== undefined && data.buttonBack !== 'default') {
    if (data.buttonBack === 'solid') { // @ts-ignore
      style.background = data.buttonBackColor || DEFAULT_COLORS.s; // @ts-ignore
      style['&:hover'] = {background: data.buttonBackColor || DEFAULT_COLORS.s}
    } else if (data.buttonBack === 'two') {
      const colors = data.buttonBackColor?.includes('|') ? data.buttonBackColor?.split('|') : undefined; // @ts-ignore
      style.background = colors ? colors[0] : DEFAULT_COLORS.p; // @ts-ignore
      style['&:hover'] = {background: colors ? colors[1] : DEFAULT_COLORS.s};
    } else if (data.buttonBack === 'gradient') {
      const colors = data.buttonBackColor?.includes('|') ? data.buttonBackColor?.split('|') : undefined; // @ts-ignore
      let angle = '180deg';
      let color1 = DEFAULT_COLORS.p;
      let color2 = DEFAULT_COLORS.s;
      if (colors) {
        color1 = colors[0];
        if (colors[1].includes('@')) {
          const x = colors[1].split('@');
          color2 = x[0];
          angle = x[1];
        } else {
          color2 = colors[1];
        }
      } // @ts-ignore
      style.backgroundImage = `linear-gradient(${angle}, ${color1}, ${color2})`; // @ts-ignore
      style['&:hover'] = {backgroundImage: `linear-gradient(${angle}, ${color2}, ${color1})`};
    }
  } else { // @ts-ignore
    style.color = theme.palette.primary.main; // @ts-ignore
    style.background = theme.palette.secondary.main; // @ts-ignore
    style['&:hover'] = {color: theme.palette.secondary.main, background: theme.palette.primary.main};
  }
  return style;
}

export const getBase64FromUrl = async (url: string) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      setTimeout(() => {
        resolve(base64data);
      }, 100);
    }
  });
};
