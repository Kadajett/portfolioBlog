const Home = require('./handlers/home');
const Post = require('./handlers/post');

exports.register = (plugin, options, next) => {

  plugin.route([
    { method: 'GET', path: '/', config: Home.hello },
    { method: 'GET', path: '/restricted', config: Home.restricted },
    { method: 'GET', path: '/{path*}', config: Home.notFound },
    // Post
    {method: 'GET', path: '/post', config: Post.read},
    {method: 'POST', path: '/post', config: Post.create},
    {method: 'DELETE', path: '/post', config: Post.delete},
  ]);

  next();
};

exports.register.attributes = {
  name: 'api'
};
