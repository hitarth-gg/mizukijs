const TOSHO = "https://feed.animetosho.org";

function GET_TOSHO_RSS_BY_QUERY(quality = "all", aids, eids) {
  if (eids === 0 || eids === null) {
    if (quality.toLowerCase() === "all")
      return `${TOSHO}/json?qx=1&aids=${aids}`;
    return `${TOSHO}/json?qx=1&q=${quality}&aids=${aids}`;
  }
  if (quality.toLowerCase() === "all")
    return `${TOSHO}/json?qx=1&aids=${aids}&eids=${eids}`;
  return `${TOSHO}/json?qx=1&q=${quality}&aids=${aids}&eids=${eids}`;
}

export async function getToshoEpisodes(quality, aids, eids) {
  try {
    const response = await fetch(GET_TOSHO_RSS_BY_QUERY(quality, aids, eids));
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
