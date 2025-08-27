import { Layout, Container } from '@/components/Layout'

export default function TestPage() {
  return (
    <Layout>
      <Container>
        <div className="window" style={{ width: '300px' }}>
          <div className="title-bar">
            <div className="title-bar-text">Test Window</div>
            <div className="title-bar-controls">
              <button aria-label="Close"></button>
            </div>
          </div>
          <div className="window-body">
            <h1>Test Page</h1>
            <p>Este é um teste para ver se o 98.css está funcionando</p>
            <button className="btn">Botão Windows 98</button>
            <div className="field-row">
              <label htmlFor="text">Nome:</label>
              <input id="text" type="text" />
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
