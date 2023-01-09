export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};
