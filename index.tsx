import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import App from './App';

// Global error handlers
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'index.tsx:9',message:'Global error caught',data:{message:event.message,filename:event.filename,lineno:event.lineno,colno:event.colno,error:event.error?.stack},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
  });

  window.addEventListener('unhandledrejection', (event) => {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'index.tsx:14',message:'Unhandled promise rejection',data:{reason:event.reason?.toString(),stack:event.reason?.stack},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
  });
}

// #region agent log
fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'index.tsx:18',message:'Entry point executed',data:{hasWindow:typeof window!=='undefined',hasDocument:typeof document!=='undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion

const rootElement = document.getElementById('root');

// #region agent log
fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'index.tsx:11',message:'Root element check',data:{rootElementExists:!!rootElement,rootElementId:rootElement?.id},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion

if (!rootElement) {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'index.tsx:15',message:'ERROR: Root element not found',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  throw new Error("Could not find root element to mount to");
}

// #region agent log
fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'index.tsx:20',message:'Creating React root',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion

const root = ReactDOM.createRoot(rootElement);

// #region agent log
fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'index.tsx:24',message:'Calling root.render',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion

try {
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>
  );
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'index.tsx:33',message:'root.render completed successfully',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
} catch (error) {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/c89f8249-26f2-4e8d-9127-d9ff6be2b775',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'index.tsx:36',message:'ERROR in root.render',data:{errorMessage:error instanceof Error?error.message:String(error),errorStack:error instanceof Error?error.stack:undefined},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  throw error;
}