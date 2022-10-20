/* global MutationObserver */
const BASE_URL = ''
const VOD_URL = BASE_URL + 'vod/'

let videoContainer = null

// wait for video
observe('.video-player__container', (el) => {
  if (el != null) videoContainer = el
  // wait for overlay
  observe('.player-overlay-background', (el) => {
    if (videoContainer == null) return

    const subOnly = el.firstElementChild?.classList.contains('content-overlay-gate__content')
    videoContainer.setAttribute('sub-only', subOnly)
    if (subOnly) replaceVideo()
  }, el, true)
}, document, true)

function replaceVideo () {
  // wait for id
  observe('[data-a-target="video-shelf-expand-link-all"]', (el) => {
    const href = el.getAttribute('href') ?? ''
    const vodId = href.match(/video\/(\d*)/)?.[1]
    const vodUrl = VOD_URL + vodId + '?iframe'

    const iframe = findOrCreateVOD()
    iframe.src = vodUrl
  }, document.body)
}

function findOrCreateVOD () {
  let container = document.getElementById('tp-vod')
  if (container != null) return container.firstElementChild.firstElementChild

  container = document.createElement('div')
  container.id = 'tp-vod'
  const vod = document.createElement('div')
  vod.classList.add('tp-container')
  const iframe = document.createElement('iframe')
  vod.append(iframe)
  container.append(vod)
  videoContainer.append(container)
  return iframe
}

function observe (selector, callback, root = document, keep = false) {
  const observer = new MutationObserver((_, instance) => {
    const el = root.querySelector(selector)
    if (el == null) return
    callback(el)
    if (!keep) instance.disconnect()
  })
  observer.observe(root, { childList: true, subtree: true })
}
