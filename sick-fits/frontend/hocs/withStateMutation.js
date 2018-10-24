export default ({ name = 'mutate' } = {}) => WrappedComponent => class extends React.Component {
    loadingProperty = `${name}Loading`;
    errorProperty = `${name}Error`;
    resultProperty = `${name}Result`;

    state = { loading: false, error: null, result: null };

    componentDidMount() {
        this.mounted = true;
    };

    componentWillUnmount() {
        this.mounted = false;
    };

    async handleMutation(...options) {
        this.setState({
            loading: true,
            error: null,
            result: null,
        });

        try {
            const result = await this.props[name](...options)

            if (this.mounted) {
                this.setState({
                    loading: false,
                    error: null,
                    result: result,
                });
            }
            return result;
        }
        catch (err) {
            if (this.mounted) {
                this.setState({
                    loading: false,
                    error: err,
                    result: null
                });
            }

            return err;
        }
    }

    render() {
        const props = {
            ...this.props,
            [name]: this.handleMutation.bind(this),
            [this.loadingProperty]: this.state.loading,
            [this.errorProperty]: this.state.error,
            [this.resultProperty]: this.state.result,
        };
        return <WrappedComponent {...props}/>
    }
};
