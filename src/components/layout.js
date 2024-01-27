// @jsx h
import h from "vhtml";

import { extractCss } from "goober";

export function Layout({ children }) {
  return (
    <html>
      <head>
        <script
          src="https://unpkg.com/htmx.org@1.9.10"
          integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
          crossorigin="anonymous"
        ></script>
        <link rel="stylesheet" href="/assets/styles.css"></link>
        <style>{extractCss()}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
