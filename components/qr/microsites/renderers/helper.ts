import {DEFAULT_COLORS, FONTS, SOCIALS} from "../../constants";
import {handleDesignerString} from "../../../../helpers/qr/helpers";
import {FileType} from "../../types/types";
import {getExtension} from "../../../helpers/generalFunctions";

export function getColors(data: any) {
  return { p: data.primary || DEFAULT_COLORS.p, s: data.secondary || DEFAULT_COLORS.s }
}

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

export function getFont(data: any, property?: string) {
  if (data?.globalFont) { // @ts-ignore
    return FONTS[property || data.globalFont || 'Default'];
  }
  return 'unset';
}
