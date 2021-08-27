function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  dir = "asc";

  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function searchFunction() {
  var input, filter, i, txtValue, table;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");

  rows = table.rows;

  for (i = 1; i < (rows.length); i++) {
    var rowDisplay = table.rows[i];
    console.log(rowDisplay);
    x = rows[i].getElementsByTagName("TD")[1];
    txtValue = x.textContent || x.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      rowDisplay.style.display = "";
    }
    else {
      rowDisplay.style.display = "none";
    }
  }

}

function togglePassword(el) {

  // Checked State
  var checked = el.checked;

  if (checked) {
    // Changing type attribute
    document.getElementById("password").type = 'text';

    // Change the Text
    document.getElementById("toggleText").textContent = "Ẩn";
  } else {
    // Changing type attribute
    document.getElementById("password").type = 'password';

    // Change the Text
    document.getElementById("toggleText").textContent = "Hiện";
  }
}

var editRow = null;
function userDisplay(ctl) {
  $("#userForm").show();
  editRow = $(ctl).parents("tr");
  var cols = editRow.children("td");

  $("#number").val($(cols[0]).text().split(" ").join(""));
  // $("#inputName").val($(cols[1]).text().split(" ").join(""));
  $("#inputName").val($.trim($(cols[1]).text()));
  $("#inputAccount").val($(cols[2]).text().split(" ").join(""));
  $("#password").val($(cols[3]).text().split(" ").join(""));

  var role = "Quản trị viên";
  if ($(cols[4]).text().indexOf(role) != -1) {
    $("#select").val("0");
  }
  else {
    $("#select").val("1");
  }

  // Change Update Button Text
  $("#updateButton").text("Cập nhật");
}

function userUpdate() {
  if ($("#updateButton").text() == "Cập nhật") {
    userUpdateInTable();
  }
  else {
    userAddToTable();
  }

  // Clear form 
  formClear();
  $("#userForm").hide();
}

function userUpdateInTable() {
  // Add changed user to table
  $(editRow).after(userBuildTableRow());

  // Remove original product
  $(editRow).remove();

  // Clear form fields
  formClear();

  // Change Update Button Text
  $("#updateButton").text("Lưu");
}

function userAddToTable() {
  // First check if a <tbody> tag exists, add one if not
  if ($("#myTable tbody").length == 0) {
    $("#myTable").append("<tbody></tbody>");
  }

  // Append product to table
  $("#myTable tbody").append(
    userBuildTableRow());
}

function userBuildTableRow() {
  var ret =
    "<tr>" +
    '<td scope="col" class="edit">' +
    $('#number').val() + "</td>" +
    '<td scope="col">' +
    $('#inputName').val() + "</td>" +
    '<td scope="col">' +
    $('#inputAccount').val() + "</td>" +
    '<td scope="col" id="pwd">' +
    $('#password').val() + "</td>" +
    '<td scope="col">' +
    $('#select option:selected').text() + "</td>" +
    '<td scope="col" class="edit">' +
    '<i class="fas fa-edit" onclick="userDisplay(this)" style="cursor:pointer>"</i>' + " " +
    '<i class="fas fa-trash-alt" onclick="userDelete(this)" style="cursor:pointer"></i>' +
    "</td>"
  "</tr>"

  return ret;
}

function userDelete(ctl) {
  $(ctl).parents("tr").remove();
}

function formClear() {
  $("#inputName").val("");
  $("#inputAccount").val("");
  $("#number").val("");
  $("#password").val("");
  $("#select").val("");

}

// $(document).ready(function () {
//   var x = $(".edit").html().split(" ").join("");
//   alert(x);  // now JS variable 'x' has the uid that's passed from the node backend.
// });