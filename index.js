const containerIdMap = {
    WS_AI_LINK: 'post-url',
    WS_AI_TEXT: 'post-text',
};

function isNegativeChecked() {
  return document.getElementById("negativeToggle").checked;
}

async function generateURL() {
  const url = document.getElementById('urlInput').value;

  try {
    const response = await fetch('https://lenot344.app.n8n.cloud/webhook/generate-from-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url,
        negative: isNegativeChecked()
      })
    });

    // Only act if the response is marked as final
    if (response.status === 299) {
      const json = await response.json();
      document.getElementById('textResult').value = json["Content"] || 'No content';
      console.log("ID:", json.id);
      console.log("Title:", json["Name/ID"]);
      console.log("Created:", json["Created time"]);
      console.log("Content:", json["Content"]);

    }

    // All other status codes are ignored silently (there are more than one respond to webhook nodes that return diff errs)

  } catch (error) {
    console.error('Error posting URL:', error);
    document.getElementById('textResult').value = 'Error retrieving content.';
  }
}

async function generateText() {
  const text = document.getElementById('textInput').value;

  try {
    const res = await fetch('https://lenot344.app.n8n.cloud/webhook/generate-from-text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: text,
        negative: isNegativeChecked()
      })
    });

    // Only act if the response is marked as final
    if (res.status === 299) {
      const json = await res.json();
      document.getElementById('textResult').value = json["Content"] || 'No content';
      console.log("ID:", json.id);
      console.log("Title:", json["Name/ID"]);
      console.log("Created:", json["Created time"]);
      console.log("Content:", json["Content"]);

    }

    // All other status codes are ignored silently (there are more than one respond to webhook nodes that return diff errs)

  } catch (error) {
    console.error('Error posting URL:', error);
    document.getElementById('textResult').value = 'Error retrieving content.';
  }
}

function postText() {
}

async function generateArticles() {
  const WS_AI = "WS_AI";
  try {
    const res = await fetch('https://lenot344.app.n8n.cloud/webhook/generate-from-web', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        WS_AI,
        negative: isNegativeChecked()
      })
    });

    // Only act if the response is marked as final
    if (res.status === 299) {
      const json = await res.json();
      document.getElementById('textResult').value = json["Content"] || 'No content';
      console.log("ID:", json.id);
      console.log("Title:", json["Name/ID"]);
      console.log("Created:", json["Created time"]);
      console.log("Content:", json["Content"]);
    }

    // All other status codes are ignored silently (there are more than one respond to webhook nodes that return diff errs)

  } catch (error) {
    console.error('Error posting URL:', error);
    document.getElementById('textResult').value = 'Error retrieving content.';
  }
}


function deleteRecord(table) {
  // const recordID = prompt("Enter Airtable Record ID to delete:");
  if (!recordID) return;
  fetch(TEXT_DELETE_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recordID })
  })
  .then(res => res.json())
  .then(data => alert('Deleted!'))
  .catch(err => console.error(err));
}

function formatText(cmd) {
  document.execCommand(cmd, false, null);
}

function highlightText() {
  document.execCommand('backColor', false, 'yellow');
}

function insertList() {
  document.getElementById('textInput').value += '\n• ';
}

function insertEmoji() {
  document.getElementById('textInput').value += '';
}