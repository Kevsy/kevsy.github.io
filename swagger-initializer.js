window.onload = function() {
  //<editor-fold desc="Changeable Configuration Block">

  const urlParams = new URLSearchParams(window.location.search);
  const yamllUrl = urlParams.get('url');

  window.ui = SwaggerUIBundle({
    url: yamlUrl,
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

  //</editor-fold>
};
