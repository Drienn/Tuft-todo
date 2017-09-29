document.addEventListener("DOMContentLoaded", function(event) {

  const modalContainer = document.getElementById("modal-container")
  const modalContent = document.getElementById("modal-content")
  const titleText = document.getElementById("title-text")

  const description = document.getElementById("description-text")

  // initiating variables for modal functions
  let currentTodo;
  let currentTitle;
  let currentDescription;
  let currentDay = document.getElementById("due-date-day")
  let currentMonth = document.getElementById("due-date-month")
  let currentYear = document.getElementById("due-date-year")

  const saveBtn = document.getElementById("save")

  const markCompleteBtn = document.getElementById("mark-complete")

  const container = document.getElementById("container")

  const menuBtn = document.getElementById("menu-toggle")

  const nav = document.getElementById("nav")
  const mainContainer = document.getElementById("main-container")
  const navDate = document.getElementsByClassName("nav-date")
  const navDateArray = Array.from(navDate)

  const addTodoBtn = document.getElementById("add-todo")

  const todoList = document.getElementById("todo-list")

  const todoText = document.getElementsByClassName("todo-item")
  //creates an iterable array from todoLine
  const todoItems = Array.from(todoText)

  const firstBadge = document.getElementById("02/16")
  let mainBadge = document.getElementById("main-badge")
  let totalBadge = document.getElementById("total-badge")
  //initiates badges
  firstBadge.innerHTML = todoItems.length
  mainBadge.innerHTML = firstBadge.innerHTML
  totalBadge.innerHTML = +mainBadge.innerHTML + 7
  let totalCompleted = []
  let deletedTodos = []

  navDateArray.map((date, index) => date.addEventListener("click", (e) => {
    navDateArray.map(date => date.classList.remove("nav-date-active"))
    e.target.classList.add("nav-date-active")
  }))

  window.onresize = () => {
    if (window.innerWidth <= 1340) {
      if (nav.style.width !== "0px")
        nav.style.width = "335px"
      nav.style.zIndex = "3"
      menuBtn.style.gridArea = "1/1/1/1"
      mainContainer.styel.gridArea = "1/1/span all/ span all"
    } else {
      if (nav.style.width === "335px") {
        nav.style.width = "100%"
        menuBtn.style.gridArea = "1 / 3 / 1 / auto"
        mainContainer.style.gridColumn = "3/ span all"
      }
    }
  }

  const openNav = () => {
    if (window.innerWidth >= 1340) {
      nav.style.width = "100%"
      nav.style.mindWidth = "335px"
      mainContainer.style.gridColumn = "3/span all"
      menuBtn.style.gridColumn = "3"
    } else {
      nav.style.width = "335px"
      nav.style.zIndex = "3"
    }
  }

  const closeNav = () => {
    if (window.innerWidth >= 1340) {
      nav.style.width = "0px"
      mainContainer.style.gridColumn = "1/span all"
      document.body.style.backgroundColor = "white"
      menuBtn.style.gridColumn = "1"
    } else {
      nav.style.width = "0px"
      mainContainer.style.gridColumn = "1/span all"
    }
  }

  //Opens/Closes SideNav
  menuBtn.addEventListener("click", () => {
    nav.style.width === "0px"
      ? openNav()
      : closeNav()
  })
  //marks item complete from checkbox
  const checkBoxClick = () => todoItems.map(item => {
    let checkBox = item.previousElementSibling
    if (checkBox.classList.contains("hasClick")) {
      return item
    } else {
      checkBox.classList.add("hasClick")
      checkBox.addEventListener("click", () => {
        item.classList.contains("complete-todo")
          ? item.classList.remove("complete-todo")
          : item.classList.add("complete-todo")

        if (item.classList.contains("complete-todo")) {
          checkBox.classList.remove('fa-square-o')
          checkBox.classList.add('fa')
          checkBox.classList.add('fa-check-square-o')
        } else {
          checkBox.classList.add('fa-square-o')
          checkBox.classList.remove('fa')
          checkBox.classList.remove('fa-check-square-o')
        }
        totalCompleted = todoItems.filter(item => item.classList.contains("complete-todo"))

        //updates badges
        firstBadge.innerHTML = todoItems.length - totalCompleted.length - deletedTodos.length
        mainBadge.innerHTML = firstBadge.innerHTML
        totalBadge.innerHTML = +mainBadge.innerHTML + 7
      })
      return item
    }
  })

  checkBoxClick()

  //shows modal on item click with item specific info
  const showEditModal = () => todoItems.map(item => {
    item.addEventListener("click", (e) => {
      modalContainer.style.display = ""
      modalContent.style.display = ""
      container.style.backgroundColor = "rgba(0, 0, 0, .2)"
      mainBadge.style.backgroundColor = "#0F70AA"
      mainBadge.style.color = "#C7CACB"

      description.value = item.nextElementSibling.value
      titleText.value = e.target.innerHTML
      currentDay.value = item.parentNode.children[3].value
      currentMonth.value = item.parentNode.children[4].value
      currentYear.value = item.parentNode.children[5].value

      if (description.value === "undefined") {
        description.value = ""
      }

      currentTodo = document.getElementById(e.target.innerHTML)
      // currentTodo.previousElementSibling.addEventListener("click", )

      currentTodo.classList.contains('complete-todo')
        ? markCompleteBtn.innerHTML = "Not Completed"
        : markCompleteBtn.innerHTML = "Mark As Complete"

    })
  })

  showEditModal()

  //closes modal
  let closeModal = (target) => target.addEventListener("click", () => {
    modalContainer.style.display = "none"
    modalContent.style.display = "none"
    container.style.backgroundColor = "rgba(255, 255, 255, 1)"
    mainBadge.style.backgroundColor = "#128DD5"
    mainBadge.style.color = "white"
  })

  //close modal event added to dom elements
  closeModal(modalContainer)
  closeModal(saveBtn)
  closeModal(markCompleteBtn)

  //saves changes made to item's fields
  const save = (target) => target.addEventListener("click", (e) => {
    let newTitle = document.getElementById("title-text")

    currentTodo.id = newTitle.value
    currentTodo.nextElementSibling.value = description.value
    currentTodo.parentNode.children[3].value = currentDay.value
    currentTodo.parentNode.children[4].value = currentMonth.value
    currentTodo.parentNode.children[5].value = currentYear.value

    currentTodo.innerHTML = newTitle.value
  })
  save(saveBtn)

  //enables save on enter (quick fix code, could certainly optimize)
  window.addEventListener("keypress", (e) => {
    if (13 == e.keyCode) {
      let newTitle = document.getElementById("title-text")

      //saves on enter
      currentTodo.id = newTitle.value
      currentTodo.nextElementSibling.value = description.value
      currentTodo.parentNode.children[3].value = currentDay.value
      currentTodo.parentNode.children[4].value = currentMonth.value
      currentTodo.parentNode.children[5].value = currentYear.value
      currentTodo.innerHTML = newTitle.value

      //closes modal effect on enter
      modalContainer.style.display = "none"
      modalContent.style.display = "none"
      container.style.backgroundColor = "rgba(255, 255, 255, 1)"
      mainBadge.style.backgroundColor = "#128DD5"
      mainBadge.style.color = "white"
    }
  })

  //marks todo complete from mark complete button in modal
  const markComplete = (target) => target.addEventListener("click", (e) => {

    currentTodo.classList.contains("complete-todo")
      ? currentTodo.classList.remove("complete-todo")
      : currentTodo.classList.add("complete-todo")

    if (currentTodo.classList.contains("complete-todo")) {
      currentTodo.previousElementSibling.classList.remove('fa-square-o')
      currentTodo.previousElementSibling.classList.add('fa')
      currentTodo.previousElementSibling.classList.add('fa-check-square-o')
      totalCompleted.push(currentTodo)
    } else {
      currentTodo.previousElementSibling.classList.add('fa-square-o')
      currentTodo.previousElementSibling.classList.remove('fa')
      currentTodo.previousElementSibling.classList.remove('fa-check-square-o')
      totalCompleted.pop()
    }
    //updates badges
    firstBadge.innerHTML = todoItems.length - totalCompleted.length - deletedTodos.length
    mainBadge.innerHTML = firstBadge.innerHTML
    totalBadge.innerHTML = +mainBadge.innerHTML + 7
  })
  markComplete(markCompleteBtn)


  const getTrashCans = document.getElementsByClassName("fa-trash-o")
  //creates an iterable array from getTrashCans
  const trash = Array.from(getTrashCans)

  //gets the current number of todos
  let todoCount = () => {
    let itemCount = []
    todoList.childNodes.forEach(li => {
      if (li.nodeName === "LI")
        itemCount.push(li)
    })
    return itemCount.length
  }

  //removes todo Item
  const removeTodo = (target) => target.addEventListener("click", (e) => {
    let currentItem = e.target.parentNode

    if (confirm("Are you sure you want to delete this todo?")) {
      todoList.removeChild(currentItem)
      if (currentItem.children[1].classList.contains("complete-todo")) {
        null
      } else {
        deletedTodos.push(currentItem.children[1])
        firstBadge.innerHTML = todoItems.length - totalCompleted.length - deletedTodos.length
        mainBadge.innerHTML = firstBadge.innerHTML
        totalBadge.innerHTML = +mainBadge.innerHTML + 7
      }
    } else {
      null
    }
  })

  trash.map(can => removeTodo(can))

  //adds a new todo with appropriate count
  addTodoBtn.addEventListener("click", () => {
    let newLine = document.createElement('li')
    let newItem = document.createElement('span')
    let trashcan = document.createElement('i')
    let checkBox = document.createElement('i')
    let newDescription = document.createElement('input')
    let newDay = document.createElement('input')
    let newMonth = document.createElement('input')
    let newYear = document.createElement('input')

    todoList.appendChild(newLine)

    newLine.classList.add("todo-line")
    newLine.appendChild(checkBox)
    checkBox.classList.add("fa-square-o")

    newLine.appendChild(newItem)
    newItem.classList.add("todo-item")
    newItem.innerHTML = `Item ${todoCount() - 1}`
    newItem.id = newItem.innerHTML

    newLine.appendChild(newDescription)
    newDescription.type = "hidden"
    newDescription.value = ""

    newLine.appendChild(newDay)
    newDay.type = "hidden"
    newDay.value = ""

    newLine.appendChild(newMonth)
    newMonth.type = "hidden"
    newMonth.value = ""

    newLine.appendChild(newYear)
    newYear.type = "hidden"
    newYear.value = "2017"

    newLine.appendChild(trashcan)
    trashcan.classList.add("fa")
    trashcan.classList.add("fa-trash-o")
    trash.push(trashcan)

    todoItems.push(newItem)

    //adds click event to create show edit modal with new item info
    newItem.addEventListener("click", (e) => {
      modalContainer.style.display = ""
      modalContent.style.display = ""
      container.style.backgroundColor = "rgba(0, 0, 0, .2)"

      titleText.value = e.target.innerHTML

    })
    //re-initializes functions to incorporate newly added item
    showEditModal()
    checkBoxClick()
    removeTodo(trashcan)
    //updates badges
    firstBadge.innerHTML = todoItems.length - totalCompleted.length - deletedTodos.length
    mainBadge.innerHTML = firstBadge.innerHTML
    totalBadge.innerHTML = +mainBadge.innerHTML + 7
  })

})
