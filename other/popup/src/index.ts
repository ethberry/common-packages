import { MouseEvent } from "react";

export function openUrl(url: string): void {
  if (typeof window !== "undefined") {
    const width = 960;
    const height = 480;
    const top = (window.innerHeight - height) / 2;
    const left = (window.innerWidth - width) / 2;

    const popup = window.open(url, "_blank", `height=${height},width=${width},top=${top},left=${left}`);
    if (popup) {
      popup.focus();
    }
  }
}

export function handleLinkOnClick(e: MouseEvent<HTMLAnchorElement>): void {
  e.preventDefault();
  openUrl((e.target as HTMLAnchorElement).href);
}

export function openUrlOnClick(url: string): (e: MouseEvent) => void {
  return (_e: MouseEvent): void => openUrl(url);
}
