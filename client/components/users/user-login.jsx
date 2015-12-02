// UserLogin React component - represents the user's login UI
UserLogin = React.createClass({
  getInitialState() {
    return {
        errors: {}
    }
  },
  onSubmit(event) {
    event.preventDefault();

    var username = $(event.target).find('[name=username]').val();
    var password = $(event.target).find('[name=password]').val();

    var errors = {};

    if (!username) {
      errors.username = 'Username required'
    }

    if (!password) {
      errors.password = 'Password required'
    }

    this.setState({
      errors: errors
    });

    if (! _.isEmpty(errors)) {
      return;
    }

    Meteor.loginWithPassword(username, password, (err) => {
      if (err) {
        this.setState({
            errors: {'none': err.reason}
        });

        return;
      }
      else {
        FlowRouter.go('home');
      }
    });
  },
  render() {
    return (
      <div className='sign'>
        <h1>Sign in</h1>
        <form onSubmit={this.onSubmit}>
          <AuthErrors errors={this.state.errors} />
          <FormInput hasError={!!this.state.errors.username} name='Username' type='text' label='Username: ' />
          <FormInput hasError={!!this.state.errors.password} name='Password' type='password' label='Password: ' />
          <input type='submit' /><a href='/signup'>Sign up</a>
        </form>
      </div>
    )
  }
});
