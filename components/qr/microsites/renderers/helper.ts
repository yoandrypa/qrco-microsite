import {DEFAULT_COLORS, SOCIALS} from "../../constants";
import {handleDesignerString} from "../../../../helpers/qr/helpers";

export function getColors(data: any) {
  return { p: data.primary || DEFAULT_COLORS.p, s: data.secondary || DEFAULT_COLORS.s }
}

export function downloadVCard(data: any) {
  SOCIALS.forEach((x: string) => {
    if (data[x]) {
      delete data[x];
    }
  });

  const contents = handleDesignerString("vcard", data);
  const file = new File([contents], "my vcard.vcf", {
    type: "text/plain"
  });
  const link = document.createElement("a");
  const url = URL.createObjectURL(file);

  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
