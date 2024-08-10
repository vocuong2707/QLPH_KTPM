import React from 'react';
import ReactDOM from 'react-dom/client';
import BaseErrorBoundary from './share/error/BaseErrorBoundary.tsx';
import { Provider } from 'react-redux';
import Loading from './share/loading/Loading.tsx';
import { store } from './app/store.ts';
import App from './App.tsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BaseErrorBoundary>
        <Provider store={store}>
            <React.Suspense fallback={<Loading isShow={true} isLoadingBlock={false} />}>
                <App />
            </React.Suspense>
        </Provider>
    </BaseErrorBoundary>,
);
