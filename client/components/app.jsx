// App React component - represents the whole app
App = React.createClass ({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Defines a state
  getInitialState() {
    return {
      hideCompleted: false
    }
  },

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    let query = {};

    // Filters out completed tasks
    if (this.state.hideCompleted) {
      // If hide completed is checked, filter tasks
      query = {checked: {$ne: true}};
    }
    /**
     * Returns tasks sorted, task's count and incomplete count of tasks
     * Also returns the currently logged in user
     */
    return {
      tasks: Tasks.find(query, {sort: {createdAt: -1}}).fetch(),
      tasksCount: Tasks.find().count(),
      incompleteCount: Tasks.find({checked:{$ne: true}}).count(),
      currentUser: Meteor.user()
    };
  },

  // Renders the tasks
  renderTasks() {
    // Gets tasks from this.data.tasks
    return this.data.tasks.map((task) => {
      const currentUserId = this.data.currentUser && this.data.currentUser._id;
      const showPrivateButton = task.owner == currentUserId;
      const showDeleteButton = task.owner == currentUserId;

      return <Task 
        key={task._id}
        task={task}
        showPrivateButton={showPrivateButton}
        showDeleteButton={showDeleteButton} 
      />;
    });
  },
  // Handles form's submit
  handleSubmit(event) {
    event.preventDefault();

    // Finds the text field via the React ref
    var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    // Calls addTack method
    Meteor.call('addTask', text);

    // Clears form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  },
  /**
   * Updates asynchronously the state property of this.state from an event
   * handler by calling this.setState and then cause the component to re-render
   */
  toggleHideCompleted() {
    this.setState ({
      hideCompleted: ! this.state.hideCompleted
    });
  },
  // Handles current user's logout
  handleLogout() {
        Meteor.logout();
  },
  // Renders the whole app
  render() {
    let loginButton;
    let { currentUser } = this.data;

    if (currentUser) {
        loginButton = (
          <a href='/' onClick={this.handleLogout}>Sign out</a>
        )
        currentUsername = (
          <label>{this.data.currentUser.username}</label>
        )
    } else {
        loginButton = (
          <a href='/signin'>Sign in</a>
        )
        currentUsername = (
          <label></label>
        )
    }

    return (
      /** 
       * Returns a div with the class container
       * Has a title with a counter of incomplete tasks and all tasks
       * A checkbox for hide or show completed tasks
       * A account UI for sign in, sign up, sign out
       * A input form to insert a new task but only when there is a logged in 
       * user and finally a list of the tasks
       */
      <div>
        <header>
          <h1>Todo ({this.data.incompleteCount}/{this.data.tasksCount})</h1>

          <label className='hide-completed'>
            <input
              type='checkbox'
              readOnly={true}
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted} />
            Hide Completed Tasks
          </label>
          {currentUsername}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {loginButton}

          { this.data.currentUser ?
            <form className='new-task' onSubmit={this.handleSubmit} >
              <input
                type='text'
                ref='textInput'
                placeholder='Type to add new Tasks' />
            </form> : ''
          }
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});