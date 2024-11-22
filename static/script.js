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

  // // Prevent form submission if a surgery option is selected
  // const surgeryChecked = document.querySelectorAll('input[name="surgeries"]:checked').length > 0;
  // if (surgeryChecked) {
  //     alert('You cannot select any surgery options. Please uncheck them to proceed.');
  //     isValid = false;
  // }

  const surgeryOptions = document.querySelectorAll('input[name="surgeries"]:checked');
  const noneSelected = document.getElementById('no-surgery').checked;

  if (surgeryOptions.length > 0 && !noneSelected) {
      alert('You have had a recent surgery. Please urgently onsult a doctor about your symptoms as there may be a link.');
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
});

/*
What we need

~ make sure the user selects at least one checkbox for each question
~ for checkbox groups with "none" option, please make sure that selecting none deselects the other options
  and selecting another option deselects none
~ Upon submission, make sure the user has not selected a surgery option. Alert them and prevent form submission
*/