let currentStep = 1;

function showStep(step) {
  document.querySelectorAll('.step-form').forEach((el, idx) => {
    el.classList.toggle('active', idx === step - 1);
  });
  document.querySelectorAll('.stepper .step').forEach((el, idx) => {
    el.classList.toggle('active', idx === step - 1);
  });
}

function nextStep() {
  if (currentStep < 4) { currentStep++; showStep(currentStep); }
}
function prevStep() {
  if (currentStep > 1) { currentStep--; showStep(currentStep); }
}
function goToStep(step) { if (step >= 1 && step <= 3) { currentStep = step; showStep(step); } }

function addTeacher() {
  const div = document.createElement('div');
  div.className = 'teacher-input';
  div.innerHTML = `
      <input type="text" class="teacher-name" placeholder="Teacher's Name" required>
      <input type="text" class="subject-name" placeholder="Subject" required>`;
  document.getElementById('teacherContainer').appendChild(div);
}

document.addEventListener('DOMContentLoaded', () => showStep(currentStep));

document.getElementById('multiStepForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = e.target;

  // ---- fixed fields ----
  const data = {
    institute:        f.institute.value.trim(),
    logo:             f.logo.value.trim(),
    address:          f.address.value.trim(),
    contact:          f.contact.value.trim(),
    counselorName:    f.counselorName.value.trim(),
    counselorPhone:   f.counselorPhone.value.trim(),
    counselorEmail:   f.counselorEmail.value.trim(),
    category:         (f.querySelector('[name="category"]:checked')||{}).value || "",
    startDate:        f.startDate.value,
    endDate:          f.endDate.value,
    timings:          f.timings.value.trim()
  };

  // ---- collect all teachers / subjects ----
  const teachers = [...f.querySelectorAll('.teacher-name')].map(i => i.value.trim());
  const subjects = [...f.querySelectorAll('.subject-name')].map(i => i.value.trim());

  const combined = teachers.map((t, i) => `${t} - ${subjects[i] || ""}`).join(", ");
data.teachers_subjects = combined;

console.log("Final data going to SheetDB:", data);


  // ---- submit ----
  try {
    const res = await fetch("https://sheetdb.io/api/v1/czf89zs8v1xxh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data })
    });
    if (res.ok) { currentStep = 4; showStep(4); }
    else        { alert("Submission failed."); }
  } catch (err) {
    console.error(err);
    alert("Network error.");
  }
});
