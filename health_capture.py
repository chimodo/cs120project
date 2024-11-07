from flask import Flask, render_template, request
# this is just a template that we will build upon
app = Flask(__name__)

health_data = {} # dictionary will store responses

@app.route('/', methods = ['GET','POST']) # gets data from html form
def get_health_data():
    # Example list of risk factors; you can modify this as needed.
    if request.method == "POST":
        health_data = request.form.to_dict()
        # request form gets all responses from the form. to dict converts it to dictionary
        print(health_data) # checking if appending to dict successful

        # TODO use an AI model to process the health data
        # something like this, there will be a separate function for it
        # risk_factors = process_health_data(health_data)

        # TODO use file io to store the results into a relevent file
        # (we should probably store the form responses in a file as well.
        # doctors might need that info as well )

        risk_factors = ['High blood pressure', 'Family history of heart disease']
        return render_template('index.html', risk_factors=risk_factors) 
    return render_template('index.html')

def analyse_risk(health_data):
    '''this function will use whatever pre existing AI model to 
    analyse the health data. health_data is that dictionary where we 
    added the form responses'''
    # TODO analyse the health data and return results
    pass

if __name__ == '__main__':
    app.run(debug=True)
