# SCOPE DOCUMENT: VITALS TEAM

## Participants
- **VynQuaezhia Bates**  
- **Langston Darby**  
- **Tinenyasha Sibanda**  
- **David Orisakwe**

---

## Code and Explanation

### User Interface: HTML
#### **`index.html`**
- **Purpose:** Homepage containing the authentication form.  
- **Inputs:**  
  - Name  
  - Surname  
  - Email (validated with JavaScript).  
- **Behavior:**  
  - On successful submission, data is sent to `app.py` via Flask.  
  - If no email is entered, the user is prompted with an error.

#### **`health_form.html`**
- **Purpose:** Health form for user submission before the appointment.  
- **Fields:**  
  - **Reason for visit**: User's reason for making an appointment.  
  - **Severity and affected eye**: Severity of symptoms and affected eye.  
  - **Onset date**: Date when symptoms began.  
  - **Eye exam history**: Options: *Yes*, *No*, *Never*.  
  - **Surgeries**: Checkbox list for prior surgeries with follow-up questions:  
    - Date of last surgery.  
    - If within 3 months, user receives an alert to consult a doctor urgently.  
  - **Ocular/Medical history**: Conditions experienced by the user or their family.  
  - **Lifestyle factors**: Alcohol, smoking, recreational drugs, and screen time exceeding 6 hours.

---

## Python Side: Flask and File I/O

### Overview of `app.py`
- Handles data received from the forms.  
- Writes user data to a JSON file (`health_data.json`).  

### Functions
#### **`authenticate()`**  
- **Route:** `/`  
- **Purpose:** Process the authentication form.  
- **Details:**  
  - Checks if the user exists in the scheduling CSV.  
  - If found, redirects to `health_form.html`.  
  - If not, reloads the homepage with an error message.  

#### **`get_health_data()`**  
- **Route:** `/health_form.html`  
- **Purpose:** Process health form responses.  
- **Details:**  
  - Converts form data into a nested dictionary using `to_dict(flat=False)`.  
  - Handles checkbox data to prevent missing selections.  

#### **`create_file(info, health_data)`**  
- **Parameters:**  
  - `info`: User details (name, email, etc.).  
  - `health_data`: Health form responses.  
- **Behavior:** Writes or appends `info` and `health_data` into `health_data.json`.

---

## User Interface: HTML Forms

### **`index.html`**
- Purpose: Homepage for authentication.  
- Fields: Name, Surname, Email (validated by JavaScript).  
- On submission: Sends data to Flask for processing.  

### **`health_form.html`**
- Detailed fields as described above.  

### **`success.html`**
- Purpose: Displays confirmation of successful form submission.  

---

## JavaScript (`script.js`)

### Client-Side Validation
#### **`validate()`**  
- **Purpose:** Ensure all required fields are completed.  
- **Example:** Validation for "Reason for visit":  
```javascript
const reasonChecked = document.querySelectorAll('input[name="reason"]:checked').length > 0;

if (!reasonChecked) {
    alert('Please select at least one reason for your visit.');
    isValid = false;
}
