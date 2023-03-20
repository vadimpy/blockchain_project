import * as React from "react";
import QRCode from "qrcode.react";
import "../styles/main.scss";

const icon = require("../assets/images/InfinityCube.png");

interface IProps {
    url: string
  }
export default function QrCode({url, }:IProps) {
  const qrRef = React.useRef<HTMLDivElement>(null);

  const downloadQRCode = (evt: React.FormEvent) => {
    evt.preventDefault();
    // @ts-ignore
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas!.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const qrCode = (
    <QRCode
      id="qrCodeElToRender"
      size={300}
      value={url}
      bgColor="white"
      fgColor="#141926"
      level="H"
      imageSettings={{
        src: icon,
        excavate: true,
        width: 500 * 0.1,
        height: 350 * 0.1,
      }}
    />
  );

  return (
    <div className="qr-container">
      <div className="qr-container__qr-code" ref={qrRef}>
        {qrCode}
      </div>
    </div>
  );
}