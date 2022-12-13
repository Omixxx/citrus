import { db } from "../src/config/db.server";

type User = {
  username: string;
};

//tutto questo casino per rendere il mapping asincrono. ogni procedura di creazione deve essere
//asincrona.
async function main() {
  const entrys = await Promise.all(
    getUsers().map(async (user) => {
      return await db.user.create({
        data: {
          username: user.username,
        },
      });
    })
  );
  console.log(entrys);
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });

function getUsers(): Array<User> {
  return [
    {
      username: "tut",
    },
    {
      username: "ki",
    },
  ];
}
