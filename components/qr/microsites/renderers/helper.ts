import {DEFAULT_COLORS, FONTS, SOCIALS} from "../../constants";
import {handleDesignerString} from "../../../../helpers/qr/helpers";
import {FileType} from "../../types/types";
import {getExtension} from "../../../helpers/generalFunctions";
import {alpha} from "@mui/material/styles";

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

  const contents = handleDesignerString("vcard+", data);

  handleDownload(contents, 'text/plain', 'my vcard.vcf', true);
}

export function handleDownloadFiles(data: FileType | string, kind: string) {
  let type: string;
  let content: string;
  if (typeof data === 'string') {
    type = kind;
    content = data;
  } else {
    type = data.type as string;
    content = data.content;
  }
  let extension = getExtension(type);
  if (extension.includes('/')) {
    extension = type.split('/')[1];
  }
  handleDownload(content, type, `my ${kind}.${extension}`);
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
    if (!data?.[item] || data[item] === 'default') {
      size = item === 'titlesFontSize' ? '24px' : (item === 'subtitlesFontSize' ? '22px' : '20px');
    } else if (data[item] === 'small') {
      size = item === 'titlesFontSize' ? '22px' : (item === 'subtitlesFontSize' ? '20px' : '18px');
    } else if (data[item] === 'medium') {
      size = item === 'titlesFontSize' ? '26px' : (item === 'subtitlesFontSize' ? '24px' : '22px');
    } else if (data[item] === 'large') {
      size = item === 'titlesFontSize' ? '30px' : (item === 'subtitlesFontSize' ? '28px' : '24px');
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
      style.fontFamily = data && FONTS[data.titlesFont || data.globalFont] || 'unset';
      break;
    }
    case 's': {
      property = 'subtitlesFontStyle';
      handleSize('subtitlesFontSize'); // @ts-ignore
      style.fontFamily = data && FONTS[data.subtitlesFont || data.globalFont] || 'unset';
      break;
    }
    case 'b': {
      property = 'buttonsFontStyle';
      handleSize('buttonsFontSize'); // @ts-ignore
      style.fontFamily = data && FONTS[data.buttonsFont || data.globalFont] || 'unset';
      break;
    }
    default : {
      property = 'messagesFontStyle';
      handleSize('messagesFontSize'); // @ts-ignore
      style.fontFamily = data && FONTS[data.messagesFont || data.globalFont] || 'unset';
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

export const clearDataStyles = (newData: any) => {
  if (newData.custom !== undefined) {
    const cleared = {...newData};
    delete cleared.custom;
    return cleared;
  }
  return newData;
}

export const handleButtons = (data: any, theme: any, alternate?: boolean) => {
  const style = {} as any;
  if (data?.buttonShape !== undefined && data.buttonShape !== '1') {
    const {buttonShape} = data;
    if (buttonShape !== undefined && buttonShape !== '0') {
      if (buttonShape === '1') {
        style.borderRadius = '15px';
      } else if (buttonShape === '2') {
        style.borderRadius = '50px';
      } else if (buttonShape === '3') {
        style.borderRadius = '50%';
      } else if (buttonShape === '4') {
        let borders = '50px 10px 15px 0';
        if (data.buttonBorders) {
          const bordersTempo = data.buttonBorders.split(' ');
          const tempo = bordersTempo[2];
          bordersTempo[2] = bordersTempo[3];
          bordersTempo[3] = tempo;
          borders = bordersTempo.join(' ');
        }
        style.borderRadius = borders;
      } else if (buttonShape === '5') {
        style.borderRadius = !data?.flipVertical ? (!alternate ? '50px 0' : '0 50px') : (!alternate ? '0 50px' : '50px 0');
      } else if (buttonShape === '6') {
        let radius = !alternate ? '50px 0 0 50px' : '0 50px 50px 0';
        if (data?.flipVertical && !data.flipHorizontal) {
          radius = !alternate ? '50px 50px 0 0' : '0 0 50px 50px';
        } else if (data?.flipHorizontal && !data.flipVertical) {
          radius = !alternate ? '0 50px 50px 0' : '50px 0 0 50px';
        } else if (data?.flipHorizontal && data.flipVertical) {
          radius = !alternate ? '0 0 50px 50px' : '50px 50px 0 0';
        }
        style.borderRadius = radius;
      } else {
        let angle = 4;
        if (data?.flipVertical) { angle *= -1; }
        if (alternate) { angle *= -1; }
        style.transform = `perspective(60px) rotateX(${angle}deg)`;
      }
    }
  } else {
    style.borderRadius = '8px';
  }

  if (data?.buttonBack !== undefined && data.buttonBack !== 'default') {
    if (data.buttonBack === 'solid') {
      style.background = data.buttonBackColor || DEFAULT_COLORS.s;
      style['&:hover'] = {background: data.buttonBackColor || DEFAULT_COLORS.s}
    } else if (data.buttonBack === 'two') {
      const colors = data.buttonBackColor?.includes('|') ? data.buttonBackColor?.split('|') : undefined;
      style.background = colors ? colors[0] : DEFAULT_COLORS.p;
      style['&:hover'] = {background: colors ? colors[1] : DEFAULT_COLORS.s};
    } else if (data.buttonBack === 'gradient') {
      const colors = data.buttonBackColor?.includes('|') ? data.buttonBackColor?.split('|') : undefined;
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
      }
      style.backgroundImage = `linear-gradient(${angle}, ${color1}, ${color2})`;
      style['&:hover'] = {backgroundImage: `linear-gradient(${angle}, ${color2}, ${color1})`};
    }
  } else {
    style.background = theme.palette.secondary.main;
    style['&:hover'] = {background: theme.palette.primary.main};
    if (!data?.buttonsFontStyle?.includes('#')) {
      style['&:hover'].color = theme.palette.secondary.main;
    }
  }
  if (data?.buttonsFontStyle && data.buttonsFontStyle.includes('#')) {
    style.color = `#${data.buttonsFontStyle.split('#')[1]}`;
  } else {
    style.color = theme.palette.primary.main;
  }
  if (data?.buttonsOpacity !== undefined && style.background) {
    style.background = alpha(style.background, data.buttonsOpacity);
    if (style['&:hover'] !== undefined) {
      style['&:hover'].background = alpha(style['&:hover'].background, data.buttonsOpacity);
    }
  }
  if (data?.buttonBorderStyle !== undefined && data.buttonBorderStyle !== 'noBorders') {
    style.border = `${!data?.buttonBorderType ? 'solid' : data.buttonBorderType} ${!data?.buttonBorderWeight || data.buttonBorderWeight === 'thin' ? 1 : (data.buttonBorderWeight === 'normal' ? 5 : 10)}px`;
  }
  if (data?.buttonBorderStyle === 'two') {
    let colors = data.buttonBorderColors as string;
    if (!colors) { colors = `${DEFAULT_COLORS.p}|${DEFAULT_COLORS.s}`; }
    const cols = colors.split('|') as string[];
    style.borderColor = cols[0];
    style['&:hover'] = { borderColor: cols[1] };
  }
  if (data?.buttonShadow) {
    const boxShadow = '4px 4px 4px #00000099';
    style.boxShadow = boxShadow;
    if (style['&:hover']) {
      style['&:hover'].boxShadow = boxShadow;
    } else {
      style['&:hover'] = {boxShadow};
    }
  }
  if (data?.buttonCase) {
    style.textTransform = 'inherit';
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

export const convertBase64 = (file: Blob | File): object => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = error => {
      reject(error);
    };
  });
};

export const getSeparation = (value?: string, sections?: boolean): string => {
  if (!value) {
    return '8px'; // eq to 1
  }

  let separation = '';

  switch (value) {
    case 'narrow': { separation = !sections ? '1' : '-10'; break; }
    case 'medium': { separation = !sections ? '15' : '24'; break; }
    case 'wide': { separation = !sections ? '25' : '35'; break; }
  }

  return `${separation}px`;
}

export interface CustomProps {
  stylesData: any;
  data?: any;
}
