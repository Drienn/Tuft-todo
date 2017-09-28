document.addEventListener("DOMContentLoaded", function(event) {
  console.log("ready!")

  const modalContainer = document.getElementById("modal-container")
  const modalContent = document.getElementById("modal-content")
  const titleText = document.getElementById("title-text")
  const day = document.getElementById("due-date-day")
  const month = document.getElementById("due-date-month")
  const year = document.getElementById("due-date-year")
  const description = document.getElementById("description-text")

  // initiating variables for modal functions
  let currentTodo;
  let currentTitle;
  let currentDescription;

  const saveBtn = document.getElementById("save")

  const markCompleteBtn = document.getElementById("mark-complete")

  const container = document.getElementById("container")

  const menuBtn = document.getElementById("menu-toggle")

  const nav = document.getElementById("nav")

  const addTodoBtn = document.getElementById("add-todo")

  const todoList = document.getElementById("todo-list")

  const todoText = document.getElementsByClassName("todo-item")
  //creates an iterable array from todoLine
  const todoItems = Array.from(todoText)

  let totalCompleted;

  if (window.innerWidth <= "500px"){
    console.log("threashold reached - 500px!")
  }

  const checkBoxClick = () =>

  todoItems.map(item => {
      let checkBox = item.previousElementSibling
    if (checkBox.classList.contains("hasClick")){
       return item;
    }  else {
      checkBox.classList.add("hasClick")
      checkBox.addEventListener("click", () => {
      item.classList.contains("complete-todo") ?
      item.classList.remove("complete-todo") :
      item.classList.add("complete-todo")
        console.log("hello!")


      if (item.classList.contains("complete-todo")){
        checkBox.classList.remove('fa-square-o')
        checkBox.classList.add('fa')
        checkBox.classList.add('fa-check-square-o')
      } else {
      checkBox.classList.add('fa-square-o')
      checkBox.classList.remove('fa')
      checkBox.classList.remove('fa-check-square-o')
      }
        totalCompleted = todoItems.filter(item => item.classList.contains("complete-todo"))
        // console.log(item);
        // console.log('list of completed todos = ',totalCompleted);
      })
      return item;
    }
  })

  checkBoxClick()

  const showEditModal = () => todoItems.map(item =>{
     item.addEventListener("click", (e) =>{
      modalContainer.style.display = ""
      modalContent.style.display = ""
      container.style.backgroundColor = "rgba(0, 0, 0, .2)"

      // console.log("event in question - ", e.target)
      description.value = item.nextElementSibling.value
      titleText.value = e.target.innerHTML

      if (description.value === "undefined"){
        description.value = ""
      }
      // console.log("Clicked todo and title text - ", titleText)

      currentTodo = document.getElementById(e.target.innerHTML)
      console.log('current todo - ', currentTodo)
      console.log('Previous child node - ',currentTodo.previousElementSibling)
      // currentTodo.previousElementSibling.addEventListener("click", )

      currentTodo.classList.contains('complete-todo') ?
        markCompleteBtn.innerHTML = "Not Completed" :
        markCompleteBtn.innerHTML = "Mark As Complete"


    })
  })

  showEditModal()

  let closeModal = () => modalContainer.addEventListener("click", () => {
    modalContainer.style.display = "none"
    modalContent.style.display = "none"
    container.style.backgroundColor = "rgba(255, 255, 255, 1)"
  })
  closeModal()

  const save = () => saveBtn.addEventListener("click", (e) => {
     let newTitle = document.getElementById("title-text")

    console.log('current title - ',newTitle.value)
    modalContainer.style.display = "none"
    modalContent.style.display = "none"
    container.style.backgroundColor = "rgba(255, 255, 255, 1)"

    currentTodo.id = newTitle.value
    currentTodo.nextElementSibling.value = description.value

    currentTodo.innerHTML = newTitle.value
  })
save()

  const markComplete = (target) => target.addEventListener("click", (e) => {
    modalContainer.style.display = "none"
    modalContent.style.display = "none"
    container.style.backgroundColor = "rgba(255, 255, 255, 1)"

    currentTodo.classList.contains("complete-todo") ?
    currentTodo.classList.remove("complete-todo") :
    currentTodo.classList.add("complete-todo")

    console.log('todo classlist - ',currentTodo.classList)
    if (currentTodo.classList.contains("complete-todo")){
    currentTodo.previousElementSibling.classList.remove('fa-square-o')
    currentTodo.previousElementSibling.classList.add('fa')
    currentTodo.previousElementSibling.classList.add('fa-check-square-o')
  } else {
    currentTodo.previousElementSibling.classList.add('fa-square-o')
    currentTodo.previousElementSibling.classList.remove('fa')
    currentTodo.previousElementSibling.classList.remove('fa-check-square-o')
  }
    console.log('previous sib', currentTodo.previousElementSibling)

    console.log("hello from mark complete btn!")
  })
  markComplete(markCompleteBtn)


  const getTrashCans = document.getElementsByClassName("fa-trash-o")

  //creates an iterable array from getTrashCans
  const trash = Array.from(getTrashCans)

  //gets the current number of todos
  let todoCount = () => {
    let itemCount = [];

    todoList.childNodes.forEach(li => {
      if (li.nodeName === "LI")
        itemCount.push(li)
    })
    return itemCount.length
  }

  const openNav = () => {
    document.getElementById("nav").style.width = "100%";
    document.getElementById("main-container").style.gridColumn = "3/span all";
    document.getElementById("menu-toggle").style.gridColumn = "3";
    document.getElementsByClassName(".todo-line").style.width = "99%";
  }
  const closeNav = () => {
    document.getElementById("nav").style.width = "0px";
    document.getElementById("main-container").style.gridColumn = "1/span all";
    document.body.style.backgroundColor = "white";
    document.getElementById("menu-toggle").style.gridColumn = "1";
  }

  //Opens/Closes SideNav
  menuBtn.addEventListener("click", () => {
    console.log("clicked!")
    nav.style.width === "0px" ?
    openNav() :
    closeNav()
  })

  //shows modal


  //removes todo Item
  const removeTodo = () =>
  trash.map(can => can.addEventListener("click", (e) => {
    let currentItem = e.target.parentNode
    todoList.removeChild(currentItem)
    console.log(currentItem)
  }))
  removeTodo()

  //adds a new todo with appropriate count
  addTodoBtn.addEventListener("click", () => {
    let newLine = document.createElement('li')
    let newItem = document.createElement('span')
    let trashcan = document.createElement('i')
    let checkBox = document.createElement('i')



    //creates a new li in the todoList ul
    todoList.appendChild(newLine)

    //adds class to the newly created li
    newLine.classList.add("todo-line")
    //adds checkbox to li
    newLine.appendChild(checkBox)
    checkBox.classList.add("fa-square-o")
    //adds a span to the li
    newLine.appendChild(newItem)
    //adds class to the newly created span
    newItem.classList.add("todo-item")
    //adds starter text for span based on todo-list length
    newItem.innerHTML = `Item ${todoCount() - 1}`
    //adds dynamic id to newItem without the beginning space
    newItem.id = newItem.innerHTML

    //adds a trashcan to the end of the new todo
    newLine.appendChild(trashcan)
    //adds classes to the trashcans to
    trashcan.classList.add("fa")
    trashcan.classList.add("fa-trash-o")
    trash.push(trashcan)

    todoItems.push(newItem)
    //adds click event to create edit modal

    newItem.addEventListener("click", (e) => {
      modalContainer.style.display = ""
      modalContent.style.display = ""
      container.style.backgroundColor = "rgba(0, 0, 0, .2)"

      titleText.value = e.target.innerHTML
    })

    showEditModal()
    checkBoxClick()
    removeTodo()
    console.log('new item', newItem)
  })

});
