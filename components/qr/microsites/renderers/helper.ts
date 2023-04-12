import {FONTS, SOCIALS} from "../../constants";
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
 * kind = t: title, s: subtitle, m: message, b: button, T: section Title title, S: section Title subtitle, d: downloadButtons (not affected by size)
 * @param data
 * @param kind
 * @param headline (optional, only for headline)
 */
export function handleFont(data: any, kind: 'T' | 'S' | 't' | 's' | 'm' | 'b' | 'd',
                           headline?: {headlineFont?: string, headlineFontSize?: string, headLineFontStyle?: string}) {
  let property: string;
  let size = '20px';

  const handleSize = (item: string): void => {
    if (kind === 'd') {
      size = '15px';
    } else {
      if (headline?.headlineFontSize === undefined && (!data?.[item] || data[item] === 'default')) {
        switch (item) {
          case 'sectionTitleFontSize': { size = '28px'; break; }
          case 'sectionDescFontSize': { size = '26px'; break; }
          case 'titlesFontSize': { size = '24px'; break; }
          case 'subtitlesFontSize': { size = '22px'; break; }
          default: { size = '20px'; break; }
        }
      } else if (headline?.headlineFontSize === 'small' || data[item] === 'small') {
        switch (item) {
          case 'sectionTitleFontSize': { size = '26px'; break; }
          case 'sectionDescFontSize': { size = '24px'; break; }
          case 'titlesFontSize': { size = '22px'; break; }
          case 'subtitlesFontSize': { size = '20px'; break; }
          default: { size = '18px'; break; }
        }
      } else if (headline?.headlineFontSize === 'medium' || data[item] === 'medium') {
        switch (item) {
          case 'sectionTitleFontSize': { size = '30px'; break; }
          case 'sectionDescFontSize': { size = '28px'; break; }
          case 'titlesFontSize': { size = '26px'; break; }
          case 'subtitlesFontSize': { size = '24px'; break; }
          default: { size = '22px'; break; }
        }
      } else if (headline?.headlineFontSize === 'large' || data[item] === 'large') {
        switch (item) {
          case 'sectionTitleFontSize': { size = '34px'; break; }
          case 'sectionDescFontSize': { size = '32px'; break; }
          case 'titlesFontSize': { size = '30px'; break; }
          case 'subtitlesFontSize': { size = '28px'; break; }
          default: { size = '24px'; break; }
        }
      }
    }
  }

  const style = {} as any;
  if (data?.globalFont) { // @ts-ignore
    style.fontFamily = FONTS[data.globalFont] || 'Default';
  }
  if (data?.globalFontColor) {
    style.color = data.globalFontColor || '#000';
  }

  switch (kind) {
    case 'T': {
      property = 'sectionTitleFontStyle';
      handleSize('sectionTitleFontSize'); // @ts-ignore
      style.fontFamily = data && (FONTS[data.sectionTitleFont || data.globalFont] || 'unset');
      break;
    }
    case 'S': {
      property = 'sectionDescFontStyle';
      handleSize('sectionDescFontSize'); // @ts-ignore
      style.fontFamily = data && (FONTS[data.sectionDescFont || data.globalFont] || 'unset');
      break;
    }
    case 't': {
      property = 'titlesFontStyle';
      handleSize('titlesFontSize'); // @ts-ignore
      style.fontFamily = headline?.headlineFont ? FONTS[headline.headlineFont] : (data && (FONTS[data.titlesFont || data.globalFont] || 'unset'));
      break;
    }
    case 's': {
      property = 'subtitlesFontStyle';
      handleSize('subtitlesFontSize'); // @ts-ignore
      style.fontFamily = data && (FONTS[data.subtitlesFont || data.globalFont] || 'unset');
      break;
    }
    case 'b': {
      property = 'buttonsFontStyle';
      handleSize('buttonsFontSize'); // @ts-ignore
      style.fontFamily = data && (FONTS[data.buttonsFont || data.globalFont] || 'unset');
      break;
    }
    default : {
      property = 'messagesFontStyle';
      handleSize('messagesFontSize'); // @ts-ignore
      style.fontFamily = data && (FONTS[data.messagesFont || data.globalFont] || 'unset');
      break;
    }
  }

  const textStyle = headline?.headLineFontStyle || data?.[property];

  if (textStyle !== undefined) {
    if (textStyle.includes('#') && (property !== 'buttonsFontStyle' || !textStyle.endsWith('#-1'))) {
      style.color = `#${textStyle.split('#')[1]}`;
    }
    if (textStyle.includes('b')) {
      style.fontWeight = 'bold';
    }
    if (textStyle.includes('i')) {
      style.fontStyle = 'italic';
    }
    if (textStyle.includes('u')) {
      style.textDecoration = 'underline';
    }
  } else if (['t', 's'].includes(kind) && !headline) {
    style.fontWeight = 'bold';
  }

  // @ts-ignore
  return {...style, fontSize: size};
}

export const onlyNumeric = (value: string) => value.replace(/[^0-9.]/g, '');

export const clearDataStyles = (newData: any) => {
  if (newData.custom !== undefined) {
    const cleared = {...newData};
    delete cleared.custom;
    return cleared;
  }
  return newData;
}

