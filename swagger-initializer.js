// Simple and secure Swagger UI initializer for CAMARA project
// Validates URLs to ensure only CAMARA project YAML files can be loaded

function getValidatedSwaggerURL() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const queryURL = urlParams.get('url');
        
        // Return null if no URL provided
        if (!queryURL || queryURL.trim() === '') {
            return null;
        }
        
        // Parse and validate URL
        const url = new URL(queryURL);
        
        // Security checks
        const isValid = url.protocol === 'https:' &&
                       url.hostname.toLowerCase() === 'raw.githubusercontent.com' &&
                       url.pathname.startsWith('/camaraproject/') &&
                       (url.pathname.toLowerCase().endsWith('.yaml') || url.pathname.toLowerCase().endsWith('.yml'));
        
        return isValid ? queryURL : null;
        
    } catch (error) {
        // Invalid URL format
        return null;
    }
}

window.onload = function() {
    // Get validated URL or use default message
    const validatedURL = getValidatedSwaggerURL();
    const swaggerURL = validatedURL || 'Please provide a valid CAMARA project YAML URL using: ?url=https://raw.githubusercontent.com/camaraproject/[repo]/[path]/[file].yaml';
    
    // Initialize Swagger UI
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
        layout: "StandaloneLayout"
    });
};
