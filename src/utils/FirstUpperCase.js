export default function FirstUpperCase(phrase) {
  return phrase
    .trim()
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1).toLowerCase();
    })
    .join(" ");
}
