# Project Documentation

## Introduction

This project aims to create a health data collection form with validation and backend support. The application uses Flask for the backend and HTML, JavaScript, and CSS for the frontend. The form collects health data from users, validates it both client-side and server-side, and stores it in JSON files.

---

## `find_user(info)` Function

This function checks if a user exists in the `users.csv` file by matching the user's name, surname, and email. If a match is found, it returns `True`; otherwise, it returns `False`.

```python
def find_user(info):
    with open("users.csv", mode="r") as file:
        reader = csv.DictReader(file)
        for row in reader:
            if (row["Name"] == info["Name"] and
                row["Surname"] == info["Surname"] and
                row["Email"] == info["Email"]):
                return True
    return False
```

---

## `get_health_data()` Function (Route `/health_form.html`)

This route processes the health data form submission. When the form is submitted, it collects and stores the data in a JSON file.

```python
@app.route('/health_form.html', methods=['GET', 'POST'])
def get_health_data():
    if request.method == 'POST':
        info = request.form.to_dict(flat=False)  # Collect user health data
        health_data = request.form.to_dict(flat=False)  # Collect health-specific data
        create_file(info, health_data)  # Store the data in a JSON file
        return render_template('success.html')
    return render_template('health_form.html')
```

---

## `create_file(info, health_data)` Function

This function writes the user-submitted health and personal data into a JSON file, creating the file if it doesn’t exist or appending to it if it does.

```python
def create_file(info, health_data):
    file_path = os.path.join("data", "health_data.json")
    if os.path.exists(file_path):
        with open(file_path, "a") as file:
            json.dump({"info": info, "health_data": health_data}, file)
    else:
        with open(file_path, "w") as file:
            json.dump({"info": info, "health_data": health_data}, file)
```

---

## Client-Side Validation (JavaScript)

### `validate()` Function

The `validate()` function checks if the required fields in the health form are filled out before submission. If any field is missing, it alerts the user.

```javascript
function validate() {
    const reasonChecked = document.querySelectorAll('input[name="reason"]:checked').length > 0;
    if (!reasonChecked) {
        alert('Please select at least one reason for your visit.');
        isValid = false;
    }
    // Additional validation checks
}
```

---

## Behavior Handling

- **Recent Surgeries**:  
  If the user indicates they have had surgery within the last 3 months, an alert prompts them to consult a doctor before continuing with the form.

```javascript
if (surgeryOptions.length > 0 && monthsDiff <= 3) {
    alert('Your latest surgery is 3 months or less ago. Please urgently consult a doctor.');
    isValid = false;
}
```

- **Dynamic Form Display**:  
  If the user selects certain symptoms (like "dry eye" or "pink eye"), additional related fields will be shown.

```javascript
<input type="checkbox" name="reason" value="dry-eye" class="reason-symptom" data-bs-toggle="collapse" href="#collapse-onset-date"> Dry eye
```

- **Bootstrap Collapse**:  
  The `collapse` component dynamically reveals additional form fields when specific checkboxes are selected.

---

## Team Members' Contributions

### David Orisakwe:
- Presenter for project progress during classes
- Wrote the code that wrote the health info dictionaries into JSON files
- Helped debug code
- Contributed to documentation

### Tinenyasha Sibanda:
- Flask implementation
- Debugging
- Repository and file structure
- HTML forms
- Contributed to documentation

### Langston Darby:
- JavaScript validation
- Pseudo code
- Contributed to documentation

### VynQuaezhia Bates:
- Created flow chart
- Documentation (typist)
- Developed the `find_user` function

---
## Future Iterations and Improvements

While the current version of the project addresses the primary functionalities, there are several areas that could be improved or expanded in future iterations. Below are some suggestions for potential enhancements:

### 1. **Database Integration**
   - **Current Limitation:** The project currently stores user data in JSON files, which can be inefficient for larger datasets.
   - **Future Improvement:** Transition to a relational or NoSQL database (such as PostgreSQL or MongoDB) to better handle larger volumes of data and provide more flexibility for querying and managing user information. This would also help ensure data consistency and scalability as the user base grows.

### 2. **Form Validation Enhancements**
   - **Current Limitation:** While basic form validation is implemented on the frontend using JavaScript, there is room for more robust checks.
   - **Future Improvement:** Expand validation to include server-side checks to further ensure data integrity and prevent malicious input. This could include validating medical history data or ensuring that user input is consistent across different forms. Server-side validation will also improve the security and accuracy of user data.

### 3. **User Experience (UX) Enhancements**
   - **Current Limitation:** The current UI is functional, but it could be more user-friendly and intuitive.
   - **Future Improvement:** Revamp the user interface to make it more accessible and provide a smoother experience for users. This could involve simplifying the form submission process, adding tooltips for better guidance, and making the application fully responsive across all devices, ensuring that it works seamlessly on desktops, tablets, and mobile phones.

### 4. **Testing and Quality Assurance**
   - **Current Limitation:** Testing has been minimal and primarily done manually.
   - **Future Improvement:** Implement automated testing for both frontend and backend. This could include unit tests, integration tests, and end-to-end tests to ensure the stability and reliability of the system as new features are added. Automated tests will help identify bugs early in the development process and ensure that the application remains functional as updates are made.
---

## Conclusion

This project implements a basic health data collection system with form validation and storage. It leverages Flask and JavaScript to process and validate data on both the client and server sides. Future iterations will focus on adding authentication and data visualization features.

    isValid = false;
}
