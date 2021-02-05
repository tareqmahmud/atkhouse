import RPi.GPIO as GPIO
import pyrebase
import time
from config import fireConfig
from environs import Env

print('Connecting to the firebase .............\n')

# Read Env
env = Env()
env.read_env()

# Get the firebase config from config.py file
firebaseConfig = fireConfig()

# Initialize the firebase app
firebase = pyrebase.initialize_app(firebaseConfig)

# Distance for the door
distance_door = 2

# Set the GPIO output chanel no.
channel = 7

#set GPIO Pins
GPIO_TRIGGER = 18
GPIO_ECHO = 24

# GPIO setup
GPIO.setmode(GPIO.BCM)  # Define which layout we used for this program
GPIO.setup(channel, GPIO.OUT)   # Define the chanel variable act as a output or input

#set GPIO direction (IN / OUT) For Distance
GPIO.setup(GPIO_TRIGGER, GPIO.OUT)
GPIO.setup(GPIO_ECHO, GPIO.IN)

# Light Off Method
def light_off(pin):
    GPIO.output(pin, GPIO.HIGH)  # Turn light on

# Light On Method
def light_on(pin):
    GPIO.output(pin, GPIO.LOW)  # Turn light off


if __name__ == '__main__':
    # Get a reference to the auth service
    auth = firebase.auth()

    # Get the username and password
    try:
        print("Read credentials from .env")
        email = env.str("ATKHOUSE_EMAIL")
        password = env.str("ATKHOUSE_PASSWORD")
    except:
        print("No credentails has been found from .env")
        email = str(input('Please enter your account email: '))
        password = str(input('Please enter account password: '))

    # Log the user in
    try:
        print('\nTrying to Login.......\n')

        # Login to user
        user = auth.sign_in_with_email_and_password(email, password);
        userId = user['localId'] # Get the user id

        # Connecting to the firebase
        db = firebase.database()

        while True:
            try:
                # Extract fetched data from database
                status_ref = db.child("/LedStatus/" + userId).get()
                light_status = status_ref.val()['light_status']

                print("--------------------------------------")
                print("Light Status From Backend: {}".format(light_status))

                try:
                    if light_status is True:
                        light_on(channel)
                        print("Light On...")
                        print("----------------------------------------\n")
                        time.sleep(1)
                    elif light_status is False:
                        light_off(channel)
                        print("Light Off...")
                        print("----------------------------------------\n")
                        time.sleep(1)
                except KeyboardInterrupt:
                    GPIO.cleanup()
            except:
                print(u'No Data Found')
                GPIO.cleanup()
            time.sleep(1)
    except:
        print('Invalid Credential')
        GPIO.cleanup()
