

// ACTIONS
let nextTodoId = 0;
export const addBasketItem = item => {
	return {
		type: 'ADD_BASKETITEM',
		item
	}
};

export const addCustomBasketItem = name => {
	return {
		type: 'ADD_BASKETITEM',
		id: nextTodoId++,
		name
	}
};

export const toggleBasketItem = id => {
	return {
		type: 'TOGGLE_BASKETITEM',
		id
	}
};

export const clearBasketItems = () => {
	return {
		type: 'CLEAR_BASKETITEMS'
	}
};

export const setVisibilityFilter = filter => {
	return {
		type: 'SET_VISIBILITY_FILTER',
		filter
	}
};


// REDUCERS
import { combineReducers } from 'redux';
// import todos from './todos'
// import visibilityFilter from './visibilityFilter'

const initialState = {
	visibilityFilter: 'SHOW_ALL',
	todos: [],
	categories: [
		{id:1, name:'Fruit'},
		{id:2, name:'Vegetable'},
		{id:3, name:'Dairy'},
		{id:4, name:'Meat'},
		{id:5, name:'Grain'}
	],

	item: [
		{id:1, name:'Strawberry', categoryId:1},
		{id:2, name:'Blueberry', categoryId:1},
		{id:3, name:'Orange', categoryId:1},
		{id:4, name:'Banana', categoryId:1},
		{id:5, name:'Apple', categoryId:1},

		{id:6, name:'Carrot', categoryId:2},
		{id:7, name:'Celery', categoryId:2},
		{id:8, name:'Mushroom', categoryId:2},
		{id:9, name:'Green Pepper', categoryId:2},

		{id:10, name:'Eggs', categoryId:3},
		{id:11, name:'Cheese', categoryId:3},
		{id:12, name:'Butter', categoryId:3},

		{id:13, name:'Chicken', categoryId:4},
		{id:14, name:'Beef', categoryId:4},
		{id:15, name:'Pork', categoryId:4},
		{id:16, name:'Fish', categoryId:4},

		{id:17, name:'Rice', categoryId:5},
		{id:18, name:'Pasta', categoryId:5},
		{id:19, name:'Bread', categoryId:5}
	],

	list: [
		{id:1, name:'Strawberry', count:1, bought:false},
		{id:6, name:'Carrot', count:1, bought:false},
		{id:10, name:'Eggs', count:1, bought:false},
		{id:13, name:'Chicken', count:1, bought:false},
		{id:17, name:'Rice', count:1, bought:false}
	]
};

export const groceryItems = (state = initialState.item, action) => {
	switch (action.type){
		default:
			return state;
	}
};

export const basketItems = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_BASKETITEM':
			let itemExists=false;

			let newBasket = state.list.map(basketItem => {
				if(basketItem.id === action.item.id){
					itemExists=true;
					console.log('bi',basketItems);
					return {...basketItem, count: basketItem.count+1};
				}else{
					return basketItem;
				}
			});

			if(itemExists){
				return {
					...state,
					list: newBasket
				};
			}else{
				return {
					...state,
					list: [...state.list, {...action.item, count: 1, bought: false}]
				};
			}
		case 'TOGGLE_BASKETITEM':
			let newList = state.list.map(basketItem =>
			  (basketItem.id === action.id)
				? {...basketItem, bought: !basketItem.bought}
				: basketItem
			);
			return {
				...state,
				list: newList

			};
		case 'CLEAR_BASKETITEMS':
			return {
				...state,
				list: []
			};
		default:
			return state;
	}
};

export const visibilityFilter = (state = 'SHOW_ALL', action) => {
	switch (action.type) {
		case 'SET_VISIBILITY_FILTER':
			return action.filter;
		default:
			return state;
	}
};

export const giphyApp = combineReducers({
	groceryItems,
	basketItems,
	visibilityFilter
});

export default { giphyApp };