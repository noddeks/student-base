document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const inputs = form.querySelectorAll('input');
  const name = document.querySelector('.name');
  const surname = document.querySelector('.surname');
  const middlename = document.querySelector('.middlename');
  const birthday = document.querySelector('.birthday');
  const studyYear = document.querySelector('.study-year');
  const faculty = document.querySelector('.faculty');

  const filterName = document.getElementById('filter-name');
  const filterFaculty = document.getElementById('filter-faculty');
  const startYear = document.getElementById('start-year');
  const graduateYear = document.getElementById('graduate-year');

  let table = document.querySelector('.table');
  const sortByName = document.querySelector('.sort-by-name');
  const sortByFaculty = document.querySelector('.sort-by-faculty');
  const sortByAge = document.querySelector('.sort-by-age');
  const sortByYears = document.querySelector('.sort-by-study-years');

  let students = [];
  let filteredStudents = [];
  let sortedStudents = [];
  let timeout;

  let currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();

  let sortingOrder = {
    sortName:'asc',
    sortAge:'asc',
    sortFaculty:'asc',
    sortYears:'asc',
  }

  if(day < 10){
    day ='0' + day;
  }
  if(month < 10){
    month ='0' + month;
  }

  currentDate = year + '-' + month + '-' + day;
  birthday.setAttribute('max', currentDate);
  studyYear.setAttribute('max', year);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    removeErrors();
    validateForm();

    if (Boolean(surname.value) && Boolean(name.value) && Boolean(middlename.value) && Boolean(birthday.value) && Boolean(studyYear.value) && Boolean(faculty.value)) {
      let student = {
        name: surname.value + ' ' + name.value + ' ' + middlename.value,
        birthday: birthday.value,
        studyYear: studyYear.value,
        faculty: faculty.value,
      };

      students.push(student);

      for (let input of inputs) {
        input.value = '';
      }
    }

    appendStudent(students);
  })

  function validateForm () {
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value.trim();
      if (!inputs[i].value) {
        let error = document.createElement('div');
        error.className='error';
        error.style.color = 'red';
        error.innerHTML = 'Это поле обязательно для заполнения';
        form[i].parentElement.insertBefore(error, inputs[i]);
      }
    }
  }

  function removeErrors() {
    let errors = form.querySelectorAll('.error');
    for (var i = 0; i < errors.length; i++) {
      errors[i].remove();
    }
  }

  sortByName.addEventListener('click', () => {
    if (sortingOrder.sortName == 'asc') {
      sortingOrder.sortName = 'desc';
    } else if (sortingOrder.sortName == 'desc') {
      sortingOrder.sortName = 'asc';
    }

    sortedStudents = students.slice().sort(compare);
    function compare(a,b) {
      let comparison = 0;
      if (sortingOrder.sortName == 'asc') {
        if (a.name > b.name) {
          comparison = 1;
        } else if (a.name < b.name) {
          comparison = -1;
        }
        return comparison;
      } else if (sortingOrder.sortName == 'desc') {
        if (a.name < b.name) {
          comparison = 1;
        } else if (a.name > b.name) {
          comparison = -1;
        }
        return comparison;
      }
    }
    appendStudent(sortedStudents);
  })

  sortByFaculty.addEventListener('click', () => {
    if (sortingOrder.sortFaculty == 'asc') {
      sortingOrder.sortFaculty = 'desc';
    } else if (sortingOrder.sortFaculty == 'desc') {
      sortingOrder.sortFaculty = 'asc';
    }

    sortedStudents = students.slice().sort(compare);
    function compare(a,b) {
      let comparison = 0;
      if (sortingOrder.sortFaculty == 'asc') {
        if (a.faculty > b.faculty) {
          comparison = 1;
        } else if (a.faculty < b.faculty) {
          comparison = -1;
        }
        return comparison;
      } else if (sortingOrder.sortFaculty == 'desc') {
        if (a.faculty < b.faculty) {
          comparison = 1;
        } else if (a.faculty > b.faculty) {
          comparison = -1;
        }
        return comparison;
      }
    }
    appendStudent(sortedStudents);
  })

  sortByAge.addEventListener('click', () => {
    if (sortingOrder.sortAge == 'asc') {
      sortingOrder.sortAge = 'desc';
    } else if (sortingOrder.sortAge == 'desc') {
      sortingOrder.sortAge = 'asc';
    }

    sortedStudents = students.slice().sort(compare);
    function compare (a,b) {
      let dateA = new Date(a.birthday);
      let dateB = new Date(b.birthday);
      if (sortingOrder.sortAge == 'asc') {
        return dateA - dateB;
      } else if (sortingOrder.sortAge == 'desc') {
        return dateB - dateA;
      }
    }
    appendStudent(sortedStudents);
  })

  sortByYears.addEventListener('click', () => {
    if (sortingOrder.sortYears == 'asc') {
      sortingOrder.sortYears = 'desc';
    } else if (sortingOrder.sortYears == 'desc') {
      sortingOrder.sortYears = 'asc';
    }

    sortedStudents = students.slice().sort(compare);
    function compare (a,b) {
      if (sortingOrder.sortYears == 'asc') {
        return a.studyYear - b.studyYear;
      } else if(sortingOrder.sortYears == 'desc') {
        return b.studyYear - a.studyYear;
      }
    }
    appendStudent(sortedStudents);
  })

  if (Boolean(filterName.value) && Boolean(filterFaculty.value) && Boolean(startYear.value) && Boolean(graduateYear.value)) {
    filteredStudents = students
      .filter(student => student.name.includes(filterName.value))
      .filter(student => student.faculty.includes(filterFaculty.value))
      .filter(student => Number(student.studyYear) === Number(startYear.value))
      .filter(student => Number(student.studyYear) === Number(graduateYear.value) - 4)
    appendStudent(filteredStudents);
  } else if (Boolean(filterName.value) && Boolean(filterFaculty.value) && Boolean(startYear.value)) {
    filteredStudents = students
      .filter(student => student.name.includes(filterName.value))
      .filter(student => student.faculty.includes(filterFaculty.value))
      .filter(student => Number(student.studyYear) === Number(startYear.value))
    appendStudent(filteredStudents);
  } else if (Boolean(filterName.value) && Boolean(filterFaculty.value)) {
    filteredStudents = students
      .filter(student => student.name.includes(filterName.value))
      .filter(student => student.faculty.includes(filterFaculty.value))
    appendStudent(filteredStudents);
  }

  filterName.addEventListener('input', () => {
    clearTimeout(timeout);
    function filterStudents () {
      filteredStudents = students.filter(student => student.name.includes(filterName.value))
    }
    timeout = setTimeout(filterStudents, 300);
    appendStudent(filteredStudents);
  })

  filterFaculty.addEventListener('input', () => {
    clearTimeout(timeout);
    function filterStudents () {
      filteredStudents = students.filter(student => student.faculty.includes(filterFaculty.value))
    }
    timeout = setTimeout(filterStudents, 300);
    appendStudent(filteredStudents);
  })

  startYear.addEventListener('input', () => {
    clearTimeout(timeout);
    function filterStudents () {
      filteredStudents = students.filter(student => Number(student.studyYear) === Number(startYear.value))
    }
    timeout = setTimeout(filterStudents, 300);
    appendStudent(filteredStudents);
  })

  graduateYear.addEventListener('input', () => {
    clearTimeout(timeout);
    function filterStudents () {
      filteredStudents = students.filter(student => Number(student.studyYear) === Number(graduateYear.value) - 4)
    }
    timeout = setTimeout(filterStudents, 300);
    appendStudent(filteredStudents);
  })

  function appendStudent(array) {
    let rows = document.querySelectorAll('.appended-row');
    for (let row of rows) {
      row.remove();
    }

    for (let object of array) {
      let tr = document.createElement('tr');
      let th0 = document.createElement('th');
      let th1 = document.createElement('th');
      let th2 = document.createElement('th');
      let th3 = document.createElement('th');
      tr.classList.add('appended-row');

      let age = year - new Date(object.birthday).getFullYear();
      if (month < new Date(object.birthday).getMonth() + 1) {
        age = age - 1;
      }

      let course = 'закончил';
      if (Number(year) - Number(object.studyYear) === 0 || Number(year) - Number(object.studyYear) === 1 && Number(month) <= 6) {
        course = '1 курс';
      } else if (Number(year) - Number(object.studyYear) === 1 && Number(month) > 6 || Number(year) - Number(object.studyYear) === 2 && Number(month) <= 6) {
        course = '2 курс';
      } else if (Number(year) - Number(object.studyYear) === 2 && Number(month) > 6 || Number(year) - Number(object.studyYear) === 3 && Number(month) <= 6) {
        course = '3 курс';
      } else if (Number(year) - Number(object.studyYear) === 3 && Number(month) > 6 || Number(year) - Number(object.studyYear) === 4 && Number(month) < 9) {
        course = '4 курс';
      }

      table.append(tr);
      tr.append(th0);
      tr.append(th1);
      tr.append(th2);
      tr.append(th3);

      tr.children[0].innerHTML = object.name;
      tr.children[1].innerHTML = object.faculty;
      tr.children[2].innerHTML = object.birthday + `(${age} лет)`;
      tr.children[3].innerHTML = object.studyYear + '-' + `${Number(object.studyYear) + 4}` + `(${course})`;
    }
  }
})
