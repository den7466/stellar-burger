export const moveElementsInArray = (
  array: any,
  index1: number,
  index2: number
) => {
  const tmp = array[index1];
  array[index1] = array[index2];
  array[index2] = tmp;
  return array;
};
