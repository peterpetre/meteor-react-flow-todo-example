// This code is executed on the server only
if (Meteor.isServer) {
  /**
   * Registers a publication named tasks
   * Only publishes tasks that are public or belong to the current user
   */
  Meteor.publish('tasks', function() {
    return Tasks.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });
}