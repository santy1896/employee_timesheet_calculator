const tableBodyTrs = document
  .querySelector(".tableBody")
  .querySelectorAll(".tr");
  console.log(tableBodyTrs);

  function createForm() {
    let form = document.createElement("form");
  
    form.innerHTML = `
      <th>  <input type="text" class="orange"  placeholder="Enter day" /></th>
      <td>
        <input type="time" id="start-work" class="blue"/>
      </td>
      <td>
        <input type="time" id="start-break" class="green" />
      </td>
      <td>
        <input type="time" id="end-break" class="green"/>
      </td>
      <td>
        <input type="time" id="end-work" class="blue"/>
      </td>
     
      <td>
        <input  class="workedHours purple" value="00:00" disabled />
      </td>
      <td>
        <button class="btn" type="submit" 
        ">add</button>
      </td>
      `;
    form.onsubmit = (e) => handleFormSubmission(e);
    return form;
  }
// console.log(createForm());

// TODO [ ] 3. Add all form elements to the DOM using async and IIFE (Immediately Invoked Function Expression)
(async () => {
  tableBodyTrs.forEach((tr) => {
    tr.appendChild(createForm());
  });
})();

// TODO: [ ] 4. Get all forms elements from the DOM
const forms = document.querySelectorAll("form");

// TODO: [ ] 4.1 Add submit event listeners to all forms

function handleFormSubmission(e) {
  e.preventDefault();

  // TODO: [ ] 4.2 Get input elements from the submitted form
  const day = e.target.children[0].value,
    startWork = e.target.children[1].value,
    startBreak = e.target.children[2].value,
    endBreak = e.target.children[3].value,
    endWork = e.target.children[4].value;
  let worked = e.target.children[5];
  let submitBtn = e.target.children[6];

  // TODO: 4.1.1 Validate form submission
  if (validateSubmission(day, startWork, endWork, submitBtn)) {
    //TODO: [ ] 5. Calculate the daily hours worked

    //? Elements for overtime?

    worked.value = calcDailyWorkedHours(
      startWork,
      endWork,
      startBreak,
      endBreak,

      e
    );

    // todo: [ ] 6.Calculate total amount of worked hours
    calculateTotalWorkedHours();
  } else {
    return;
  }
}

// TODO: [ ] 5.1Create a function that calculates the amount of hours worked
function calcDailyWorkedHours(startWork, endWork, startBreak, endBreak) {
  // TODO: [ ] 5.1.1 Covert string to time
  startWork = startWork.split(":");
  endWork = endWork.split(":");
  startBreak = startBreak.split(":");
  endBreak = endBreak.split(":");

  // TODO: [ ] 5.1.1 Get Dates

  // TODO: [ ] 5.1.2  Calculate work time

  const startWorkDate = new Date(0, 0, 0, startWork[0], startWork[1], 0);
  const endWorkDate = new Date(0, 0, 0, endWork[0], endWork[1], 0);
  const diffWork = endWorkDate.getTime() - startWorkDate.getTime();

  // TODO: [ ] 5.1.3 Calculate break time
  const startBreakDate = new Date(0, 0, 0, startBreak[0], startBreak[1], 0);
  const endBreakDate = new Date(0, 0, 0, endBreak[0], endBreak[1], 0);
  const diffBreak = endBreakDate.getTime() - startBreakDate.getTime();

  // TODO: [ ] 5.1.4 Calculate the final difference work - break time
  let diffFinal =
    (isNaN(diffWork) ? 0 : diffWork) - (isNaN(diffBreak) ? 0 : diffBreak);

  // TODO: [ ] 5.1.5 covert back to time
  let hours = Math.floor(diffFinal / 1000 / 60 / 60);
  // substraction assigment
  diffFinal -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(diffFinal / 1000 / 60);

  return (
    (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes
  );
}
// todo: [ ] 6.1 Create a function to calculate total amount of worked hours
function calculateTotalWorkedHours() {
  const allWorkedHours = document.querySelectorAll(".workedHours");

  // todo: [ ] 6.1.2 Convert NodeList to array

  let arrayOfWorkedHours = Array.from(allWorkedHours);

  let newWorkHours = arrayOfWorkedHours.map((workedHour) => {
    return workedHour.value;
  });

  // todo: [ ] 6.1.3 Create a empty array and add elements to it.
  let arr = [];
  arr.push(newWorkHours);

  // todo: [ ] 6.1.4 Covert time strings to minutes
  let subArr = arr[0].map((el) => {
    const [hours, minutes] = el.split(":");
    console.log(hours * 60 + minutes);
    return parseInt(hours) * 60 + parseInt(minutes);
  });

  console.log(subArr);

  // todo: [ ] 6.1.5  Return only work hours that exist

  let calculateTotalHoursWorked = subArr.reduce(
    (partialSum, a) => parseInt(partialSum + a),
    0
  );

  // todo: [ ] 6.1.6 Output for Total Worked Hours
  let outputWorkedHours = document.getElementById("totalWorkedHours");
  outputWorkedHours.value = minutesToHoursAndMinutes(calculateTotalHoursWorked);
}

// todo: [ ] Create a function to validate the form submission

function validateSubmission(day, startWork, endWork, submitBtn) {
  // todo: [ ] Change button class after form submion

  // ! [ ] Transform if else to turnary operator
  if (day === "" || startWork === "" || endWork === "") {
    console.log(day);
    alert("Enter the work day, start & end work hours");
  } else {
    submitBtn.classList.add("btn-green");
    submitBtn.innerHTML = "&#10004;";
    return true;
  }
}

// todo: [ ] 6.1.7 Create a function that converts minutes to minutes and hours
function minutesToHoursAndMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return (hours + "").padStart(2, "0") + ":" + (mins + "").padStart(2, "0");
}