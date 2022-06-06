# Feebris Pairing Exercise (Full-stack)

Thank you for taking the time to interview with us. The purpose of this test is to challenge your ability to:

- Understand an existing solution to a problem
- Write code following best practices
- Create a pull request for other members of the team to understand and review

The specifics of the task will be shared with you during our interview.

### Scenario

The Feebris product helps carers perform medical check-ups of elderly patients that reside in care homes. We are providing you with an existing web application that lists patients, the care home where they live and their GP practice assigned. By clicking on each patient, you can see the check-ups performed on the patient and their SPO2 (when it applies). The app retrieves its data from a set of JSON files for simplicity (in a more realistic scenario this data would come from an api or database).

### Terminology

- Care home: A facility where several elderly residents live together. These institutions have staff who perform various types of assistance and care.
- Patient: An elderly resident of a Care Home.
- Check-up: A record of health measurements and readings taken for a Patient.
- GP Practice: The office or location of a general practitioner doctor. Most Patients will be assigned to a particular GP, sometimes multiple GP's.
- [Pulse Oximeter](https://en.wikipedia.org/wiki/Pulse_oximetry): A medical device used to determine blood oxygen levels in a Patient.
- [SPO2](<https://en.wikipedia.org/wiki/Oxygen_saturation_(medicine)>): Peripheral blood oxygen saturation. A pulse oximeter will produce SPO2 readings (many per second).

### Install and run

You may install and run the web application like this:

```bash
# Install dependencies
npm install

# Run the app, browse to http://localhost:1234
npm run start
```
