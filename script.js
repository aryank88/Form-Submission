let currentStep = 1;

function showStep(step) {
  // Hide all step forms
  document.querySelectorAll('.step-form').forEach((el, index) => {
    el.classList.remove('active');
    if (index === step - 1) el.classList.add('active');
  });

  // Update stepper navigation
  document.querySelectorAll('.stepper .step').forEach((el, i) => {
    el.classList.toggle('active', i === step - 1);
  });
}

function nextStep() {
  if (currentStep < 4) {
    currentStep++;
    showStep(currentStep);
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
}

// Show the first step on page load
document.addEventListener('DOMContentLoaded', () => showStep(currentStep));

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
