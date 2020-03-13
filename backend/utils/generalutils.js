const studentEmailRegex = /^s[0-9]{7}@student\.rmit\.edu\.au$/

const checkRmitStudent = (email) =>
  studentEmailRegex.test(email)

const generateIntArray = (start, end) => {
  let array = []
  for(let i = parseInt(start); i<parseInt(end); i++){
    array.push(i)
  }
  return array
}

const getTwoRandFromArray = (array) => {
  let firstPortIndex = Math.floor(Math.random() * array.length)
  let secondPortIndex = firstPortIndex
  while(secondPortIndex === firstPortIndex){
    secondPortIndex = Math.floor(Math.random() * array.length)
  }
  return [array[firstPortIndex],array[secondPortIndex]]
}

module.exports = { checkRmitStudent, generateIntArray, getTwoRandFromArray }