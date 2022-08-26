// @ts-nocheck

import { forwardRef, useEffect, useCallback, useContext, useMemo, useState } from 'react';

import parse from 'html-react-parser';
import QRCodeStyling from 'qr-code-styling';

import { originalDimensions } from '../../helpers/qr/data';
import { BackgroundType, FramesType, OptionsType } from './types/types';
import QRGeneratorContext from './context/QRGeneratorContext';
import { getFrame } from '../../helpers/qr/helpers';

const handleQrData = (qrObject: OptionsType, overrideValue: string | undefined) => {
  const opts = JSON.parse(JSON.stringify(qrObject));
  if (Boolean(overrideValue)) {
    opts.data = overrideValue;
  }
  opts.qrOptions.typeNumber = opts.data.length > 24 ? 0 : 3;
  return new QRCodeStyling(opts);
};

interface QrGeneratorProps {
  data: OptionsType;
  background?: BackgroundType | null;
  hidden?: boolean | false;
  overrideValue?: string | undefined;
  command: () => void;
  frame: FramesType | null;
};

const QrGenerator = ({ hidden, data, frame, background, command, overrideValue }: QrGeneratorProps, ref: HTMLDivElement) => {
  const [qrCode, setQrCode] = useState<QRCodeStyling>(handleQrData(data, overrideValue));
  const isFramed = useMemo(() => Boolean(frame?.type), [frame?.type]);

  const { cornersData, dotsData } = useContext(QRGeneratorContext);

  const renderFrame = useCallback(() => {
    if (isFramed) {
      return parse(getFrame(frame));
    }
    return null;
  }, [frame]);

  const renderSVG = () => {
    if (qrCode?._svg?.outerHTML) {
      let qrData = qrCode._svg.outerHTML;

      let posXY = 0;
      let sizeWH = originalDimensions;

      if (isFramed) {
        posXY = 10;
        sizeWH = originalDimensions - 20;
      }

      const isFrm6 = Boolean(frame?.type === '/frame/frame6.svg');
      const isFrm7 = Boolean(frame?.type === '/frame/frame7.svg');
      if (isFrm6) {
        sizeWH -= 20;
      } else if (isFrm7) {
        sizeWH -= 45;
      }

      const parsed = { ...parse(qrData) }; // these clones are meant to avoid a "object is not extensible" error
      parsed.props = {
        ...parsed.props,
        x: posXY + (isFrm6 ? 27 : 0) + (isFrm7 ? 37 : 0),
        y: posXY + (frame.textUp && [
          '/frame/frame1.svg', '/frame/frame2.svg', '/frame/frame3.svg', '/frame/frame4.svg'
        ].includes(frame.type) ? 47 : 0) + (isFrm6 ? 72 : 0) + (isFrm7 ? 47 : 0),
        height: sizeWH,
        width: sizeWH,
        viewBox: `0 0 ${originalDimensions} ${originalDimensions}`
      };

      const updtColor = (item: number | string, fillColor: string): void => {
        parsed.props.children[item] = { ...parsed.props.children[item] };
        parsed.props.children[item].props = { ...parsed.props.children[item].props, fill: fillColor };
      };

      if (cornersData) {
        updtColor(3, cornersData.topL);
        updtColor(5, cornersData.topR);
        updtColor(7, cornersData.bottom);
      }

      if (dotsData) {
        updtColor(4, dotsData.topL);
        updtColor(6, dotsData.topR);
        updtColor(8, dotsData.bottom);
      }

      let backSize = sizeWH;
      let imageSize = backSize;
      let imgPosX = posXY;
      let imgPosY = posXY;

      const back = background?.file;
      if (back) {
        if (background.size < 1) {
          backSize = sizeWH * background.size;
          posXY = Math.round((originalDimensions - backSize) / 2);
        } else if (background.size > 1) {
          const dimensions = originalDimensions - (Boolean(frame.type) ? 20 : 0);
          const newSize = Math.round(dimensions / background.size);
          const newPos = Math.round((originalDimensions - newSize) / 2);
          parsed.props.x = newPos;
          parsed.props.y = newPos;
          parsed.props.width = newSize;
          parsed.props.height = newSize;
        }
        imageSize *= background.imgSize;

        const basePos = Math.round((backSize - imageSize) / 2);
        const adjustment = isFramed ? 10 : 0;
        imgPosX = basePos + Math.round(background.x * backSize / 100) + adjustment;
        imgPosY = basePos - Math.round(background.y * backSize / 100) + adjustment;
      }

      command();

      return (
        <svg
          viewBox={`0 0 ${originalDimensions} ${!isFramed || frame.type === '/frame/frame0.svg' ? originalDimensions : '330'}`}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink" ref={ref}>
          {back && background.invert && (
            <filter id="inverse-difference" colorInterpolationFilters="sRGB">
              <feComponentTransfer result="invert">
                <feFuncR type="table" tableValues="1 0" />
                <feFuncG type="table" tableValues="1 0" />
                <feFuncB type="table" tableValues="1 0" />
              </feComponentTransfer>
              <feImage xlinkHref="#background" result="base" x="0" y="0" width={sizeWH} height={sizeWH} />
              <feBlend in="invert" in2="base" mode="difference" />
            </filter>
          )}
          {(!qrCode?._options?.backgroundOptions?.color.startsWith('#ffffff') &&
            ['/frame/frame5.svg', '/frame/frame6.svg', '/frame/frame7.svg'].includes(frame.type)) &&
            (<rect width={280} height={330} x={0} y={0} fill={qrCode._options.backgroundOptions.color} />)
          }
          <g id="background">
            <rect width={backSize}
              height={backSize}
              x={posXY}
              y={posXY}
              fill={background?.backColor || '#ffffff'}
            />
            {back && (
              <image
                xlinkHref={back}
                width={imageSize}
                height={imageSize}
                x={imgPosX}
                y={imgPosY}
                opacity={background.opacity / 100} />
            )}
          </g>
          {!hidden && <g filter={background?.invert ? "url(#inverse-difference)" : undefined}>{parsed}</g>}
          {isFramed && renderFrame()}
        </svg>
      );
    }
    return null;
  };

  useEffect(() => {
    if (qrCode) {
      setQrCode(handleQrData(data, overrideValue));
    }
  }, [data]);

  return (
    <>
      {renderSVG()}
    </>
  );
}

export default forwardRef(QrGenerator);
