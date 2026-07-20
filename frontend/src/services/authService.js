const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * Generates a request correlation ID for tracing across services.
 */
function generateCorrelationId() {
  return 'corr-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
}

/**
 * Executes login API request to backend with exponential backoff for transient failures.
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {number} retries - Number of remaining retry attempts
 * @returns {Promise<Object>} Response object { success, token, user }
 */
export async function loginApi(email, password, retries = 3) {
  const correlationId = generateCorrelationId();
  let attempt = 0;
  let delay = 500; // base delay in ms

  while (attempt <= retries) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Correlation-ID': correlationId,
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        return data;
      }

      // 4xx errors (e.g. 400 Bad Request, 401 Unauthorized, 429 Rate Limit) should not be retried
      if (response.status >= 400 && response.status < 500) {
        const errorMessage = data.error || 'Authentication failed.';
        const error = new Error(errorMessage);
        error.status = response.status;
        throw error;
      }

      // Handle 5xx server errors with retry mechanism
      if (response.status >= 500 && attempt < retries) {
        attempt++;
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; // exponential backoff
        continue;
      }

      const errorMessage = data.error || 'Server error occurred during authentication.';
      const error = new Error(errorMessage);
      error.status = response.status;
      throw error;
    } catch (err) {
      // Don't retry client 4xx errors
      if (err.status && err.status >= 400 && err.status < 500) {
        throw err;
      }

      if (attempt < retries) {
        attempt++;
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
        continue;
      }

      throw err;
    }
  }
}
