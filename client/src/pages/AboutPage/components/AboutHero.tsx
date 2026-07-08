import type { FC } from 'react'
import styles from './AboutHero.module.css'

const PARAGRAPHS = [
  'Bowling Planet is India’s leading Family Entertainment Center consulting and turnkey solutions company. We help malls, hotels, resorts, developers and investors plan, build and operate world-class entertainment destinations.',
  'Our practice combines hands-on project execution with advisory depth — from attraction mix and layout planning to supply, installation, training and long-term operational support.',
  'We work as a long-term partner, not a catalogue vendor, so every programme is sized to catchment, capital discipline and guest experience from day one.',
]

const AboutHero: FC = () => (
  <section className={styles.hero} aria-labelledby="about-hero-title">
    <div className={styles.inner}>
      <span className={styles.eyebrow}>About us</span>
      <h1 id="about-hero-title" className={styles.title}>
        <span>We are</span>
        Bowling Planet
      </h1>
      {PARAGRAPHS.map((text) => (
        <p key={text.slice(0, 32)} className={styles.copy}>
          {text}
        </p>
      ))}
    </div>
  </section>
)

export default AboutHero
