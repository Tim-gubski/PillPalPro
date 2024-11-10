# PillPalPro
HackPrinceton Fall 2024 Project

## Motivation
75% of Americans have trouble taking their medicine as directed ([Benjamin 2012](https://pmc.ncbi.nlm.nih.gov/articles/PMC3234383/#B1)). This can be a result of memory loss or forgetfulness, and can even afflict people of all ages, but primarily elderly patients. As a child of caregiver for someone who has to take medication at specific times, it can be a heavy mental load to make sure that they are taking their medication as prescribed, and can lead to a lot of worrying. Another problem is a patient being uninformed about the proper directions best taking their medicine, and the warnings related to their specific combination of medication, such as avoiding certain foods and substances while on them.

## Our Solution
Pill Pal Pro monitors when you take your medication and sends you phone notifications to keep you on track. The smart box can individually track the different drugs you need to take and ensure that you take them at their optimal frequency and times. Through built WiFi capability, the Pill Pal Pro can also publish its results to a web app accessible by both the patient and their care taker, providing the patient with additional direction and warnings about their medication, while giving the care taker peace of mind by being able to monitor if their loved one is taking their medications as directed by their doctor.

## How We Built It
The Pill Pal Pro has a 3D-printed casing that we custom-designed in Fusion 360. It is equipped with 4 medication compartments with latching lids and LED indicators to signal which medication the patient should take.

Under the hood the Pill Pal Pro is using an ESP32 micro controller to take readings from 4 buttons that monitor when the medication compartments are open, and control the 4 status LEDS. The microcontroller is also connected to the wifi and subscribes to the Firebase backend to check for when it is time for the patient to take their medication. When it is time the ESP32 will turn on the LEDs on the appropriate compartment, trigger a notification on the patients phone, and when the patient takes their medication it will push the updated time that the medication was taken to the Firebase backend.

Our front end is written in Reflex, and is how the patient, doctor, or caretaker sets up our device. In the WebApp they can configure the medication type, and the times it should be taken. All of this information is pushed to the Firebase backend which lets the WebApp and Pill Pal hardware interact.

## Challenges We Ran Into
Jackie hated using Reflex, because it is too prescriptive and did not allow him the freedom he desired to code the app as he wished.

It was a big challenge to fit all of the electronics we wanted into our compact Pill Pal shell. We had to augment our design a few times to get everything to work, and in the end we also had to make some compromises on how much hardware we were able to pack into it, most notably not being able to find a battery that would compactly fit into the shell. There are batteries that would for sure fit, but we did not have access to them at this hackathon.

In past hackathons Tim had used Twillio for doing phone notifications, but for this hackathon we did not have as much luck using it. It seems that some US regulations have been passed recently to crack down on spam calls and texts, which make it almost impossible to get text message alerts working for hobbyists. To get around this we used an iOS app called Pushcut, which exposes an API endpoint which you can send a call to and trigger a notification on the device. We ended up using this, and although it is less universal than text messages, and we would still want to uses texts in a commercial version of this, it is still cool to have actual notifications working for a hackathon.

## Whats Next
In continuing this project we would like to further polish our design to make an enclosed power source. We would also like to fully build out the web app with auth functionality and make a separate landing page for patient and care taker. It would also be cool to add more notification alert types, like sending the care taker updates when the patient takes or misses their medication, but for the hackathon we skipped doing this as Pushcut has a $2 monthly subscriptions and we didn't want to pay for it on more than 1 device :)

## Images!
![Image1](PillPal-Images/img1.jpeg)
![Image2](PillPal-Images/img2.jpeg)
![Image3](PillPal-Images/img3.jpeg)
![Image4](PillPal-Images/img4.jpeg)
