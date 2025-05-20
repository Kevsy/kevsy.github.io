const urlParams = new URLSearchParams(window.location.search);
const queryURL = urlParams.get('url');
const url = new URL(queryURL);

var OASyaml;

if (url.hostname == "raw.githubusercontent.com" && url.pathname.startsWith("/camaraproject")) {
OASyaml = queryURL;
} else {
OASyaml ="for CAMARA use only";
}

window.onload = function() {
  //<editor-fold desc="Changeable Configuration Block">

  window.ui = SwaggerUIBundle({
    url: OASyaml,
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
