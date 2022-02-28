const abc = [
   {
      id: 1,
      name: "Shashank",
   },
   {
      id: 2,
      name: "Viokd",
   },
   {
      id: 3,
      name: "Viokdk",
   },
];

const newArray = abc
   .filter((item) => item.id != 2)
   .map((item) => {
      if (item.id != 2) return { name: item.name };
   });

console.log(newArray);
