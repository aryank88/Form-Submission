let currentStep = 1;

function showStep(step) {
  document.querySelectorAll('.step-form').forEach((form, index) => {
    form.classList.remove('active');
    if (index === step - 1) form.classList.add('active');
  });

  document.querySelectorAll('.stepper .step').forEach((stepEl, index) => {
    stepEl.classList.toggle('active', index === step - 1);
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

function goToStep(step) {
  if (step >= 1 && step <= 3) {
    currentStep = step;
    showStep(currentStep);
  }
}

function addTeacher() {
  const container = document.getElementById("teacherContainer");
  const teacherInput = document.createElement("div");
  teacherInput.classList.add("teacher-input");

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.classList.add("teacher-name");
  nameInput.placeholder = "Teacher's Name";
  nameInput.required = true;

  const subjectInput = document.createElement("input");
  subjectInput.type = "text";
  subjectInput.classList.add("subject-name");
  subjectInput.placeholder = "Subject";
  subjectInput.required = true;

  teacherInput.appendChild(nameInput);
  teacherInput.appendChild(subjectInput);
  container.appendChild(teacherInput);
}

document.addEventListener("DOMContentLoaded", () => {
  showStep(currentStep);
});

document.getElementById("multiStepForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = this;

  const data = {
    institute: form.querySelector('[name="institute"]').value,
    logo: form.querySelector('[name="logo"]').value,
    address: form.querySelector('[name="address"]').value,
    contact: form.querySelector('[name="contact"]').value,
    counselorName: form.querySelector('[name="counselorName"]').value,
    counselorPhone: form.querySelector('[name="counselorPhone"]').value,
    counselorEmail: form.querySelector('[name="counselorEmail"]').value,
    category: form.querySelector('[name="category"]:checked')?.value || "",
    startDate: form.querySelector('[name="startDate"]').value,
    endDate: form.querySelector('[name="endDate"]').value,
    timings: form.querySelector('[name="timings"]').value
  };

  // Gather teacher-subject pairs
  const teachers = [...form.querySelectorAll('.teacher-name')].map(input => input.value.trim());
  const subjects = [...form.querySelectorAll('.subject-name')].map(input => input.value.trim());

  const combined = teachers.map((teacher, i) => `${teacher} - ${subjects[i]}`).join(", ");
  data.teachers_subjects = combined;

  const payload = { data };

  try {
    const response = await fetch("https://sheetdb.io/api/v1/czf89zs8v1xxh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      currentStep = 4;
      showStep(currentStep);
    } else {
      alert("Failed to submit.");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong!");
  }
});
