// Meteor's methods for tasks
Meteor.methods({
  // Adds a task
  addTask(text) {
    // Makes sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    
    // Inserts a task
    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  
  // Removes a task
  removeTask(taskId) {
    const task = Tasks.findOne(taskId);
    if (task.owner !== Meteor.userId()) {
      // Makes sure only the owner can delete his tasks
      throw new Meteor.Error('not-authorized');
    }
    Tasks.remove(taskId);
  },
 
  // Sets a task's checked status
  setChecked(taskId, setChecked) {
    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, makes sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }
    Tasks.update(taskId, { $set: { checked: setChecked} });
  },

  // Sets a task's private status
  setPrivate(taskId, setToPrivate) {
    const task = Tasks.findOne(taskId);

    // Makes sure only the task owner can make a task private
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error("non-authorized");
    }

    // Updates tasks
    Tasks.update(taskId, {$set: {private: setToPrivate} });
  }
});