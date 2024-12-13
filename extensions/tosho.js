const TOSHO = decodeURIComponent(atob("aHR0cHM6Ly9mZWVkLmFuaW1ldG9zaG8ub3Jn"));

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

function GET_TOSHO_RSS(packer = '"[SubsPlease]"') {
  return `${TOSHO}/json?qx=1&q=${packer}`;
}

export default new (class Tosho {
  encUrls = {
    tosho: decodeURIComponent(atob("aHR0cHM6Ly9mZWVkLmFuaW1ldG9zaG8ub3Jn")),
    pahe: decodeURIComponent(atob("aHR0cHM6Ly9hbmltZXBhaGUucnU=")),
    paheimages: decodeURIComponent(atob("aHR0cHM6Ly9pLmFuaW1lcGFoZS5ydQ==")),
    zenshinSupabase: decodeURIComponent(
      atob("aHR0cHM6Ly96ZW5zaGluLXN1cGFiYXNlLWFwaS5vbnJlbmRlci5jb20=")
    ),
    nyaaApi: decodeURIComponent(
      atob("aHR0cHM6Ly9ueWFhYXBpLm9ucmVuZGVyLmNvbS9ueWFh")
    ),
  };

  async getToshoEpisodes(quality, aids, eids) {
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

  async getNewReleases(packer = "[SubsPlease]") {
    try {
      const response = await fetch(GET_TOSHO_RSS(packer));

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
})();
