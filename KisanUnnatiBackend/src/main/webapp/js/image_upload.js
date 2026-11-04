let image_input = document.getElementById("image_input");
let profile_pic = document.getElementById("profile_pic");
let upload_text = document.getElementById("upload_text");

image_input.onchange = function () {
  let file = image_input.files[0];

  if (file) {
    if (file.size > 1 * 1024 * 1024) {
      alert("File size must be less than 1MB");
      image_input.value = "";
      return;
    }

    profile_pic.src = URL.createObjectURL(file);
    profile_pic.style.display = "block";
    upload_text.style.display = "none";
  }
};