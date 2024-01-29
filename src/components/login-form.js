//@jsx h

export function LoginForm() {
  return (
    <form
      method="POST"
      action="/login"
      class={"flex max-w-[50%] ml-auto items-center gap-2"}
    >
      <div class={"flex-1 w-full"}>
        <input
          type="password"
          placeholder="Your secret password"
          name="password"
          class="input"
        />
      </div>
      <div>
        <button class="btn">
          Login
        </button>
      </div>
    </form>
  );
}
