export default defineEventHandler((event) => {
  if (!event.context.user) {
    return sendRedirect(event, "/");
  }
  return sendRedirect(event, "/");
});
