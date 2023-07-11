from flask import Flask, render_template, redirect, url_for

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


@app.route("/online-appointment-request")
def appointment():
    return render_template("appointment.html", active="appointment")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
