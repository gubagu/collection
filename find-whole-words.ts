  /**
   * Creates a RegEx pattern that matches one or multiple whole words.
   * There appears to be a problem with Regex and the word boundary \b matching the
   * beginning of a string with a starting or ending character out of the normal 256 byte range.
   * That is why lookbehind (?<=) & lookahead (?=) assertions are used instead.
   *
   * @param searchTerm String multiple search terms separated by one or more spaces.
   */
  private static createRegExp(searchTerm: string): RegExp {
    const regExPattern: string = searchTerm
      .replace(/[#-.]|[[-^]|[?|{}]/g, '\\$&') // Sanitize RegEx chars.
      .trim() // Trim the sting for starting or trailing spaces.
      .split(/\s+/) // Split on one or more spaces
      .map(word => `(?<=\\W|^)${word}(?=\\W|$)`) // Match whole search terms only.
      .join('\\s+'); // Join match patterns with one or more spaces.
    return new RegExp(regExPattern, 'ig');
  }
