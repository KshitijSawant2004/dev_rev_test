/**
 * WebEngage Wrapper Module (DISABLED)
 * All functions are no-ops to temporarily disable WebEngage.
 */

export const weReady = (callback) => {
  // no-op
};

export const weTrack = (eventName, props = {}) => {
  // no-op
  // console.log(`[WebEngage Disabled] Track: ${eventName}`, props);
};

export const weLogin = (userId) => {
  // no-op
  // console.log(`[WebEngage Disabled] Login: ${userId}`);
};

export const weLogout = () => {
  // no-op
};

export const weSetUserAttributes = (attrs = {}) => {
  // no-op
};