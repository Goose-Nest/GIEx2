const log = (...args) => console.log(`[GIEx2]`, ...args);

log('injected!');

(async () => {
  while (!require.cache.electron?.exports?.net?.request) { // Wait for Electron to be loaded into require cache
    await new Promise((res) => setTimeout(res, 100));
  }

  const _request = require.cache.electron.exports.net.request;

  require.cache.electron.exports.net.request = function(obj) { // Hook around net.request as Discord uses it for module updating (updater v1)
    log('net.request', obj.url);

    if (obj.url.startsWith('https://discord.com/api/modules/')) { // If request is for module updating, reroute to GooseUpdate server instead of Discord's
      obj.url = 'https://updates.goosemod.com/goosemod' + obj.url.replace('https://discord.com/api', '');
      log('! rerouted module update url, new url', obj.url);
    }

    const out = _request.apply(this, [ obj ]);

    return out;
  };

  log('hooked into electron\'s net.request');
})();