from flask import Flask, render_template, redirect, url_for, request
from email.message import EmailMessage
import ssl
import smtplib
from datetime import datetime

app = Flask(__name__)


@app.route("/")
def index():
    return redirect(url_for("home"))


@app.route("/home")
def home():
    return render_template("home.html", active="home")


@app.route("/who-we-are")
def who_we_are():
    return render_template("who-we-are.html", active="who_we_are")


@app.route("/staff")
def staff():
    return render_template("staff.html", active="staff")
    

@app.route("/services-offered")
def services():
    return render_template("services.html", active="services")


@app.route("/buying-a-used-car")
def used_car():
    return render_template("used-car.html", active="used_car")


@app.route("/vehicles-to-avoid")
def avoid():
    return render_template("avoid.html", active="avoid")


@app.route("/appointment-request", methods=["GET", "POST"])
def appointment():
    success = None

    if request.method == "POST":
        try:
            email_sender = "bradydeboer195@gmail.com"
            password = "lgfckgcjasifjian"
            email_receiver = "thebradster7.bd@gmail.com"
            subject = "Appointment Request"
            body = f"""
Client Information:
Name: {request.form.get('name')}
Phone: {request.form.get('phone')}
Email: {request.form.get('email')}

Vehicle Information:
Year: {request.form.get('year')}
Make: {request.form.get('make').replace('+', ' ')}
Model: {request.form.get('model')}

Requested Service Information:
Requested Services: {format_services(request.form.get('service'), request.form.get('service2'), request.form.get('service3'))}
Requested Date: {format_date(request.form.get('date'))}
Requested Time: {format_time(request.form.get('time'))}

Additional Information:
{request.form.get('additional')}
            """
            em = EmailMessage()
            em["From"] = email_sender
            em["To"] = email_receiver
            em["Subject"] = subject
            em.set_content(body)
            context = ssl.create_default_context()

            with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as smtp:
                smtp.login(email_sender, password)
                smtp.sendmail(email_sender, email_receiver, em.as_string())
            
            success = True
        except:
            success = False

    return render_template("appointment.html", active="appointment", success=success)

def format_services(*services):
    return ", ".join([i.replace("+", " ") for i in services if i is not None])

def format_date(date):
    try:
        date_object = datetime.strptime(date, "%Y-%m-%d")
        month_names = [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ]
        return f"{month_names[date_object.month - 1]} {date_object.day}, {date_object.year}"
    except ValueError:
        return date

def format_time(time):
    try:
        hour, minute = map(int, time.split(":"))
        return f"{hour % 12 if hour % 12 != 0 else 12}:{minute:02d} {'AM' if hour < 12 else 'PM'}"
    except ValueError:
        return time

if __name__ == "__main__":
    app.run(debug=True, port=8000)
