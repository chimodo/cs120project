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

  /////surgery date validation but only when a surgery option has been selected
  // Validate that a date is provided if a surgery option is selected
const surgeryDateInput = document.getElementById('latest-surgery-date');
const latestSurgeryDate = surgeryDateInput ? surgeryDateInput.value : null;

if (surgeryOptions.length > 0 && !noneSelected) {
    if (!latestSurgeryDate) {
        alert('Please provide the date of your latest surgery.');
        isValid = false;
    } else {
        // Check if the surgery date is valid
        const currentDate = new Date();
        const latestSurgeryDateObj = new Date(latestSurgeryDate);

        if (isNaN(latestSurgeryDateObj)) {
            alert('Please provide a valid date for your latest surgery.');
            isValid = false;
        } else {
            const timeDiff = currentDate - latestSurgeryDateObj; // in milliseconds
            monthsDiff = timeDiff / (1000 * 3600 * 24 * 30); // Convert to months

            // Warn if symptoms are reported within 3 months post-surgery
            if (reasonSymptoms.length > 0 && monthsDiff <= 3) {
                alert('Your latest surgery is 3 months or less ago. Please urgently consult a doctor about your symptoms as there may be a link.');
                isValid = false;
            }
        }
    }
}

  ///end of surgery date validation

  // Check if surgery date is within 3 months
  const surgeryDate = document.getElementById('latest-surgery-date') ? document.getElementById('latest-surgery-date').value : null;
  if (surgeryDate) {
  const currentDate = new Date();
  const surgeryDateObj = new Date(surgeryDate);
  const timeDiff = currentDate - surgeryDateObj; // in milliseconds
  monthsDiff = timeDiff / (1000 * 3600 * 24 * 30); // Convert to months
  }


//if they selected a surgery option, and at least one of the reason for visit is a symptom, and are
//3 months or less post op...
  if (surgeryOptions.length > 0 && !noneSelected && reasonSymptoms.length>0 && monthsDiff <= 3) {
      alert('Your latest surgery is 3 months or less ago. Please urgently consult a doctor about your symptoms as there may be a link.');
      isValid = false;
  } else if (surgeryOptions.length === 0) {
      alert('Please answer the surgery portion.');
      isValid = false;
  }

  ///// validation for severity, affected eye, onset date
  if (reasonSymptoms.length > 0) {
    const severitySelected = document.querySelector('input[name="severity"]:checked');
    const onsetDate = document.querySelector('input[name="onset"]');
    const affectedEyeSelected = document.querySelector('input[name="where"]:checked');

    if (!severitySelected) {
        alert('Please select a severity level for your symptoms.');
        isValid = false;
    }

    if (!onsetDate || !onsetDate.value) {
        alert('Please provide an onset date for your symptoms.');
        isValid = false;
    }

    if (!affectedEyeSelected) {
        alert('Please select which eye is affected.');
        isValid = false;
    }
}
  /////end of validation for severity, affected eye, onset date

    return isValid;
}

//__________________________________________________________________________________

// Handle form component behavior //////////////////////////////////////////////
// Handle "None" option for surgery and lifestyle checkboxes an also the colapse
document.addEventListener('DOMContentLoaded', function() {
  // Handle "None" for surgeries
  const noneSurgery = document.getElementById('no-surgery');
  
  const surgeryOptions = document.querySelectorAll('.surgery-option');
  const collapseSurgeryDate = document.getElementById('collapse-surgery-date');  // the colapse thing from bootstrap. it has to stay open 
  

noneSurgery.addEventListener('change', function() {
    if (noneSurgery.checked) {
        surgeryOptions.forEach(option => option.checked = false);
        collapseSurgeryDate.classList.remove('show');

        
    }
});

surgeryOptions.forEach(option => {
    option.addEventListener('change', function() {
      const anyChecked = Array.from(surgeryOptions).some(checkbox => checkbox.checked); // if any surgery option is selected
        if (noneSurgery.checked) {
            noneSurgery.checked = false;
        }
        if (anyChecked){
          collapseSurgeryDate.classList.add('show'); // Manually show the collapse
        } else {
          collapseSurgeryDate.classList.remove('show'); // Manually hide the collapse
          const surgeryDateInput = document.getElementById('latest-surgery-date'); // clear the date'
            surgeryDateInput.value = '';
        }
    });
});
  
  // also, clear the date when surgeries are all unselected
////////////// colapse portion
  // collapse for reason visit 
    const generalVisit = document.getElementById('general-eye-checkup');
    const symptomOptions = document.querySelectorAll('.reason-symptom');
    const collapseOnsetDate = document.getElementById('collapse-onset-date');  // the colapse thing from bootstrap. it has to stay open
  
    symptomOptions.forEach(option => {
        option.addEventListener('change', function() {
          const anyChecked = Array.from(symptomOptions).some(checkbox => checkbox.checked); // if any surgery option is selected    
             if (anyChecked){
              collapseOnsetDate.classList.add('show'); // Manually show the collapse

            } else{
               collapseOnsetDate.classList.remove('show'); // Manually hide the collapse
            }
        });
    });

    // now with the colapsing, the previous selections have to be cleared
    const symptomCheckboxes = document.querySelectorAll('.reason-symptom'); // Adjust selector if needed
    const severityRadios = document.querySelectorAll('input[name="severity"]');
    const whereRadios = document.querySelectorAll('input[name="where"]');
    const onsetDateInput = document.querySelector('input[name="onset"]');
    //const collapseOnsetDate = document.getElementById('collapse-onset-date');
    

    function clearExtraOptions() {
        const anyChecked = Array.from(symptomCheckboxes).some(checkbox => checkbox.checked);

        if (!anyChecked) {
            // Clear all fields and collapse section
            severityRadios.forEach(radio => (radio.checked = false));
            whereRadios.forEach(radio => (radio.checked = false));
            if (onsetDateInput) onsetDateInput.value = '';
            collapseOnsetDate.classList.remove('show'); // Collapse the section
            symptom_checked = false//
        }
    }

    // Add change listeners to all symptom checkboxes
    symptomCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', clearExtraOptions);
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

//________________________________________________________________________

///// finally, stop submission if form is not valid
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