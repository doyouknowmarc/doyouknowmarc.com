"use strict";
const videoUrl = window.MARC_SITE?.introVideoUrl?.trim();
if (videoUrl) {
  try {
    const url = new URL(videoUrl);
    if (url.protocol === "https:") {
      document.getElementById("intro-video-link").href = url.href;
      document.getElementById("introduction").hidden = false;
    }
  } catch { /* Keep the optional section hidden if the URL is incomplete. */ }
}
