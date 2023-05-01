import React, { ReactElement } from "react";

import RenderIcon from "../../../helperComponents/RenderIcon";

import { grey } from "@mui/material/colors";
import { IIconProps, IQrSetting } from "./types";

export function parseIconStyle({ color, enabled, sx }: IIconProps) {
  return { ...sx, color: enabled ? color || 'primary.dark' : grey[600] };
}

export function renderQrIcon(qrType: IQrSetting<any>, iconProps: IIconProps): ReactElement {
  const { id: qrTypeId, renderIcon } = qrType;

  if (renderIcon) return renderIcon(iconProps);

  // Render using legacy qr-icon method
  return <RenderIcon icon={qrTypeId} {...iconProps} />;
}