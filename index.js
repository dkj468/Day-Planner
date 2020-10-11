let addUpdateItem = false;
let taskID = 0;
let taskIdUpdating = -1;
const btnAddItem = document.getElementById('addItem');
const itemsDiv = document.getElementById('items');
const btnAdd = document.getElementById('btnAdd');
const inputTaskName = document.getElementById('taskName');
const inputTaskCatagory = document.getElementById('taskCatagory');
const leftMenuNodes = document.querySelectorAll('.nav-link');

btnAddItem.addEventListener('click', () => {
  toggleAddItemPanel();
  prepareAddPanel();
});

const toggleAddItemPanel = () => {
  document.getElementById('right-panel').classList.remove('inactive');
  document.getElementById('right-panel').classList.remove('active');
  addUpdateItem = !addUpdateItem;
  if (addUpdateItem) {
    btnAddItem.innerHTML = `<i class="fa fa-times mr-2"></i
    ><small class="text-uppercase font-weight-bold">Cancel</small>`;
    document.getElementById('right-panel').classList.add('active');
  } else {
    btnAddItem.innerHTML = `<i class="fa fa-plus mr-2"></i
    ><small class="text-uppercase font-weight-bold">Add</small>`;
    document.getElementById('right-panel').classList.add('inactive');
  }
};

const prepareAddPanel = (taskId) => {
  if (taskId >= 0) {
    const task = items.find((el) => el.id === taskId);
    inputTaskName.value = task.taskName;
    inputTaskCatagory.selectedIndex = task.catagory;
    btnAdd.disabled = false;
    btnAdd.innerHTML = 'Update';
  } else {
    inputTaskName.value = '';
    inputTaskCatagory.selectedIndex = 0;
    btnAdd.disabled = true;
    btnAdd.innerHTML = 'Add';
  }
};

let items = [
  { id: 0, taskName: 'test the code', catagory: 1 },
  { id: 1, taskName: 'functional testing', catagory: 1 },
  { id: 2, taskName: 'complete the assignment', catagory: 0 },
  { id: 3, taskName: 'wash the clothes', catagory: 0 },
  { id: 4, taskName: 'bring grocery', catagory: 2 },
  { id: 5, taskName: 'plant a tree', catagory: 2 },
  { id: 6, taskName: 'manage the bank account', catagory: 3 },
  { id: 7, taskName: 'handle the stress', catagory: 0 },
  { id: 8, taskName: 'hold the meeting', catagory: 3 },
  { id: 9, taskName: 'read a book', catagory: 0 },
];

// key event listener on input field
inputTaskName.addEventListener('input', () => {
  btnAdd.disabled = true;
  if (inputTaskName.value !== '') {
    btnAdd.disabled = false;
  }
});

const loadItems = (categoryId) => {
  itemsDiv.innerHTML = '';
  let filteredItems = [];
  if (categoryId || categoryId === 0) {
    filteredItems = items.filter((el) => el.catagory === categoryId);
  } else {
    filteredItems = items;
  }

  filteredItems.forEach((el, index) => {
    let iconHtml = '';
    switch (el.catagory) {
      case 0:
        iconHtml = `<div class="catagory">
                <i class="fa fa-user personal mr-2"></i>
            </div>`;
        break;
      case 1:
        iconHtml = `<div class="catagory">
                <i class="fa fa-briefcase business mr-2"></i>
            </div>`;
        break;
      case 2:
        iconHtml = `<div class="catagory">
            <i class="fa fa-home home mr-2"></i>
        </div>`;
        break;
      case 3:
        iconHtml = `<div class="catagory">
            <i class="fa fa-info-circle other mr-2"></i>
        </div>`;
        break;
      default:
        iconHtml = '';
    }
    const innerHtml = `<div class="item-container" data-id="${el.id}">
      <div class="item-detail">
        <div class="item-name">
          <span>${el.taskName}</span>
        </div>
        ${iconHtml}
      </div>
      <div class="item-action">
        <button class="delete-item" type="button"><i class="fa fa-times-circle-o"></i></button>
      </div>
    </div>`;
    itemsDiv.innerHTML += innerHtml;
  });
};

document.addEventListener('click', (evt) => {
  if (evt.target.classList[0] === 'item-container') {
    if (evt.target.parentElement.type === 'button') {
      return;
    }

    if (!addUpdateItem || taskIdUpdating === evt.target.dataset.id * 1) {
      toggleAddItemPanel();
    }

    taskIdUpdating = evt.target.dataset.id * 1;
    prepareAddPanel(taskIdUpdating);
    return;
  }

  if (evt.target.parentElement && evt.target.parentElement.type === 'button') {
    deleteItem(evt);
  }
});

btnAdd.addEventListener('click', () => {
  if (btnAdd.innerHTML === 'Update') {
    const task = items.find((el) => el.id === taskIdUpdating);
    task.taskName = inputTaskName.value;
    task.catagory = inputTaskCatagory.selectedIndex;
  } else if (btnAdd.innerHTML === 'Add') {
    const taskName = inputTaskName.value;
    const catagory = inputTaskCatagory.selectedIndex;
    const newId = taskID++;
    items.push({
      id: newId,
      taskName,
      catagory,
    });
  }
  loadItems();
  toggleAddItemPanel();
  prepareAddPanel();
});

const deleteItem = (evt) => {
  const itemId =
    evt.target.parentElement.parentElement.parentElement.dataset.id * 1;
  const itemIndex = items.findIndex((el) => el.id === itemId);
  items.splice(itemIndex, 1);
  loadItems();
  if (addUpdateItem) {
    toggleAddItemPanel();
  }
};

// Left menu click events
leftMenuNodes.forEach((element) => {
  element.classList.remove('bg-light');
  element.addEventListener('click', (evt) => {
    element.classList.add('bg-light');
    const categoryId = element.dataset.category * 1;
    loadItems(categoryId);
  });
});

const Initialize = () => {
  btnAdd.disabled = true;
  loadItems();
};

Initialize();
