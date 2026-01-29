function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForPlugSDK({ timeoutMs = 15000, pollMs = 100 } = {}) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (typeof window !== 'undefined' && window.plugSDK?.init) return window.plugSDK;
    await sleep(pollMs);
  }
  return null;
}

async function waitForDevrevFn({ timeoutMs = 15000, pollMs = 100 } = {}) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (typeof window !== 'undefined' && typeof window.devrev === 'function') return window.devrev;
    await sleep(pollMs);
  }
  return null;
}

export async function initDevRevPlug() {
  if (typeof window === 'undefined') return;
  if (window.__DEVREV_PLUG_INITIALIZED__) return;
  window.__DEVREV_PLUG_INITIALIZED__ = true;

  const app_id = window.__DEVREV_APP_ID;
  const session_recording_key = import.meta.env.VITE_DEVREV_SESSION_RECORDING_KEY;

  if (!app_id) {
    console.warn('[DevRev] Missing window.__DEVREV_APP_ID');
    return;
  }

  // Some deployments expose `window.plugSDK`, others expose a `window.devrev(...)` init wrapper.
  // Support both so recording works reliably.
  const plugSDK = await waitForPlugSDK();
  if (plugSDK) {
    // Per DevRev docs, session recording requires enable_session_recording + session_recording_key.
    // If you haven't set the key yet, we still init the SDK so you can verify it's wired.
    const initOptions = {
      app_id,
      enable_session_recording: Boolean(session_recording_key),
      session_recording_key: session_recording_key || undefined
    };

    plugSDK.init(initOptions);

    // Helpful session metadata for debugging in DevRev.
    try {
      plugSDK.addSessionProperties({
        app: 'web_engage_demo',
        env: import.meta.env.MODE
      });
    } catch {
      // ignore
    }
  } else {
    const devrev = await waitForDevrevFn();
    if (devrev) {
      // Legacy init wrapper (minimal options; relies on DevRev-side config).
      devrev('init', { appId: app_id });
    } else {
      console.warn('[DevRev] Neither plugSDK nor devrev init function is available (plug.js blocked/not loaded).');
      return;
    }
  }

  if (!session_recording_key) {
    console.warn(
      '[DevRev] Session recording key missing. Set VITE_DEVREV_SESSION_RECORDING_KEY in Vercel env vars to enable session replay.'
    );
  }
}

