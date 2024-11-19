from flask import Flask, render_template, request
# this is just a template that we will build upon
app = Flask(__name__)

health_data = {} # dictionary will store responses

@app.route('/', methods = ['GET','POST'])
def authenticate():
    if request.method == "POST":
        info = request.form.to_dict(flat=False) # flat = false allows our dictionary to be nested therefore all checkbox choices will be returned
        # info dictionary format {'name': 'Alice', 'surname': 'Smith', 'email': 'Alice@example.com'}
        print(info)
        if find_user(info): # passed into find user function which looks for the name
            return render_template("health_form.html")
        else:
            message = "Your information does not match our records"
    return render_template("index.html", message = "Your information does not match our records")
    

@app.route('/health_form.html', methods = ['GET','POST']) # gets data from html form
def get_health_data():
    # Example list of risk factors; you can modify this as needed.
    if request.method == "POST":
        health_data = request.form.to_dict(flat = False)
        #visit_reason = request.form.getlist('reason[]') # asked chatgpt how to access the list of checkbox results
        #health_data['reason']
        # request form gets all responses from the form. to dict converts it to dictionary
        #print(health_data) # checking if appending to dict successful
        #print(visit_reason)

        # TODO use file io to store the results into a relevent file
        # (we should probably store the form responses in a file as well.
        # doctors might need that info as well )

        risk_factors = ['High blood pressure', 'Family history of heart disease']
        return render_template('health_form.html', risk_factors=risk_factors) 
    return render_template('health_form.html')


def find_user(info):
    # TODO use info in the dictionary, look for a line with the same name, surname and email. All 3 should match
    # info dictionary format {'name': 'Alice', 'surname': 'Smith', 'email': 'Alice@example.com'}
    return True # change back to false later

def create_file(health_data):
    # append patient details from scheduling to json file
    # you can use the jsonfy function
    # save it to separate folder
    pass # temporarily ignore this function

if __name__ == '__main__':
    app.run(debug=True)
