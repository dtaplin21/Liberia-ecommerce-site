import { Link } from 'react-router-dom'

const faqItems = [
  {
    id: 'what-is-divine-lumina',
    question: 'What is Divine Lumina?',
    answer:
      'Divine Lumina is a natural hair care product created with a focus on healthy hair, simple ingredients, and community impact.',
  },
  {
    id: 'jar-size',
    question: 'What size does Divine Lumina come in?',
    answer:
      'Product size details can vary. Please check the product listing for the most current size information or contact us if you need help before ordering.',
  },
  {
    id: 'shelf-life-storage',
    question: 'How should I store it, and how long does it last?',
    answer:
      'Store the product in a cool, dry place away from direct sunlight. For best results, keep the lid tightly closed after use. If you have questions about shelf life, contact us for the latest guidance.',
  },
  {
    id: 'shipping-time',
    question: 'How long does order fulfillment and shipping take?',
    answer:
      'Processing and shipping times may vary depending on demand and destination. The most accurate shipping details will appear at checkout or can be provided through our contact page.',
  },
  {
    id: 'where-do-you-ship',
    question: 'Where do you ship?',
    answer:
      'Shipping availability depends on your location and current fulfillment options. Please review checkout for destination availability or contact us directly.',
  },
  {
    id: 'payments',
    question: 'Is checkout secure?',
    answer:
      'Yes. Checkout is handled through Stripe for secure payment processing.',
  },
  {
    id: 'community-impact',
    question: 'How does my purchase support the mission?',
    answer:
      "Purchases help support the growth of the processing facility and broader community-centered goals connected to the brand's mission.",
  },
  {
    id: 'nimba-county',
    question: 'What is the connection to Nimba County?',
    answer:
      'Our mission is rooted in community ownership, long-term opportunity, and support connected to Nimba County and the people behind the work.',
  },
]

export default function FAQ() {
  return (
    <section className="faq">
      <div className="faq-container">
        <h1>Frequently Asked Questions</h1>
        <p className="faq-intro">
          Find answers to common questions about Divine Lumina, orders, shipping,
          and our mission.
        </p>

        <div className="faq-list">
          {faqItems.map((item) => (
            <details key={item.id} className="faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>

        <div className="faq-help">
          <p>Still need help?</p>
          <Link to="/contact">Contact us</Link>
        </div>
      </div>
    </section>
  )
}
