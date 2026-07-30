export default function Loading() {
  return (
    <div className="container route-loading" aria-label="Loading page content">
      <div className="skeleton route-loading-line" style={{ width: '40%', height: 32 }} />
      <div className="skeleton route-loading-line" style={{ width: '70%', height: 20 }} />
      <div className="route-loading-grid">
        <div className="route-loading-card">
          <div className="skeleton route-loading-line" style={{ width: '60%', height: 24 }} />
          <div className="skeleton route-loading-line" style={{ width: '100%', height: 16 }} />
          <div className="skeleton route-loading-line" style={{ width: '80%', height: 16 }} />
        </div>
        <div className="route-loading-card">
          <div className="skeleton route-loading-line" style={{ width: '60%', height: 24 }} />
          <div className="skeleton route-loading-line" style={{ width: '100%', height: 16 }} />
          <div className="skeleton route-loading-line" style={{ width: '80%', height: 16 }} />
        </div>
        <div className="route-loading-card">
          <div className="skeleton route-loading-line" style={{ width: '60%', height: 24 }} />
          <div className="skeleton route-loading-line" style={{ width: '100%', height: 16 }} />
          <div className="skeleton route-loading-line" style={{ width: '80%', height: 16 }} />
        </div>
      </div>
    </div>
  )
}
