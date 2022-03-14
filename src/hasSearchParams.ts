const params = new URLSearchParams(window.location.search);

type Available = 'dontWelcome';

export const hasSearchParams = (key: Available) => {
  return params.has(key);
};
