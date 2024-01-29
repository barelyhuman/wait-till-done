import { createUser, doesUserExist } from "../features/users/user.js";

async function createInitialUser() {
  const username = "root"
  const password = process.env.ADMIN_PASSWORD || "Demo@123";
  if(!await doesUserExist(username)){
    await createUser(username,password);
  }
}

createInitialUser()
  .then(() => {
    console.log("Created User");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
