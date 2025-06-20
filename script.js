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

document.addEventListener("DOMContentLoaded", () => {
  showStep(currentStep);
});

document.getElementById("multiStepForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = this;

  // ✅ Manually extract all data fields
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

  // ✅ Gather and combine teachers + subjects
  const teacherInputs = form.querySelectorAll('input[name="teachers[]"]');
  const subjectInputs = form.querySelectorAll('input[name="subjects[]"]');

  let combined = [];

  teacherInputs.forEach((teacherInput, index) => {
    const teacher = teacherInput.value.trim();
    const subject = subjectInputs[index]?.value.trim() || "";
    if (teacher || subject) {
      combined.push(`${teacher} - ${subject}`);
    }
  });

  data.teachers_subjects = combined.join(", ");

  const payload = { data };

  try {
    const response = await fetch("https://sheetdb.io/api/v1/czf89zs8v1xxh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      currentStep = 4;
      showStep(currentStep);
    } else {
      alert("Submission failed.");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong!");
  }
});
