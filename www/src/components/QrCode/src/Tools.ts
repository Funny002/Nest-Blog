import { QRCodeRenderersOptions, toDataURL } from 'qrcode';
import { MergeOptions } from '@utils/object';
import { toImage } from '@utils/file';

type  QrCodeOptionsPosition = ['left' | 'center' | 'right' | number, 'top' | 'center' | 'bottom' | number]
type base64String = string

export interface QrCodeOptions {
  dark: string;
  light: string;
  scale: number;
  margin: number;
  quality: number;
  width: number | undefined;
  level: 'L' | 'M' | 'Q' | 'H';
  // logo
  logo: File | base64String;
  logoOffset: [number, number];
  logoPosition: QrCodeOptionsPosition;
  // background
  offset: [number, number];
  position: QrCodeOptionsPosition;
  background: File | base64String;
}

function handleOptions(options: Partial<QrCodeOptions> = {}): QrCodeOptions {
  return MergeOptions<QrCodeOptions>({
    scale: 4,
    margin: 2,
    level: 'L',
    quality: 1,
    width: undefined,
    dark: '#000000ff',
    light: '#ffffffff',
    //
    logo: '',
    logoOffset: [0, 0],
    logoPosition: ['center', 'center'],
    //
    offset: [0, 0],
    background: '',
    position: ['center', 'center'],
  }, options);
}

function getQrCodeOptions(options: QrCodeOptions): QRCodeRenderersOptions {
  const { scale, margin, width, level, dark, light } = options;
  return { scale, margin, width, errorCorrectionLevel: level, color: { dark, light } };
}

function handlePosition(box: { width: number; height: number }, value: { width: number; height: number }, offset: [number, number], position: QrCodeOptionsPosition): { x: number; y: number; } {
  let x = (box.width - value.width) / 2;
  let y = (box.height - value.height) / 2;
  const [positionX, positionY] = position;
  // x
  if (positionX === 'left') {
    x = 0;
  } else if (positionX === 'right') {
    x = box.width - value.width;
  } else if (typeof positionX == 'number') {
    x = positionX;
  }
  // y
  if (positionY === 'top') {
    y = 0;
  } else if (positionY === 'bottom') {
    y = box.height - value.height;
  } else if (typeof positionY == 'number') {
    y = positionY;
  }
  //offset
  return { x: x + offset[0], y: y + offset[1] };
}

export async function QrCode(value: string, config?: Partial<QrCodeOptions>): Promise<string> {
  const options = handleOptions(config);

  // 生成图片
  const logo = options.logo ? await toImage(options.logo) : undefined;
  const qrcode = await toImage(await toDataURL(value, getQrCodeOptions(options)));
  const background = options.background ? await toImage(options.background) : undefined;
  //
  const width = Math.max(background?.width || 0, qrcode.width);
  const height = Math.max(background?.height || 0, qrcode.height);
  const dom = document.createElement('canvas');
  const cxt = dom.getContext('2d') as CanvasRenderingContext2D;
  dom.width = width;
  dom.height = height;

  // 写入 background
  if (background) {
    const x = (width - background.width) / 2;
    const y = (height - background.height) / 2;
    cxt.drawImage(background, x, y, background.width, background.height);
  }

  // 写入 qrcode
  const qrcodePosition = handlePosition({ width, height }, qrcode, options.offset, options.position);
  cxt.drawImage(qrcode, qrcodePosition.x, qrcodePosition.y, qrcode.width, qrcode.height);

  // 写入 logo
  if (logo) {
    const logoPosition = handlePosition({ width, height }, logo, options.logoOffset, options.logoPosition);
    cxt.drawImage(logo, logoPosition.x, logoPosition.y, logo.width, logo.height);
  }

  // 输出
  return dom.toDataURL('png', options.quality);
}

export default QrCode;
