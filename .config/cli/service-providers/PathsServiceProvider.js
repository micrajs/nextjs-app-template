const { join } = require('path');
const { ServiceProvider } = require('@micra/service-provider');

class PathsServiceProvider extends ServiceProvider {
  register() {
    const pathConfig = config('paths');
    this.container.value(
      'paths/helpers',
      Object.keys(pathConfig).reduce((paths, name) => {
        paths[name] = (...pieces) => join(pathConfig[name], ...pieces);
        return paths;
      }, {}),
    );
  }
}

module.exports = PathsServiceProvider;
