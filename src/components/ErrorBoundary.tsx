import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

const isIgnorableError = (message: string) => {
  if (!message) return false;
  const msg = message.toLowerCase();
  return msg.includes('websocket') || 
         msg.includes('vite') || 
         msg.includes('hmr') || 
         msg.includes('extension') ||
         msg.includes('failed to fetch') ||
         msg.includes('connection lost') ||
         msg.includes('transport error') ||
         msg.includes('database is closing') ||
         msg.includes('database is closed') ||
         msg.includes('database is hidden') ||
         msg.includes('closing/hidden') ||
         msg.includes('firestore timeout') ||
         msg.includes('quota exceeded') ||
         msg.includes('permission-denied') ||
         msg.includes('network') ||
         msg.includes('offline') ||
         msg.includes('aborted') ||
         msg.includes('securityerror') ||
         msg.includes('localstorage') ||
         msg.includes('error 0:');
};

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    if (isIgnorableError(error.message)) {
      return { hasError: false };
    }
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public componentDidMount() {
    window.addEventListener('unhandledrejection', this.handlePromiseRejection);
    window.addEventListener('error', this.handleGlobalError);
  }

  public componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.handlePromiseRejection);
    window.removeEventListener('error', this.handleGlobalError);
  }

  private handleGlobalError = (event: ErrorEvent) => {
    if (isIgnorableError(event.message)) {
      event.preventDefault();
      return;
    }
  };

  private handlePromiseRejection = (event: PromiseRejectionEvent) => {
    const reason = event.reason;
    const message = reason?.message || String(reason || '');

    if (isIgnorableError(message)) {
      event.preventDefault();
      return;
    }
    
    console.error('Unhandled Promise Rejection:', reason);
    this.setState({ 
      hasError: true, 
      error: reason instanceof Error ? reason : new Error(String(reason)) 
    });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
            <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-rose-500" />
            </div>
            
            <h1 className="text-2xl font-black text-white mb-2">Oops! System Error</h1>
            <p className="text-slate-400 text-sm mb-8">
              క్షమించండి, యాప్ లోడింగ్ లో ఒక సమస్య తలెత్తింది. ఇది సాధారణంగా టెంపరరీ ఇష్యూ మాత్రమే.
            </p>

            <div className="bg-slate-950 rounded-2xl p-4 mb-8 text-left border border-slate-800">
               <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1">Error Details</div>
               <div className="text-xs text-slate-500 font-mono break-words">
                 {this.state.error?.message || 'Unknown Runtime Error'}
               </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-2 py-3 bg-white text-slate-950 rounded-xl font-bold hover:bg-slate-200 transition"
              >
                <RefreshCw size={18} />
                Reload
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="flex items-center justify-center gap-2 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition"
              >
                <Home size={18} />
                Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
