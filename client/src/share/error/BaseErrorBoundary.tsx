import React, { ErrorInfo } from 'react';
import Error from './Error';
/**
 * BaseErrorBoundary component
 */
class BaseErrorBoundary extends React.Component<any, any> {
    /**
     * Constructor
     * @param {object} props
     * @return {void}
     */
    constructor(props: any) {
        super(props);
        this.state = {
            error: '',
        };
    }

    /**
     * Get derived state from error
     * @param {object} error
     * @return {object} Data
     */
    static getDerivedStateFromError(error: Error) {
        return { error: error.message };
    }

    /**
     * Lifecycle
     * render when component error
     * @param {object} error
     * @param {object} errorInfo
     * @return {void}
     */
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log(error);
        console.log(errorInfo);
    }

    /**
     * Lifecycle
     * Render jsx to browser
     * @return {jsx}
     */
    render() {
        const { children } = this.props;
        const { error } = this.state;
        if (!error) return children;
        return <Error message={error} />;
    }
}

export default BaseErrorBoundary;
