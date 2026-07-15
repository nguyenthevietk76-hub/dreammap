export default function GenericPage({ title, subtitle }) {
  return (
    <main style={{ padding: '8rem 2rem 2rem', minHeight: '100vh', position: 'relative', zIndex: 10 }}>
      <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--color-gold)' }}>{title}</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>{subtitle}</p>
      </div>
    </main>
  );
}
