const {uuid} = require('sdk/util/uuid');
const {Cu} = require('chrome');
Cu.import('resource://gre/modules/Services.jsm'); /* globals Services: false */
Cu.import('resource:///modules/ShellService.jsm'); /* globals ShellService: false */

const {Log} = require('./Log.js');
const {Storage} = require('./Storage.js');

const actionLogger = Log.makeNamespace('actionLogger');

exports.NormandyDriver = {
  testing: true,
  version: 1,

  log(message, testOnly=true) {
    if (testOnly && !this.testing) {
      return;
    }
    actionLogger.debug(message);
  },

  showHeartbeat(/* options */) {
    // TODO
    // https://dxr.mozilla.org/mozilla-central/source/browser/components/uitour/UITour.jsm#1096
    return Promise.reject(new Error('not implemented'));
  },

  getAppInfo() {
    Log.debug(JSON.stringify(Object.keys(Services.appinfo)));
    let appinfo = {
      defaultUpdateChannel: Services.appinfo.defaultUpdateChannel,
      version: Services.appinfo.version,
      isDefaultBrowser: ShellService.isDefaultBrowser() || null,
    };

    return Promise.resolve(appinfo);
  },

  uuid() {
    return uuid().toString();
  },

  createStorage(keyPrefix) {
    return new Storage(keyPrefix);
  },
};