const getBorder = (data: any) => !data?.buttonBorderWeight || data.buttonBorderWeight === 'thin' ? 1 : (data.buttonBorderWeight === 'normal' ? 5 : 10);
const buttonBackHandler = (data: any, theme: any) => {
  const style = {} as any;
  if (data?.buttonBack !== undefined && data.buttonBack !== 'default') {
    if (data.buttonBack === 'solid') {
      style.background = data.buttonBackColor || theme.palette.secondary.main;
      style['&:hover'] = {background: data.buttonBackColor || theme.palette.selected.main}
    } else if (data.buttonBack === 'two') {
      const colors = data.buttonBackColor?.includes('|') ? data.buttonBackColor?.split('|') : undefined;
      style.background = colors ? colors[0] : theme.palette.primary.main;
      style['&:hover'] = {background: colors ? colors[1] : theme.palette.secondary.main};
    } else if (data.buttonBack === 'gradient') {
      const colors = data.buttonBackColor?.includes('|') ? data.buttonBackColor?.split('|') : undefined;
      let angle = '180deg';
      let color1 = theme.palette.primary.main;
      let color2 = theme.palette.secondary.main;
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
  return style;
};

const getBtnTextColor = (data: any, theme: any) => {
  if (data?.buttonsFontStyle && data.buttonsFontStyle.includes('#')) {
    return `#${data.buttonsFontStyle.split('#')[1]}`;
  }
  return theme.palette.primary.main;
}

export const handleButtons = (data: any, theme: any, alternate?: boolean) => {
  let style = {} as any;
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

  style.color = getBtnTextColor(data, theme);

  if (!data?.buttonShadowDisplacement) {
    const backStyle = buttonBackHandler(data, theme);
    style = {...style, ...backStyle};
    if (data?.buttonsOpacity !== undefined && style.background) {
      style.background = alpha(style.background, data.buttonsOpacity);
      if (style['&:hover'] !== undefined) {
        style['&:hover'].background = alpha(style['&:hover'].background, data.buttonsOpacity);
      }
    }
  } else {
    const backStyle = buttonBackHandler(data, theme);
    const borderWidth = getBorder(data);

    style.background = '#ffffff00';
    style.position = 'relative';
    style.zIndex = undefined;
    style.m = `${borderWidth + 7}px`;
    style.width = `calc(100% - ${style.m})`;

    const handleCorrection = (): string => {
      let value = 7;
      if (borderWidth === 5) {
        value = 8;
      } else if (borderWidth === 10) {
        value = 9;
      }
      return `${value}px`;
    }

    let top = handleCorrection();
    let left = handleCorrection();

    switch (data.buttonShadowDisplacement) {
      case 'upLeft': {
        top = `-${handleCorrection()}`;
        left = `-${handleCorrection()}`;
        break;
      }
      case 'upRight': {
        top = `-${handleCorrection()}`;
        left = handleCorrection();
        break;
      }
      case 'downLeft': {
        top = handleCorrection();
        left = `-${handleCorrection()}`;
      }
    }

    const after = {
      background: backStyle.background,
      backgroundImage: backStyle.backgroundImage,
      content: '""',
      position: 'absolute',
      top,
      left,
      width: `calc(100% + ${borderWidth}px)`,
      height: `calc(100% + ${borderWidth}px)`,
      borderRadius: 'inherit',
      zIndex: -1,
      boxSizing: 'border-box'
    };

    style['&:after'] = {...after};
    style['&:hover'] = {
      color: backStyle['&:hover']?.color,
      background: style.background, // same as the button, an empty background
      '&:after': {...after, background: backStyle['&:hover']?.background, backgroundImage: backStyle['&:hover']?.backgroundImage }
    }
  }

  if (data?.buttonBorderStyle !== undefined && data.buttonBorderStyle !== 'noBorders') {
    style.border = `${!data?.buttonBorderType ? 'solid' : data.buttonBorderType} ${getBorder(data)}px`;
  }
  if (data?.buttonBorderStyle === 'two') {
    let colors = data.buttonBorderColors as string;
    if (!colors) { colors = `${theme.palette.primary.main}|${theme.palette.secondary.main}`; }
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

  style['&.Mui-disabled'] = {
    bgcolor: 'text.disabled',
    color: style.color,
    cursor: 'not-allowed'
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

export const empty = (item: string, newData?: any) => newData?.[item] === undefined || !newData[item].trim().length;

const isObject = (item: any) => item !== null && typeof item === 'object';

export function areEquals(object1: any, object2: any) {
  if ((!Boolean(object1) && Boolean(object2)) || (Boolean(object1) && !Boolean(object2))) {
    return false;
  }
  if (!Boolean(object1) && !Boolean(object2)) {
    return true;
  }
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (areObjects && !areEquals(val1, val2) || !areObjects && val1 !== val2) {
      return false;
    }
  }
  return true;
}

export const getSeparation = (value?: string, sections?: boolean): string => {
  if (!value) {
    return '8px'; // eq to 1
  }

  let separation = '';

  switch (value) {
    case 'narrow': { separation = !sections ? '1' : '-10'; break; }
    case 'medium': { separation = !sections ? '15' : '25'; break; }
    case 'wide': { separation = !sections ? '25' : '35'; break; }
  }

  return `${separation}px`;
}

export interface CustomProps {
  stylesData: any; data?: any;
}

export interface DimsProps {
  parentWidth: string; parentHeight: string;
}

export interface CustomType {
  component: string;
  name?: string;
  data?: any;
  expand: string;
}
