export async function updateDataInput(
  token: string,
  dataRepo: string | undefined,
  newData: string,
  sha: string,
) {
  const headers: Headers = new Headers();
  headers.append("content-type", "application/json");

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  await fetch(`https://api.github.com/repos/${dataRepo}/contents/input.json`, {
    headers: headers,
    method: "PUT",
    body: JSON.stringify({
      sha: sha,
      message: "Updated from WTD",
      content: newData,
    }),
  }).then((d) => {
    if (!d.ok) {
      throw d;
    }
    return d.json();
  });

  return true;
}

export async function fetchDataInput(
  token: string,
  dataRepo: string | undefined,
) {
  const headers: Headers = new Headers();
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  const data = await fetch(
    `https://api.github.com/repos/${dataRepo}/contents/input.json`,
    {
      headers: headers,
    },
  ).then((d) => {
    if (!d.ok) {
      throw d;
    }
    return d.json();
  });

  const ghObject = {
    sha: data.sha,
    content: JSON.parse(atob(data.content)),
  };
  return ghObject;
}

export type AnimeInputList = string[];
