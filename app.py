from flask import Flask, render_template,redirect, request
import csv
from json import load, dump, JSONDecodeError
from os import makedirs, path

# this is just a template that we will build upon
app = Flask(__name__)

info = {} # dictionary will store name, surname, email
health_data = {}

@app.route('/', methods = ['GET','POST'])
def authenticate():
    global info
    message = ''
    if request.method == "POST":
        info = request.form.to_dict(flat = False) # flat = false allows our dictionary to be nested therefore all checkbox choices will be returned
        # info dictionary format {'name': 'Alice', 'surname': 'Smith', 'email': 'Alice@example.com'}
        print(info)
        if find_user(info): # passed into find user function which looks for the name
            return redirect("health_form.html")
        else:
            message = "Your information does not match our records"
            return render_template("index.html", message = message)
    return render_template("index.html")
    

@app.route('/health_form.html', methods = ['GET','POST']) # gets data from html form
def get_health_data():
    global info
    # Example list of risk factors; you can modify this as needed.
    if request.method == "POST":
        global health_data
        health_data = request.form.to_dict(flat = False)
        # request form gets all responses from the form. to dict converts it to dictionary
        print(health_data) # checking if appending to dict successful
        #print(visit_reason)

        create_file(info, health_data)
        # TODO use file io to store the results into a relevent file
        # (we should probably store the form responses in a file as well.
        # doctors might need that info as well )

        risk_factors = ['High blood pressure', 'Family history of heart disease']
        return render_template('success.html') 
    return render_template('health_form.html')


def find_user(info):
    """
    Search for a user in the CSV file based on a dictionary containing user information.
    
    :param info: Dictionary containing user information, such as {'name': 'Alice', 'surname': 'Smith', 'email': 'alice@example.com'}
    :return: True if the user is found, False otherwise.
    """
    try:
        # Set the path to the CSV file in the 'scheduling_data' folder
        file_path = 'scheduling_data/schedule.csv'
        
        if not info:
            raise ValueError("The 'info' dictionary must not be empty.")

        with open(file_path, mode='r', newline='', encoding='utf-8') as file:
            reader = csv.DictReader(file)  # Read the CSV into a dictionary-like format
            
            # Loop through each row in the CSV
            for row in reader:
                matches = True
                for key, value in info.items():
                    row_value = row[key].strip().lower()  # Remove any leading/trailing spaces and lower case
                    search_value = value[0].strip().lower() if isinstance(value, list) else value.strip().lower()
                    
                    if row_value != search_value:
                        matches = False
                        break

                if matches:
                    return True  # Found a match
    except Exception as e:
        print(f"An error occurred: {e}")

    return False  # No match found or error occurred

def create_file(info, health_data):
    # print("here are the dictionaries")
    # print(info)
    # print(health_data)
    
    # Define the path to the JSON file
    #folder_path = 'patient_data'
    folder_path = "vitals_data"
    
    file_path = path.join(folder_path, 'health_data.json')

    # Ensure the directory exists
    makedirs(folder_path, exist_ok=True)

    # Check if the file exists and load existing data
    if path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as file:
            try:
                data = load(file)  # Load existing JSON data
            except JSONDecodeError:
                data = []  # Initialize with an empty list if the file is corrupted or empty
    else:
        data = []  # Initialize with an empty list if the file does not exist

    # Append the patient info and new health data to the list
    patient = {}
    patient["personal_info"] = info
    patient["health_data"] = health_data

    data.append(patient)
    # data.append(info)
    # data.append(health_data)

    # Write the updated data back to the file
    with open(file_path, 'w', encoding='utf-8') as file:
        dump(data, file, indent=4)

    print(f"Patient data successfully saved to {file_path}.")

#create_file(info, health_data)


if __name__ == '__main__':
    app.run(debug=True)
