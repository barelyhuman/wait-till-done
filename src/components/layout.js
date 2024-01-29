// @jsx h

export function Layout({ children, errors = [] }) {
  return (
    <html>
      <head>
        <script
          src="https://unpkg.com/htmx.org@1.9.10"
          integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
          crossorigin="anonymous"
        ></script>
        <link rel="stylesheet" href="/assets/styles.css"></link>
      </head>
      <body>
        <div class="">
          {errors.map((err) => (
            <p class="">{err}</p>
          ))}
        </div>
        {children}
      </body>
    </html>
  );
}
