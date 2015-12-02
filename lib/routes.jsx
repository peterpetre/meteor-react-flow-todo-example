FlowRouter.route('/', {
  name: 'home',
  action: function() {
    ReactLayout.render(MainLayout, {content: <App />});
  }
});

FlowRouter.route('/signin', {
  name: 'signin',
  action: function() {
    ReactLayout.render(MainLayout, {content: <UserLogin />});
  }
});

FlowRouter.route('/signup', {
  name: 'signin',
  action: function() {
    ReactLayout.render(MainLayout, {content: <UserRegister />});
  }
});
