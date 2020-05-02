const fetchInfo = async (query: any, values: Array<any>): Promise<any> => {
  const body = await fetch(`http://localhost:4000/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // @ts-ignore
      query: query(...values),
    }),
  });
  const data = await body.json();
  console.log(data);
  return data;
};
export default fetchInfo;
