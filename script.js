let currentStep = 1;

// Show the current step form and update stepper UI
function showStep(step) {
  document.querySelectorAll('.step-form').forEach((form, index) => {
    form.classList.remove('active');
    if (index === step - 1) form.classList.add('active');
  });

  document.querySelectorAll('.stepper .step').forEach((stepEl, index) => {
    stepEl.classList.toggle('active', index === step - 1);
  });
}

// Move forward
function nextStep() {
  if (currentStep < 4) {
    currentStep++;
    showStep(currentStep);
  }
}

// Move backward
function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
}

// Dynamically add teacher-subject input fields
function addTeacher() {
  const container = document.getElementById("teacherContainer");

  const teacherInput = document.createElement("div");
  teacherInput.classList.add("teacher-input");

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.name = "teachers[]";
  nameInput.placeholder = "Teacher's Name";
  nameInput.required = true;

  const subjectInput = document.createElement("input");
  subjectInput.type = "text";
  subjectInput.name = "subjects[]";
  subjectInput.placeholder = "Subject";
  subjectInput.required = true;

  teacherInput.appendChild(nameInput);
  teacherInput.appendChild(subjectInput);
  container.appendChild(teacherInput);
}

// Show step 1 on page load
document.addEventListener("DOMContentLoaded", () => {
  showStep(currentStep);
});

// Handle form submission via SheetDB
document.getElementById("multiStepForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = this;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Get multiple teachers and subjects
  data.teachers = [...form.querySelectorAll('input[name="teachers[]"]')].map(input => input.value);
  data.subjects = [...form.querySelectorAll('input[name="subjects[]"]')].map(input => input.value);

  const payload = {
    data: data
  };

  try {
    const response = await fetch("https://sheetdb.io/api/v1/czf89zs8v1xxh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      nextStep(); // Move to success screen
    } else {
      alert("Submission failed. Please try again.");
    }
  } catch (error) {
    console.error("Error during submission:", error);
    alert("Something went wrong!");
  }
});
