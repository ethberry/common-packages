import { MouseEvent } from "react";

export function openUrl(url: string): Window | null {
  if (typeof window !== "undefined") {
    const width = 960;
    const height = 480;
    const top = (window.innerHeight - height) / 2;
    const left = (window.innerWidth - width) / 2;

    const popup = window.open(url, "_blank", `height=${height},width=${width},top=${top},left=${left}`);
    if (popup) {
      popup.focus();
    }

    return popup;
  }

  return null;
}

export function handleLinkOnClick(e: MouseEvent<HTMLAnchorElement>): Window | null {
  e.preventDefault();
  return openUrl((e.target as HTMLAnchorElement).href);
}

export function openUrlOnClick(url: string): (e: MouseEvent) => Window | null {
  return (_e: MouseEvent): Window | null => openUrl(url);
}
