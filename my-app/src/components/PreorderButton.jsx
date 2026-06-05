import { Link } from 'react-router-dom'
import { trackPreorderClick } from '../lib/metaPixel'

/**
 * Primary preorder CTA for Meta ads / Fund page.
 * @param {{ to?: string; className?: string; style?: object; children?: React.ReactNode; source: string }}
 */
function PreorderButton({
  to = '/checkout',
  className = 'btn',
  style,
  children = 'Preorder Cocoa Butter',
  source,
}) {
  return (
    <Link
      to={to}
      className={className}
      style={style}
      onClick={() => trackPreorderClick(source)}
    >
      {children}
    </Link>
  )
}

export default PreorderButton
