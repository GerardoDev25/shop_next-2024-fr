export const generatePaginationNumbers = (currentPage: number, totalPage: number) => {
  // ? if the total page is less than 7, we show all the pages
  if (totalPage <= 7) {
    return Array.from({ length: totalPage }, (_, i) => i + 1);
  }

  // ? if the current page is between the first 3 pages, we show the first 3 pages and the latest 2 pages
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPage - 1, totalPage];
  }

  // ? if the current page is between the last 3 pages, we show the first 2 pages and the last 3 pages
  if (currentPage >= totalPage - 2) {
    return [1, 2, '...', totalPage - 2, totalPage - 1, totalPage];
  }

  // ? if the current page is in the middle, we show the current page and the pages before and after it
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPage,
  ];
};
