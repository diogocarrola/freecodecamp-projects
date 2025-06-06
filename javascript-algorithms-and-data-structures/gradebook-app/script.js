function getAverage(scores) {
  let sum = 0;

  for (const score of scores) {
    sum += score;
  }

  return sum / scores.length;
}

function getGrade(score) {
  if (score === 100) {
    return "A++";
  } else if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}

function hasPassingGrade(score) {
  return getGrade(score) !== "F";
}

function studentMsg(totalScores, studentScore) {
  const classAverage = getAverage(totalScores);
  const studentGrade = getGrade(studentScore);
  let message = `Class average: ${classAverage}. Your grade: ${studentGrade}. `;
  message += studentGrade === 'F' ? 'You failed the course.' : 'You passed the course.';
  return message;
}