const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID?.trim()

export function isMetaPixelEnabled() {
  return Boolean(PIXEL_ID)
}

let initStarted = false

/** Load Meta Pixel base script once (no-op if VITE_META_PIXEL_ID is unset). */
export function initMetaPixel() {
  if (typeof window === 'undefined' || !isMetaPixelEnabled() || initStarted) {
    return
  }
  initStarted = true

  if (window.fbq) {
    window.fbq('init', PIXEL_ID)
    return
  }

  const n = (window.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
  })
  if (!window._fbq) window._fbq = n
  n.push = n
  n.loaded = true
  n.version = '2.0'
  n.queue = []

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  const first = document.getElementsByTagName('script')[0]
  first.parentNode.insertBefore(script, first)

  window.fbq('init', PIXEL_ID)
}

export function trackMetaPageView() {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'PageView')
  }
}

/**
 * @param {string} event - Meta standard event name (e.g. ViewContent, Purchase)
 * @param {Record<string, unknown>} [params]
 */
export function trackMetaEvent(event, params = {}) {
  if (typeof window.fbq === 'function') {
    window.fbq('track', event, params)
  }
}

/** Preorder / checkout CTA clicks from ads landing pages */
export function trackPreorderClick(source) {
  trackMetaEvent('InitiateCheckout', {
    content_name: 'Divine Lumina Cocoa Butter',
    content_category: 'Cocoa Butter',
    source,
  })
}

export function trackFundPageView() {
  trackMetaEvent('ViewContent', {
    content_name: 'Fund the Factory',
    content_category: 'Preorder',
    content_ids: ['divine-lumina-cocoa-butter'],
  })
}

/**
 * @param {{ value?: number; quantity?: number; currency?: string }} order
 */
export function trackPurchase(order = {}) {
  const value = Number(order.value)
  const quantity = Number(order.quantity) || 1
  trackMetaEvent('Purchase', {
    content_name: 'Divine Lumina Cocoa Butter',
    content_type: 'product',
    currency: order.currency || 'USD',
    value: Number.isFinite(value) && value > 0 ? value : 20 * quantity,
    num_items: quantity,
  })
}
