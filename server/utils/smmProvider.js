/**
 * smmProvider.js
 * ─────────────────────────────────────────────────────────────────
 * Centralised service layer for all SMMGen API communications.
 * All functions read credentials from .env at call-time so hot-reloads
 * and test environments always pick up the current values.
 *
 * SMMGen API docs: https://smmgen.com/api/v2 (POST with form-data body)
 * ─────────────────────────────────────────────────────────────────
 */

const axios = require('axios');

// ── Helpers ──────────────────────────────────────────────────────

/**
 * Build the base POST payload that every SMMGen request needs.
 * Using URLSearchParams ensures the body is sent as
 * application/x-www-form-urlencoded, which the SMMGen API expects.
 */
const buildBaseParams = (action, extras = {}) => {
  const params = new URLSearchParams();
  params.append('key', process.env.SMMGEN_API_KEY);
  params.append('action', action);
  Object.entries(extras).forEach(([k, v]) => params.append(k, v));
  return params;
};

/**
 * Handles Axios errors in a consistent, readable way.
 * Throws a new Error with a developer-friendly message that includes
 * the SMMGen API's own error text when available.
 */
const handleApiError = (error, context) => {
  if (error.response) {
    // SMMGen returned a non-2xx status
    const apiMsg = error.response.data?.error || JSON.stringify(error.response.data);
    const msg = `SMMGen API Error [${context}] — Status ${error.response.status}: ${apiMsg}`;
    console.error(`❌ ${msg}`);
    throw new Error(msg);
  } else if (error.request) {
    // Request was made but no response received (network issue / timeout)
    const msg = `SMMGen API No-Response [${context}]: ${error.message}`;
    console.error(`❌ ${msg}`);
    throw new Error(msg);
  } else {
    // Something went wrong building the request
    const msg = `SMMGen API Request Setup Error [${context}]: ${error.message}`;
    console.error(`❌ ${msg}`);
    throw new Error(msg);
  }
};

// ── Public API Functions ──────────────────────────────────────────

/**
 * fetchServices()
 * ──────────────
 * Retrieves the full live service catalogue from SMMGen.
 *
 * @returns {Promise<Array>} Array of service objects
 *   e.g. [{ service: 1, name: "...", type: "...", rate: "...", min: "...", max: "..." }]
 */
const fetchServices = async () => {
  try {
    const params = buildBaseParams('services');
    const response = await axios.post(process.env.SMMGEN_API_URL, params, {
      timeout: 15000, // 15 second timeout
    });

    // SMMGen returns an array directly for the 'services' action
    const data = response.data;

    if (!Array.isArray(data)) {
      // If they return an error object instead of an array, surface it
      throw new Error(data?.error || 'Unexpected response format from SMMGen (expected an array)');
    }

    console.log(`✅ SMMGen fetchServices: Retrieved ${data.length} services.`);
    return data;
  } catch (error) {
    handleApiError(error, 'fetchServices');
  }
};

/**
 * placeOrder(serviceId, link, quantity)
 * ──────────────────────────────────────
 * Submits a new order to the SMMGen API.
 *
 * @param {number|string} serviceId  - SMMGen service ID
 * @param {string}        link       - The target URL (e.g. Instagram post URL)
 * @param {number}        quantity   - How many units to order
 *
 * @returns {Promise<{order: string}>} Object containing SMMGen's new order_id
 *   e.g. { order: "12345" }
 */
const placeOrder = async (serviceId, link, quantity) => {
  if (!serviceId || !link || !quantity) {
    throw new Error('placeOrder requires serviceId, link, and quantity.');
  }

  try {
    const params = buildBaseParams('add', {
      service: serviceId,
      link: link,
      quantity: quantity,
    });

    const response = await axios.post(process.env.SMMGEN_API_URL, params, {
      timeout: 20000, // 20 second timeout for order placement
    });

    const data = response.data;

    // SMMGen returns { "order": "12345" } on success, or { "error": "..." } on failure
    if (data.error) {
      throw new Error(`SMMGen rejected the order: ${data.error}`);
    }

    if (!data.order) {
      throw new Error('SMMGen did not return an order ID. Check serviceId, link, and quantity.');
    }

    console.log(`✅ SMMGen placeOrder: Order #${data.order} placed for service ${serviceId}.`);
    return data; // { order: "12345" }
  } catch (error) {
    handleApiError(error, 'placeOrder');
  }
};

/**
 * checkStatus(orderId)
 * ─────────────────────
 * Queries the current status of an existing SMMGen order.
 *
 * @param {string|number} orderId - The SMMGen order ID (returned by placeOrder)
 *
 * @returns {Promise<Object>} Status object
 *   e.g. { charge: "0.27", start_count: "3000", status: "Completed", remains: "0", currency: "USD" }
 */
const checkStatus = async (orderId) => {
  if (!orderId) {
    throw new Error('checkStatus requires an orderId.');
  }

  try {
    const params = buildBaseParams('status', { order: orderId });

    const response = await axios.post(process.env.SMMGEN_API_URL, params, {
      timeout: 15000,
    });

    const data = response.data;

    if (data.error) {
      throw new Error(`SMMGen status check failed: ${data.error}`);
    }

    console.log(`✅ SMMGen checkStatus: Order #${orderId} is "${data.status}".`);
    return data;
  } catch (error) {
    handleApiError(error, 'checkStatus');
  }
};

/**
 * checkProviderBalance()
 * ──────────────────────
 * Fetches the current account balance from SMMGen.
 *
 * @returns {Promise<Object>} Balance object e.g. { balance: "102.54", currency: "USD" }
 */
const checkProviderBalance = async () => {
  try {
    const params = buildBaseParams('balance');
    const response = await axios.post(process.env.SMMGEN_API_URL, params, {
      timeout: 10000,
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'checkProviderBalance');
  }
};

module.exports = {
  fetchServices,
  placeOrder,
  checkStatus,
  checkProviderBalance,
};
