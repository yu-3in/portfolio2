export const getAge = (birthday: Date): number => {
  const now = new Date()
  let age = now.getFullYear() - birthday.getFullYear()
  const monthDiff = now.getMonth() - birthday.getMonth()
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && now.getDate() < birthday.getDate())
  ) {
    age--
  }
  return age
}
