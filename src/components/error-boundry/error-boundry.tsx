import * as React from 'react';
import Error from "../error";

export default class ErrorBoundry extends React.Component<any> {
    state = {
        error: false
    };

    componentDidCatch(error, errorInfo) {
        this.setState({error: true})
    }

    render() {
        if (this.state.error) {
            return <Error/>
        }
        return this.props.children
    }
}
