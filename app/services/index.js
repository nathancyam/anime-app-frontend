import { factory } from './AnimeCollectionService';

class ServiceLocator {
  constructor() {
    this.registry = {
      'AnimeCollection': factory
    };
  }

  make(alias) {
    if (!this.registry[alias]) {
      throw new Error('Service not registered')
    }

    const factory = this.registry[alias];
    if (typeof factory !== 'function') {
      throw new Error(`Service ${alias} is not a function`);
    }

    return factory();
  }
}

export default new ServiceLocator();
