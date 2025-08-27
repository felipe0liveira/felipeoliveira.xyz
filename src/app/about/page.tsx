import { Metadata } from 'next'
import { Layout, Container } from '@/components/Layout'

export const metadata: Metadata = {
  title: 'About - Felipe Oliveira',
  description: 'Learn more about Felipe Oliveira, Software Engineer',
}

export default function AboutPage() {
  return (
    <Layout>
      <Container>
        <div className="window">
          <div className="title-bar">
            <div className="title-bar-text">About Me</div>
            <div className="title-bar-controls">
              <button aria-label="Minimize"></button>
              <button aria-label="Maximize"></button>
              <button aria-label="Close"></button>
            </div>
          </div>
          <div className="window-body">
            <p style={{ marginBottom: '15px' }}>
              This is the about page. I am Felipe Oliveira, a Software Engineer passionate about creating amazing web experiences.
            </p>
            <p>
              This site showcases my work and projects using a retro Windows 98 theme.
            </p>
            <div className="field-row" style={{ marginTop: '20px' }}>
              <button className="btn">Contact Me</button>
              <button className="btn">View Projects</button>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
