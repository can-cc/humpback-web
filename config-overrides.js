module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.plugins.forEach((plugin) => {
    if (plugin.constructor.name === 'GenerateSW') {
      plugin.config.exclude.push(/^\/oauth2/);
      plugin.config.exclude.push(/^\/login/);
      plugin.config.navigateFallbackBlacklist.push(/^\/oauth2/);
      plugin.config.navigateFallbackBlacklist.push(/^\/login/);
    }
  })
  return config;
}
