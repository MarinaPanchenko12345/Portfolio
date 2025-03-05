function sendMail() {
  let params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "service_lqyl9iu"; 
  const templateID = "template_yme3gsu"; 

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      // Очистка полей формы
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("message").value = "";
      Swal.fire({
        title: "Message Sent!",
        text: "Your message has been sent successfully.",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn btn-primary",
        },
        buttonsStyling: false,
      });
    })
    .catch((err) => {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });
    });
}
