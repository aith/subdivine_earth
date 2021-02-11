function arrayEquals(a, b) {
  return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
}

function verifyAreArrays(a) {
    if (!Array.isArray(a) ||
        !(typeof yourVariable === 'object' && yourVariable !== null))
    { return false; }

    return true;
    
}
