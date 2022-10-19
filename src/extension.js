/* global chrome MutationObserver */
const BASE_URL = chrome.runtime.getManifest().env?.BASE_URL ?? ''
const VOD_URL = BASE_URL + 'vod/'

const videoContainer = document.body.querySelector('.video-player__container')
const observer = new MutationObserver((_, instance) => {
  if (document.querySelector('link[rel="canonical"]') == null) return

  replaceVideo()
  instance.disconnect()
})
observer.observe(document, { childList: true, subtree: true })

function replaceVideo () {
  videoContainer.classList.add('sub-only')

  const href = document.head.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? ''
  const vodId = href.match(/videos\/(\d*)/)?.[1]
  const vodUrl = VOD_URL + vodId + '?iframe'

  videoContainer.innerHTML = `<iframe id="tp-vod" src="${vodUrl}"></iframe>`
}
