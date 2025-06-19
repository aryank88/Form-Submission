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

// ✅ Allow only step 1–3 navigation via navbar
function goToStep(step) {
  if (step >= 1 && step <= 3) {
    currentStep = step;
    showStep(currentStep);
  }
}

// Add teacher–subject input pair
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
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // 📦 Combine all teacher–subject pairs into one string
  const teacherInputs = [...form.querySelectorAll('input[name="teachers[]"]')].map(i => i.value.trim());
  const subjectInputs = [...form.querySelectorAll('input[name="subjects[]"]')].map(i => i.value.trim());

  const combinedTeachers = teacherInputs.map((teacher, index) => `${teacher} - ${subjectInputs[index]}`).join(", ");

  data.teachers_subjects = combinedTeachers;

  // Clean up unwanted array fields (optional)
  delete data.teachers;
  delete data.subjects;

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
      alert("❌ Submission failed. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("⚠️ Something went wrong during submission!");
  }
});
