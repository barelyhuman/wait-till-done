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
        {errors.length > 0 ? (
          <div class="m-10 max-w-4xl mx-auto">
            {errors.map((err) => (
              <p class="border border-red-400 text-red-600 w-full rounded-md mb-10 px-4 py-2">
                {err}
              </p>
            ))}
          </div>
        ) : null}
        {children}
      </body>
    </html>
  );
}
