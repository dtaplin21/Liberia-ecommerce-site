import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initMetaPixel, trackMetaPageView } from '../lib/metaPixel'

/** Loads Meta Pixel and fires PageView on SPA route changes. */
function MetaPixel() {
  const location = useLocation()

  useEffect(() => {
    initMetaPixel()
  }, [])

  useEffect(() => {
    trackMetaPageView()
  }, [location.pathname, location.search])

  return null
}

export default MetaPixel
