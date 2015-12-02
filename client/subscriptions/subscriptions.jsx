// This code is executed on the client only
if (Meteor.isClient) {
  
  // Subscribes to all the data from publication named tasks
  Meteor.subscribe('tasks');
}