// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCfs2YWuaVF1W97hafS1R_IP5d5l2SX0s",
    authDomain: "number-31547.firebaseapp.com",
    projectId: "number-31547",
    storageBucket: "number-31547.appspot.com",
    messagingSenderId: "657095757747",
    appId: "1:657095757747:web:22221c4295564db51b45c6",
    measurementId: "G-KMS8JZWGCQ"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Collect user input and send POST request
  document.getElementById("submitBtn").addEventListener("click", async () => {
    const jsonInput = document.getElementById("jsonInput").value;
    const fileInput = document.getElementById("fileInput").files[0];
  
    try {
      // Parse user input JSON
      const parsedInput = JSON.parse(jsonInput);
  
      // Handle file as Base64 if provided
      let file_b64 = null;
      if (fileInput) {
        const reader = new FileReader();
        reader.onload = async function () {
          file_b64 = reader.result.split(",")[1];
  
          // Send POST request to the REST API
          const response = await fetch("http://localhost:5000/bfhl", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...parsedInput,
              file_b64,
            }),
          });
  
          const data = await response.json();
  
          // Display response on the web page
          document.getElementById("responseSection").style.display = "block";
          document.getElementById("response").textContent = JSON.stringify(data, null, 2);
  
          // Store response in Firebase Firestore
          await db.collection("responses").add(data);
          alert("Response stored in Firebase successfully!");
        };
        reader.readAsDataURL(fileInput);
      } else {
        alert("Please upload a file.");
      }
    } catch (error) {
      alert("Invalid input or server error.");
    }
  });
  