// Simple and secure Swagger UI initializer for CAMARA project

// Test if URLs are offical Camara YAML

function isValidCamaraYamlUrl(urlString) {
    try {
        const url = new URL(urlString);
        const pathname = url.pathname.toLowerCase();

        return (
            url.protocol === 'https:' &&
            url.hostname.toLowerCase() === 'raw.githubusercontent.com' &&
            pathname.startsWith('/camaraproject/') &&
            (
                pathname.endsWith('.yaml') ||
                pathname.endsWith('.yml')
            )
        );
    } catch {
        return false;
    }
}

// Check the querystring

function validateQuerystringUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const queryURL = urlParams.get('url');

    if (!queryURL || queryURL.trim() === '') {
        return null;
    }

    return isValidCamaraYamlUrl(queryURL.trim())
        ? queryURL.trim()
        : null;
}

// Call the querystring check upon page load

window.onload = function () {
    const validatedURL = validateQuerystringUrl();

    const swaggerURL =
        validatedURL ||
        'Please provide a valid CAMARA project YAML URL using: ?url=https://raw.githubusercontent.com/camaraproject/[repo]/[path]/[file].yaml';

    window.ui = SwaggerUIBundle({
        url: swaggerURL,
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
        ],
        plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: 'StandaloneLayout'
    });
};

// Remove the form once the UI has rendered
function removeDownloadUrlWrapper() {
  const el = document.querySelector(".download-url-wrapper");
  if (el) {
    el.remove();
    return true;
  }
  return false;
}

// Swagger renders asynchronously, so retry briefly
const interval = setInterval(() => {
  if (removeDownloadUrlWrapper()) {
    clearInterval(interval);
  }
}, 250);
