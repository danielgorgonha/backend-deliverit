export const DiffDate = (date: string) => {

  const now = new Date();

  const past = new Date(date);

  const diff = Math.abs(now.getTime()) - past.getTime();

  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days > 0) {
    return days;
  }
}