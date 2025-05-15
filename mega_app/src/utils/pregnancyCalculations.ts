export const calculatePregnancyProgress = (dueDate: string) => {
  const today = new Date();
  const dueDateTime = new Date(dueDate);
  
  // Calculate weeks remaining
  const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
  const weeksRemaining = Math.round((dueDateTime.getTime() - today.getTime()) / millisecondsPerWeek);
  
  // Calculate months remaining (approximately)
  const monthsRemaining = Math.round(weeksRemaining / 4);
  
  // Calculate current week of pregnancy (40 - weeks remaining)
  const currentWeek = 40 - weeksRemaining;
  
  // Determine trimester
  let trimester = '';
  if (currentWeek >= 28) {
    trimester = 'third';
  } else if (currentWeek >= 13) {
    trimester = 'second';
  } else if (currentWeek > 0) {
    trimester = 'first';
  }

  return {
    weeksRemaining,
    monthsRemaining,
    currentWeek,
    trimester
  };
}; 