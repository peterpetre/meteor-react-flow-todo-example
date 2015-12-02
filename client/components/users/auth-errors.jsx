// AuthErrors React component - represents the authentication errors
AuthErrors = React.createClass({
  propTypes: {
    errors: React.PropTypes.object
  },
  render() {
    if (this.props.errors) {
      return (
        <ul>
          {
            _.values(this.props.errors).map((errorMessage) => {
                return <li key={errorMessage}>{errorMessage}</li>;
            })
          }
        </ul>
      )
    }
  }
});