// Task React component - represents a single todo item
Task = React.createClass ({
  propTypes: {
    /**
     * This component gets the task to display through a React prop
     * We can use propTypes to indicate it is required
     */
    task: React.PropTypes.object.isRequired,
    showPrivateButton: React.PropTypes.bool.isRequired,
    showDeleteButton: React.PropTypes.bool.isRequired
  },

  toggleChecked() {
    /**
     * Calls setChecked method 
     * Sets the checked property to the opposite of its current value
     */
    Meteor.call('setChecked', this.props.task._id, ! this.props.task.checked);
  },

  deleteThisTask() {
    // Calls removeTask method
    Meteor.call('removeTask', this.props.task._id);
  },

  togglePrivate() {
    // Calls setPrivate method
    Meteor.call('setPrivate', this.props.task._id, ! this.props.task.private);
  },

  // Renders a single todo item
  render() {
    /**
     * Gives tasks a different className when they are checked off,
     * so that we can style them nicely in CSS
     * Adds "checked and/or private to the className when needed
     */
    const taskClassName = (this.props.task.checked ? 'checked' : '') + ' ' +
      (this.props.task.private ? 'private' : '');

    return (
      /**
       * Returns a li with the class checked only if the task is checked.
       * Has a delete button which deletes a task, only owner can delete his
       * tasks
       * Has a checkbox to check a task as completed or to uncheck
       * The username of task's owner
       * Task's text and private/public option
       */
      <li className={taskClassName}>
        { this.props.showDeleteButton ? (
        <button className='delete' onClick={this.deleteThisTask}>
          &times;
        </button>
        ) : ''}

        <input
          type='checkbox'
          readOnly={true}
          checked={this.props.task.checked}
          onClick={this.toggleChecked}
        />

        { this.props.showPrivateButton ? (
          <button className='toggle-private' onClick={this.togglePrivate}>
            { this.props.task.private ? 'Private' : 'Public' }
          </button>
        ) : ''}

        <span className='text'>
          <strong>{this.props.task.username}</strong>: {this.props.task.text}
        </span>
      </li>
    );
  }
});