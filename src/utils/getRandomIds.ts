export const getRandomIds = (maxNumber: number, quantity: number) => {
  const selectedNumbers: number[] = [];

  while(selectedNumbers.length !== quantity) {
    const randomNumber = Math.floor(Math.random() * maxNumber);
    const numberAlreadySelected = selectedNumbers.find(number => number === randomNumber);

    if(numberAlreadySelected) {
      continue;
    }

    selectedNumbers.push(randomNumber);
  }

  return selectedNumbers;
}