const apiUrl = "http://tinyurl.com/api-create.php";
const urlInput = document.getElementById("input");
const shortenBtn = document.getElementById("submit");
const resultDiv = document.getElementById("result");
const shortUrlInput = document.getElementById("short-url");
const copyBtn = document.getElementById("copy-btn");

shortenBtn.addEventListener("click", async () => {
  const longUrl = urlInput.value.trim();

  if (!isValidUrl(longUrl)) {
    alert("Invalid URL");
    return;
  }

  try {
    const response = await fetch(
      `${apiUrl}?url=${encodeURIComponent(longUrl)}`,
      { mode: "cors" }
    );
    const shortUrl = await response.text();
    console.log(`Short URL: ${shortUrl}`);
    shortUrlInput.value = shortUrl;
    resultDiv.style.display = "block";
  } catch (error) {
    console.error(`Error shortening URL: ${error.message}`);
    resultDiv.innerText = `Error shortening URL: ${error.message}`;
  }
});

copyBtn.addEventListener("click", () => {
  shortUrlInput.select();
  document.execCommand("copy");
  alert("Shortened URL copied to clipboard!");
});

function isValidUrl(url) {
  const urlRegex =
    /^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]$/;
  return urlRegex.test(url);
}
