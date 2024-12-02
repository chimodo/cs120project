function validate() {
  // Validate that at least one checkbox is selected in each section
  let isValid = true;

  // General reason for visit validation
  const reasonChecked = document.querySelectorAll('input[name="reason"]:checked').length > 0;
  if (!reasonChecked) {
      alert('Please select at least one reason for your visit.');
      isValid = false;
  }

  // Allergies validation
  const allergiesChecked = document.querySelectorAll('input[name="allergies"]:checked').length > 0;
  if (!allergiesChecked) {
      alert('Please select at least one allergy option.');
      isValid = false;
  }

  // Lifestyle validation
  const lifestyleChecked = document.querySelectorAll('input[name="lifestyle"]:checked').length > 0;
  if (!lifestyleChecked) {
      alert('Please select at least one lifestyle option.');
      isValid = false;
  }

  // Surgery validation

  const surgeryOptions = document.querySelectorAll('input[name="surgeries"]:checked');
  const noneSelected = document.getElementById('no-surgery').checked;
  const reasonSymptoms = document.querySelectorAll('.reason-symptom:checked');
  console.log("Reason Symptoms Length:", reasonSymptoms.length);
  console.log("Reason Symptoms:", reasonSymptoms);
  let monthsDiff = null

  // Check if surgery date is within 3 months
  const surgeryDate = document.getElementById('latest-surgery-date') ? document.getElementById('latest-surgery-date').value : null;
  if (surgeryDate) {
  const currentDate = new Date();
  const surgeryDateObj = new Date(surgeryDate);
  const timeDiff = currentDate - surgeryDateObj; // in milliseconds
  monthsDiff = timeDiff / (1000 * 3600 * 24 * 30); // Convert to months
  }

  // If surgery was within the last 3 months
//   if (monthsDiff <= 3) {
//     alert('You have had a recent surgery. Please wait at least 1-1.5 years after surgery to create an appointment.');
//     isValid = false;
//     return isValid; // Prevent further form submission
//   }
//if they selected a surgery option, and at least one of the reason for visit is a symptom, and are
//3 months or less post op...
  if (surgeryOptions.length > 0 && !noneSelected && reasonSymptoms.length>0 && monthsDiff <= 3) {
      alert('Your latest surgery is 3 months or less ago. Please urgently consult a doctor about your symptoms as there may be a link.');
      isValid = false;
  } else if (surgeryOptions.length === 0) {
      alert('Please answer the surgery portion.');
      isValid = false;
  }

    return isValid;
}

// Handle "None" option for surgery and lifestyle checkboxes
document.addEventListener('DOMContentLoaded', function() {
  // Handle "None" for surgeries
  const noneSurgery = document.getElementById('no-surgery');
  const surgeryOptions = document.querySelectorAll('.surgery-option');
  
  noneSurgery.addEventListener('change', function() {
      if (noneSurgery.checked) {
          surgeryOptions.forEach(option => option.checked = false);
      }
  });

  surgeryOptions.forEach(option => {
      option.addEventListener('change', function() {
          if (noneSurgery.checked) {
              noneSurgery.checked = false;
          }
      });
  });

  // Handle "None" for lifestyle options
  const noneLifestyle = document.querySelector('input[name="lifestyle"][value="none"]');
  const lifestyleOptions = document.querySelectorAll('input[name="lifestyle"]:not([value="none"])');

  noneLifestyle.addEventListener('change', function() {
      if (noneLifestyle.checked) {
          lifestyleOptions.forEach(option => option.checked = false);
      }
  });

  lifestyleOptions.forEach(option => {
      option.addEventListener('change', function() {
          if (noneLifestyle.checked) {
              noneLifestyle.checked = false;
          }
      });
  });

    // prevent form submission if validation fails
    // if (!isValid) {
    //     event.preventDefault(); // stop form from submitting
    //   }
});

document.querySelector('form').addEventListener('submit', function(event) {
    if (!validate()) {
        event.preventDefault(); // stop form from submitting
    }
});



/*
What we need

~ make sure the user selects at least one checkbox for each question
~ for checkbox groups with "none" option, please make sure that selecting none deselects the other options
  and selecting another option deselects none
~ Upon submission, make sure the user has not selected a surgery option. Alert them and prevent form submission
*/