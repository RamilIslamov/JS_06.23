function createDebounceFunction(callback, delay) {
  if (
    typeof callback !== 'function' ||
    typeof delay !== 'number' ||
    !Number.isFinite(delay) ||
    delay <= 0
  ) {
    throw new Error('Invalid argument');
  }

  let timeoutId = null;

  function debouncedFunction() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback();
      timeoutId = null;
    }, delay);
  }

  return debouncedFunction;
}

class RickAndMorty {
  getCharacter(id) {
    return new Promise((resolve, reject) => {
      if (typeof id !== 'number' || !Number.isFinite(id)) {
        reject(new Error('Invalid character id'));
      } else {
        fetch(`https://rickandmortyapi.com/api/character/${id}`)
          .then((response) => {
            if (response.status === 404) {
              resolve(null);
            } else {
              return response.json();
            }
          })
          .then((data) => resolve(data))
          .catch((error) => resolve(null));
      }
    });
  }

  async getEpisode(id) {
    if (typeof id !== 'number' || !Number.isFinite(id)) {
      throw new Error('Invalid episode id');
    }

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode/${id}`
      );
      if (response.status === 404) {
        return null;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  }
}
