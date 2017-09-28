document.addEventListener("DOMContentLoaded", function(event) {
  console.log("ready!")

  const modalContainer = document.getElementById("modal-container")
  const modalContent = document.getElementById("modal-content")
  const titleText = document.getElementById("title-text")
  const day = document.getElementById("due-date-day")
  const month = document.getElementById("due-date-month")
  const year = document.getElementById("due-date-year")
  const description = document.getElementById("description-text")

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

  if (window.innerWidth <= "500px"){
    console.log("threashold reached - 500px!")
  }

  const showEditTodo = () => todoItems.map(item => item.addEventListener("click", (e) =>{
      modalContainer.style.display = ""
      modalContent.style.display = ""
      container.style.backgroundColor = "rgba(0, 0, 0, .2)"

      titleText.value = e.target.innerHTML
    })
  )

  showEditTodo()

  let closeModal = () => modalContainer.addEventListener("click", () => {
    modalContainer.style.display = "none"
    modalContent.style.display = "none"
    container.style.backgroundColor = "rgba(255, 255, 255, 1)"
  })
  closeModal()

  const save = () => saveBtn.addEventListener("click", (e) => {
    let currentTitle = document.getElementById("title-text").value
    let todoTitle = document.getElementById("title-text")
    console.log('current title - ',currentTitle)
    console.log('todo title - ',todoTitle)
    modalContainer.style.display = "none"
    modalContent.style.display = "none"
    container.style.backgroundColor = "rgba(255, 255, 255, 1)"
    todoTitle.innerHTML = currentTitle
    todoTitle.id = currentTitle
  })
save()


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
    newItem.innerHTML = ` Item ${todoCount() - 1}`
    //adds dynamic id to newItem without the beginning space
    newItem.id = newItem.innerHTML.slice(1)

    //adds a trashcan to the end of the new todo
    newLine.appendChild(trashcan)
    //adds classes to the trashcans to
    trashcan.classList.add("fa")
    trashcan.classList.add("fa-trash-o")
    trash.push(trashcan)

    todoItems.push(newLine)
    //adds click event to create edit modal
    newItem.addEventListener("click", (e) => {
      modalContainer.style.display = ""
      modalContent.style.display = ""
      container.style.backgroundColor = "rgba(0, 0, 0, .2)"

      titleText.value = e.target.innerHTML
    })

    //removes todo Item
    removeTodo()
  })

});
