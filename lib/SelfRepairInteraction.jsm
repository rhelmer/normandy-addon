/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

const {utils: Cu} = Components;
Cu.import("resource://gre/modules/Preferences.jsm");
Cu.import("resource://shield-recipe-client/lib/Log.jsm");

this.EXPORTED_SYMBOLS = ["SelfRepairInteraction"];

const PREF_SELF_SUPPORT_ENABLED = "browser.selfsupport.enabled";

this.SelfRepairInteraction = {
  enableSelfRepair() {
    if (!this.isEnabled()) {
      Log.info("Reenabling Self Repair");
      this.setSelfRepair(true);
    }
  },

  disableSelfRepair() {
    if (this.isEnabled()) {
      Log.info("Disabling Self Repair");
      this.setSelfRepair(false);
    }
  },

  setSelfRepair(enabled) {
    Preferences.set(PREF_SELF_SUPPORT_ENABLED, enabled);
  },

  isEnabled() {
    return Preferences.get(PREF_SELF_SUPPORT_ENABLED, true);
  },
};