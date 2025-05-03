export const getData = async (url: string) => {
  // const res = await fetch("https://fakestoreapi.com/products", {
  //   cache: "no-store",
  // });
  const res = await fetch(url, {
    cache: "no-store",
    next: {
      // revalidate: 30,
      tags: ["products"],
    },
  });

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res.json();
};
