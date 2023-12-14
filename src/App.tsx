import {LockScreen} from "./components/lock-screen";
import {HorizontalLayout} from "./components/horizontal-layout";
import {lockConfig} from "./config.ts";


const App = () => (
  <div style={{
    minHeight: '100vh',
    minWidth: '100vw',
    background: '#000'
  }}>
    <LockScreen>
      <HorizontalLayout/>
    </LockScreen>
    <iframe
      src={lockConfig.iframeSrc}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        zIndex: 200,
        display: 'block'
      }}
      loading="lazy"
    />
  </div>
)

export default App

