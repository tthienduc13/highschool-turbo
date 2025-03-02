import Cookies from "js-cookie";

/**
 * Set a cookie.
 * @param name - The name of the cookie.
 * @param value - The value of the cookie.
 * @param expires - Optional number of days until the cookie expires.
 * @param path - Optional path where the cookie is accessible.
 */
export const setClientCookie = (
  name: string,
  value: string,
  expires?: number,
  path: string = "/",
): void => {
  const options = {
    expires: expires
      ? new Date(new Date().getTime() + expires * 24 * 60 * 60 * 1000)
      : undefined,
    path: path,
  };

  Cookies.set(name, value, options);
};

/**
 * Get a cookie by name.
 * @param name - The name of the cookie to retrieve.
 * @returns The value of the cookie or undefined if not found.
 */
export const getClientCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

/**
 * Get all cookies.
 * @returns An object containing all cookies as key-value pairs.
 */
export const getAllClientCookies = (): { [key: string]: string } => {
  return Cookies.get();
};

/**
 * Delete a cookie.
 * @param name - The name of the cookie to delete.
 * @param path - Optional path where the cookie is accessible.
 */
export const deleteClientCookie = (name: string, path: string = "/"): void => {
  Cookies.remove(name, { path });
};
