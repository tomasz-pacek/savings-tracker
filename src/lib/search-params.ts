import { parseAsString } from "nuqs";
import { createSearchParamsCache } from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
  chatSearch: parseAsString.withDefault(""),
});
