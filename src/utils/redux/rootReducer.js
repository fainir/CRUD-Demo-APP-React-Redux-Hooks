const initialState = {
  categories: [],
  pageTitle: '',
  selectedCategoryId: '',
  menuButtons: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_CATEGORY':
      return { ...state, categories: [...state.categories, { name: action.payload, id: new Date().getTime() + Math.random().toString(36).substring(7) }] };
    case 'DELETE_SELECTED_CATEGORY':
      return { ...state, categories: state.categories.filter((item) => item.id !== state.selectedCategoryId) };
    case 'UPDATE_SELECTED_CATEGORY':
      const updateItem = { name: action.payload, id: state.selectedCategoryId };
      const { categories } = state;
      categories[categories.findIndex((el) => el.id === updateItem.id)] = updateItem;
      return { ...state, categories };
    case 'SELECT_CATEGORY':
      return { ...state, selectedCategoryId: action.payload };
    case 'ADD_MENU_DATA':
      return { ...state, pageTitle: action.payload.pageTitle, menuButtons: action.payload.menuButtons };
    default:
      return state;
  }
}

export default rootReducer;
