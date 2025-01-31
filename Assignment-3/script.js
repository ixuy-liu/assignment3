//Title constructor function that creates a Title object
function Title(t1) 
{ this.mytitle = t1;
}

Title.prototype.getName = function () 
{ 
return (this.mytitle);
}

var socialMedia = {
  facebook : 'http://facebook.com',
  twitter: 'http://twitter.com',
  flickr: 'http://flickr.com',
  youtube: 'http://youtube.com'
};

var t = new Title("CONNECT WITH ME!");

window.onload = function() {
  var name = "Yuxi Liu"; 
  var nuid = "12345678"; 
  document.getElementById("userInfo").innerHTML = "<h2>" + name + " - " + nuid + "</h2>";
};

//quesiton 2 not be expanded 
document.addEventListener("DOMContentLoaded", function() {
  let toggleButtons = document.querySelectorAll("#myTable img");

  toggleButtons.forEach(button => {
      button.addEventListener("click", function() {
          let row = this.closest("tr").nextElementSibling;
          if (row.classList.contains("dropDownTextArea")) {
              row.style.display = (row.style.display === "none") ? "table-row" : "none";
          }
      });
  });

//question 3 
let table = document.getElementById("myTable");
let addButton = document.getElementById("add");
let submitButton = document.getElementById("button");


function updateStudentNumbers() {
    let studentRows = table.querySelectorAll("tr:not(.dropDownTextArea):not(:first-child)"); // Exclude header
    studentRows.forEach((row, index) => {
        row.cells[1].textContent = `Student ${index + 1}`;
        row.cells[2].textContent = `Teacher ${index + 1}`;
    });
}

function addNewStudent() {
  try {

    let studentCount = table.querySelectorAll("tr:not(.dropDownTextArea):not(:first-child)").length;
    let newStudentNum = studentCount + 1; 

    let newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td><input type="checkbox" /><br /><br /><img src="down.png" width="25px" /></td>
        <td>Student ${newStudentNum}</td>
        <td>Teacher ${newStudentNum}</td>
        <td>Approved</td>
        <td>Fall</td>
        <td>TA</td>
        <td>${12345 + newStudentNum}</td>
        <td>100%</td>
        <td class="delete-cell"></td> 
        <td class="edit-cell"></td>   
    `;

    table.appendChild(newRow);

    let newDetailRow = document.createElement("tr");
    newDetailRow.className = "dropDownTextArea";
    newDetailRow.style.display = "none"; 
    newDetailRow.innerHTML = `
        <td colspan="8">
            Advisor:<br /><br />
            Award Details<br />
            Summer 1-2014(TA)<br />
            Budget Number: <br />
            Tuition Number: <br />
            Comments:<br /><br /><br />
            Award Status:<br /><br /><br />
        </td>
    `;

    table.appendChild(newDetailRow);

    updateStudentNumbers();
    attachDeleteEvents(); 
    attachCheckboxEvents();
    attachToggleEvents(); 

    //question 4
    alert(`Student ${newStudentNum} record added successfully!`);
  } catch (error) {
    alert("Error: Failed to add new student record. Please try again.");
    console.error(error); 
}

}

function attachDeleteEvents() {
    let deleteButtons = document.querySelectorAll(".deleteBtn");
    deleteButtons.forEach((button) => {
        button.onclick = function () {
            let row = this.closest("tr");
            let detailRow = row.nextElementSibling; 
            row.remove();
            if (detailRow && detailRow.classList.contains("dropDownTextArea")) {
                detailRow.remove();
            }
            updateStudentNumbers();
        };
    });
}

function attachToggleEvents() {
  let toggleButtons = document.querySelectorAll("#myTable img");

  toggleButtons.forEach(button => {
      button.onclick = function () {
          let row = this.closest("tr").nextElementSibling; 

          if (row && row.classList.contains("dropDownTextArea")) {
              if (!row.style.display) {
                  row.style.display = "none"; 
              }
              row.style.display = (row.style.display === "none") ? "table-row" : "none";
          }
      };
  });
}


  addButton.addEventListener("click", addNewStudent);
  attachDeleteEvents(); 
//5.1 select background color to yellow
//submit btn turn orange
  function handleCheckboxChange(event) {
    let row = event.target.closest("tr"); 
    if (event.target.checked) {
        row.style.backgroundColor = "yellow"; 
        submitButton.disabled = false; 
        submitButton.style.backgroundColor = "orange"; 
        addButtons(row); 
    } else {
        row.style.backgroundColor = ""; 
        removeButtons(row); 

        let anyChecked = document.querySelectorAll("#myTable input[type='checkbox']:checked").length > 0;
        submitButton.disabled = !anyChecked;
        submitButton.style.backgroundColor = anyChecked ? "orange" : "gray"; 
    }
}

let checkboxes = document.querySelectorAll("#myTable input[type='checkbox']");
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", handleCheckboxChange);
    });


    //question delete and edit buttons on selecting
    function addButtons(row) {
      let deleteCell = row.cells[8];
      let editCell = row.cells[9]; 
  

      if (!deleteCell.querySelector(".deleteBtn")) {
          let deleteBtn = document.createElement("button");
          deleteBtn.textContent = "Delete";
          deleteBtn.className = "deleteBtn";
          deleteBtn.onclick = function () {
              deleteRow(row);
          };
          deleteCell.appendChild(deleteBtn);
      }
  
      if (!editCell.querySelector(".editBtn")) {
          let editBtn = document.createElement("button");
          editBtn.textContent = "Edit";
          editBtn.className = "editBtn";
          editBtn.onclick = function () {
              editRow(row);
          };
          editCell.appendChild(editBtn);
      }
  }
  
  
  function removeButtons(row) {
    let deleteCell = row.cells[row.cells.length - 2];
    let editCell = row.cells[row.cells.length - 1];

    if (deleteCell.querySelector(".deleteBtn")) {
        deleteCell.querySelector(".deleteBtn").remove();
    }
    if (editCell.querySelector(".editBtn")) {
        editCell.querySelector(".editBtn").remove();
    }
}

function deleteRow(row) {
  let studentName = row.cells[1].textContent; 
  let detailRow = row.nextElementSibling; 
  row.remove();
  
  if (detailRow && detailRow.classList.contains("dropDownTextArea")) {
      detailRow.remove();
  }

  updateStudentNumbers();

  alert(`${studentName} record deleted successfully!`);
}

function attachCheckboxEvents() {
  let checkboxes = document.querySelectorAll("#myTable input[type='checkbox']");
  checkboxes.forEach(checkbox => {
      checkbox.removeEventListener("change", handleCheckboxChange); 
      checkbox.addEventListener("change", handleCheckboxChange);
  });
}


function editRow(row) {
  let studentName = row.cells[1].textContent; 

  let userInput = prompt(`Edit details of ${studentName}:\nEnter new details below:`);

  if (userInput !== null) { 
      if (userInput.trim() !== "") { 
          alert(`${studentName} data updated successfully!`);
      } else {
          alert("No data entered. Update cancelled.");
      }
  }
}


});
